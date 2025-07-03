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
    const input: GetSupportInput = {
      email: validatedFields.data.email,
      issue: validatedFields.data.issue,
    };
    const result = await getSupport(input);
    return { message: 'success', tips: result.tips, errors: {} };
  } catch (error) {
    console.error(error);
    return { message: 'Ocorreu um erro ao gerar as dicas. Por favor, tente novamente mais tarde.', tips: [], errors: {} };
  }
}
