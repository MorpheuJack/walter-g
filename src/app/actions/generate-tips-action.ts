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

  if (!process.env.N8N_WEBHOOK_URL) {
    console.error('N8N_WEBHOOK_URL is not set in the .env file.');
    return {
      message: 'A configuração do servidor está incompleta. Por favor, tente novamente.',
      errors: {},
    };
  }

  try {
    const response = await fetch(process.env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, issue }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Falha ao enviar para o n8n:', response.status, errorText);
      throw new Error('Falha ao enviar os dados. Por favor, tente novamente mais tarde.');
    }

    return { message: 'success', errors: {} };
  } catch (error) {
    console.error('Erro ao enviar para o n8n:', error);
    return {
      message: 'Ocorreu um erro no servidor ao tentar enviar seus dados. Por favor, tente novamente mais tarde.',
      errors: {},
    };
  }
}
