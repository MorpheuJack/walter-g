'use server';

import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Por favor, insira um e-mail válido.'),
  issue: z.string().min(10, 'Por favor, descreva seu problema com mais detalhes (mínimo de 10 caracteres).'),
});

export async function getPersonalizedTipsAction(
  prevState: any,
  formData: FormData
) {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
    issue: formData.get('issue'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, issue } = validatedFields.data;

  const n8nWebhookUrl = 'https://ec17ba64dadd.ngrok-free.app/webhook/8e1b3a4a-174a-4f47-8223-2a20840d0f9b';

  const dataToSend = {
      email: email,
      problem: issue,
      submittedAt: new Date().toISOString()
  };

  try {
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Falha ao enviar para o n8n:', response.status, errorText);
        // The error comes from the n8n server. Provide a more helpful message.
        throw new Error(`O serviço de automação retornou um erro (Status: ${response.status}). Verifique a URL e a configuração do seu webhook no n8n.`);
    }

    // Handle cases where n8n returns a 2xx status but no JSON body.
    const data = await response.json().catch(() => ({}));

    console.log('Sucesso! Enviado para o n8n:', data);
    return { message: 'success', errors: {} };
  } catch (error: any) {
    console.error('Erro ao enviar para o n8n:', error);
    return {
      message: `Houve um problema ao enviar seus dados. Detalhe: ${error.message}`,
      errors: {},
    };
  }
}
