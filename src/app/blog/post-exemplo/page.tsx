
'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const content = [
  {
    chapter: '01',
    title: 'Respiração Profunda',
    description: [
      'A ansiedade é uma resposta natural do corpo ao estresse. É um sentimento de medo ou apreensão sobre o que está por vir. O primeiro dia de aula, uma entrevista de emprego ou um discurso podem causar ansiedade na maioria das pessoas. Mas se seus sentimentos de ansiedade são extremos, duram mais de seis meses e estão interferindo em sua vida, você pode ter um transtorno de ansiedade.',
      'Quando você está ansioso, sua respiração se torna rápida e superficial. A respiração profunda e diafragmática é uma ferramenta poderosa para acalmar seu sistema nervoso. Encontre um lugar tranquilo, inspire lentamente pelo nariz por quatro segundos, segure por quatro e expire pela boca por seis. Repita por vários minutos.',
    ],
  },
  {
    chapter: '02',
    title: 'Incorpore o Mindfulness',
    description: [
        'Mindfulness é a prática de prestar atenção ao momento presente sem julgamento. Isso pode ajudá-lo a se desvincular de pensamentos ansiosos sobre o passado ou o futuro.',
        'Tente focar em suas sensações: o que você vê, ouve, cheira, sente? A prática regular ajuda a treinar sua mente a não se deixar levar por preocupações, trazendo uma sensação de controle e paz interior.',
        '"O momento presente é o único momento disponível para nós, e é a porta para todos os outros momentos." - Thich Nhat Hanh'
    ],
  },
  {
    chapter: '03',
    title: 'Movimente Seu Corpo',
    description: [
        'A atividade física é um redutor de estresse muito eficaz. O exercício regular pode diminuir os hormônios do estresse, como o cortisol, e aumentar as endorfinas, que melhoram o humor.',
        'Não precisa ser um treino intenso; uma caminhada de 30 minutos por dia pode fazer uma grande diferença. Encontre uma atividade que você goste para que seja mais fácil manter a consistência.',
    ],
  },
    {
    chapter: '04',
    title: 'Desafie Pensamentos',
    description: [
      'A Terapia Cognitivo-Comportamental (TCC) nos ensina a identificar, desafiar e reformular nossos pensamentos negativos. Quando um pensamento ansioso surgir, pergunte a si mesmo: "Existe uma maneira mais positiva de ver esta situação?", "Qual é a evidência de que esse pensamento é verdadeiro?", "O que eu diria a um amigo que tivesse esse mesmo pensamento?"',
    ],
  },
  {
    chapter: '05',
    title: 'Priorize o Sono',
    description: [
      'A falta de sono pode ampliar os pensamentos e sentimentos ansiosos. Estabelecer uma rotina de sono consistente e relaxante é crucial. Tente criar um ambiente de sono calmo, escuro e fresco, e evite telas pelo menos uma hora antes de dormir.',
      'Lidar com a ansiedade é uma jornada. Seja paciente e compassivo consigo mesmo. Pequenos passos consistentes podem levar a grandes melhorias em seu bem-estar geral. Se a sua ansiedade for grave, considere procurar a ajuda de um profissional de saúde mental.',
    ],
  },
];

const Chapter = ({ number }: { number: string }) => {
  return (
    <div className="sticky top-0 flex h-screen items-center justify-center">
      <p className="text-[20rem] font-black text-foreground/10 leading-none">{number}</p>
    </div>
  );
};

export default function BlogPostPage() {
  return (
    <div className="w-full bg-background text-foreground">
      <header className="container mx-auto max-w-6xl px-4 py-24 md:py-32 text-left">
         <Badge variant="secondary">Ansiedade</Badge>
        <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-foreground max-w-3xl">
          5 Maneiras de Lidar com a Ansiedade no Dia a Dia
        </h1>
      </header>
      
      <div className="container mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-3 lg:gap-12 px-4">
        {/* Left Column for Chapter Numbers */}
        <div className="hidden lg:block lg:col-span-1">
          {content.map((item, index) => (
            <Chapter key={index} number={item.chapter} />
          ))}
        </div>

        {/* Right Column for Content */}
        <div className="lg:col-span-2">
          {content.map((item, index) => (
            <section key={index} className="flex min-h-screen items-center py-24">
              <div className="w-full space-y-6">
                 <h2 className="lg:hidden text-8xl font-black text-foreground/10 leading-none">{item.chapter}</h2>
                <h3 className="text-3xl font-bold tracking-tight text-primary">
                  {item.title}
                </h3>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  {item.description.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

       <footer className="container mx-auto max-w-6xl px-4 py-24">
          <div className="border-t border-border pt-12 flex items-center gap-6">
             <Image
                src="https://placehold.co/100x100.png"
                data-ai-hint="professional woman smiling"
                alt="Foto da autora Ana de Almeida"
                width={80}
                height={80}
                className="rounded-full border-2 border-primary"
              />
            <div>
              <p className="text-sm text-muted-foreground">Escrito por</p>
              <h4 className="text-xl font-bold text-foreground">Ana de Almeida</h4>
              <p className="mt-1 text-base text-muted-foreground">
                Ana é uma psicóloga licenciada com mais de 10 anos de experiência em Terapia Cognitivo-Comportamental e Mindfulness.
              </p>
            </div>
          </div>
        </footer>
    </div>
  );
}
