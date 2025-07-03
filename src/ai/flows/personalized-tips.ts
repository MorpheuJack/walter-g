// src/ai/flows/personalized-tips.ts
'use server';
/**
 * @fileOverview A flow for generating personalized mental health tips based on user mood and stressors.
 *
 * - generatePersonalizedTips - A function that generates personalized mental health tips.
 * - PersonalizedTipsInput - The input type for the generatePersonalizedTips function.
 * - PersonalizedTipsOutput - The return type for the generatePersonalizedTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedTipsInputSchema = z.object({
  mood: z
    .string()
    .describe('The current mood of the user (e.g., happy, sad, anxious).'),
  stressors: z
    .string()
    .describe('The current stressors affecting the user (e.g., work, relationships, finances).'),
});

export type PersonalizedTipsInput = z.infer<typeof PersonalizedTipsInputSchema>;

const PersonalizedTipsOutputSchema = z.object({
  tips: z.array(z.string()).describe('An array of personalized mental health tips.'),
});

export type PersonalizedTipsOutput = z.infer<typeof PersonalizedTipsOutputSchema>;

export async function generatePersonalizedTips(input: PersonalizedTipsInput): Promise<PersonalizedTipsOutput> {
  return personalizedTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedTipsPrompt',
  input: {schema: PersonalizedTipsInputSchema},
  output: {schema: PersonalizedTipsOutputSchema},
  prompt: `You are a mental health expert. Generate personalized mental health tips based on the user's current mood and stressors.

Mood: {{{mood}}}
Stressors: {{{stressors}}}

Tips:`,
});

const personalizedTipsFlow = ai.defineFlow(
  {
    name: 'personalizedTipsFlow',
    inputSchema: PersonalizedTipsInputSchema,
    outputSchema: PersonalizedTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
