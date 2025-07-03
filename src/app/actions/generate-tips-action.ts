'use server';

import { getSupport, GetSupportInput } from '@/ai/flows/personalized-tips';
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
      tips: [],
    };
  }

  try {
    const { email, issue } = validatedFields.data;

    const input: GetSupportInput = {
      email: email,
      issue: issue,
    };
    const result = await getSupport(input);

    // Send data to webhook after getting tips
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
      } else {
          console.log('Sucesso! Enviado para o n8n.');
      }
    } catch (error) {
        console.error('Erro ao enviar dados para o n8n:', error);
    }

    return { message: 'success', tips: result.tips, errors: {} };
  } catch (error) {
    console.error(error);
    return { message: 'Ocorreu um erro ao gerar as dicas. Por favor, tente novamente mais tarde.', tips: [], errors: {} };
  }
}
