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

  try {
    const n8nWebhookUrl = 'https://n8n-927020941701.southamerica-east1.run.app/webhook/8e1b3a4a-174a-4f47-8223-2a20840d0f9b';
    const dataToSend = {
        email: email,
        problem: issue,
        submittedAt: new Date().toISOString()
    };

    const webhookResponse = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(dataToSend),
    });

    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text();
      console.error('Erro ao enviar dados para o n8n:', errorText || `A resposta da rede não foi 'ok': ${webhookResponse.statusText}`);
      throw new Error('Houve um problema ao enviar seus dados. Por favor, tente novamente mais tarde.');
    }
    
    console.log('Sucesso! Enviado para o n8n.');
    return { message: 'success', errors: {} };

  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro ao enviar sua mensagem.';
    return { message: errorMessage, errors: {} };
  }
}
