'use server';
/**
 * @fileOverview Um fluxo para o terapeuta digital Walter gerar conselhos de apoio.
 *
 * - getSupport - Uma função que gera conselhos de apoio com base no problema do usuário.
 * - GetSupportInput - O tipo de entrada para a função getSupport.
 * - GetSupportOutput - O tipo de retorno para a função getSupport.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetSupportInputSchema = z.object({
  email: z
    .string().email()
    .describe('O endereço de e-mail do usuário, para identificação.'),
  issue: z
    .string()
    .describe('A descrição do problema, dor ou ansiedade do usuário.'),
});

export type GetSupportInput = z.infer<typeof GetSupportInputSchema>;

const GetSupportOutputSchema = z.object({
  tips: z.array(z.string()).describe('Uma lista de dicas ou passos de ação úteis para o usuário.'),
});

export type GetSupportOutput = z.infer<typeof GetSupportOutputSchema>;

export async function getSupport(input: GetSupportInput): Promise<GetSupportOutput> {
  return getSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getSupportPrompt',
  input: {schema: GetSupportInputSchema},
  output: {schema: GetSupportOutputSchema},
  prompt: `Você é Walter, um terapeuta digital compassivo, solidário e especializado em saúde mental.
Seu objetivo é fornecer apoio emocional imediato e conselhos práticos.

Um usuário, {{email}}, está procurando ajuda.

O problema deles é: {{{issue}}}

Com base no problema deles, gere uma lista de 3 a 5 dicas, insights ou próximos passos acionáveis.
Seu tom deve ser empático, encorajador e profissional. Forneça conselhos que sejam seguros e geralmente aplicáveis.
Comece com uma breve afirmação de validação antes de listar as dicas.
Não se refira ao usuário pelo e-mail.`,
});

const getSupportFlow = ai.defineFlow(
  {
    name: 'getSupportFlow',
    inputSchema: GetSupportInputSchema,
    outputSchema: GetSupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
