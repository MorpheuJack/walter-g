'use server';

import { generatePersonalizedTips, PersonalizedTipsInput } from '@/ai/flows/personalized-tips';
import { z } from 'zod';

const schema = z.object({
  mood: z.string().min(3, 'Please describe your mood.'),
  stressors: z.string().min(3, 'Please describe your stressors.'),
});

export async function getPersonalizedTipsAction(
  prevState: any,
  formData: FormData
) {
  const validatedFields = schema.safeParse({
    mood: formData.get('mood'),
    stressors: formData.get('stressors'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
      tips: [],
    };
  }

  try {
    const input: PersonalizedTipsInput = {
      mood: validatedFields.data.mood,
      stressors: validatedFields.data.stressors,
    };
    const result = await generatePersonalizedTips(input);
    return { message: 'success', tips: result.tips, errors: {} };
  } catch (error) {
    console.error(error);
    return { message: 'An error occurred while generating tips. Please try again later.', tips: [], errors: {} };
  }
}
