
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const content = [
  {
    chapter: '01',
    title: 'Respiração Profunda',
    description: [
      'Mindfulness é a prática de prestar atenção ao momento presente sem julgamento. Isso pode ajudá-lo a se desvincular de pensamentos ansiosos sobre o passado ou o futuro.',
      'Mindfulness é a prática de prestar atenção ao momento presente sem julgamento. Isso pode ajudá-lo a se desvincular de pensamentos ansiosos sobre o passado ou o futuro.',
      'Mindfulness é a prática de prestar atenção ao momento presente sem julgamento. Isso pode ajudá-lo a se desvincular de pensamentos ansiosos sobre o passado ou o futuro.',
      'Mindfulness é a prática de prestar atenção ao momento presente sem julgamento. Isso pode ajudá-lo a se desvincular de pensamentos ansiosos sobre o passado ou o futuro.',
      'Quando você está ansioso, sua respiração se torna rápida e superficial. A respiração profunda e diafragmática é uma ferramenta poderosa para acalmar seu sistema nervoso. Encontre um lugar tranquilo, inspire lentamente pelo nariz por quatro segundos, segure por quatro e expire pela boca por seis. Repita por vários minutos.',
    ],
  },
  {
    chapter: '02',
    title: 'Incorpore o Mindfulness',
    description: [
      'Mindfulness é a prática de prestar atenção ao momento presente sem julgamento. Isso pode ajudá-lo a se desvincular de pensamentos ansiosos sobre o passado ou o futuro.',
      'Mindfulness é a prática de prestar atenção ao momento presente sem julgamento. Isso pode ajudá-lo a se desvincular de pensamentos ansiosos sobre o passado ou o futuro.',
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
        'Mindfulness é a prática de prestar atenção ao momento presente sem julgamento. Isso pode ajudá-lo a se desvincular de pensamentos ansiosos sobre o passado ou o futuro.',
        'Mindfulness é a prática de prestar atenção ao momento presente sem julgamento. Isso pode ajudá-lo a se desvincular de pensamentos ansiosos sobre o passado ou o futuro.',
        'Mindfulness é a prática de prestar atenção ao momento presente sem julgamento. Isso pode ajudá-lo a se desvincular de pensamentos ansiosos sobre o passado ou o futuro.',
        'Mindfulness é a prática de prestar atenção ao momento presente sem julgamento. Isso pode ajudá-lo a se desvincular de pensamentos ansiosos sobre o passado ou o futuro.',
        'Mindfulness é a prática de prestar atenção ao momento presente sem julgamento. Isso pode ajudá-lo a se desvincular de pensamentos ansiosos sobre o passado ou o futuro.',
        'Mindfulness é a prática de prestar atenção ao momento presente sem julgamento. Isso pode ajudá-lo a se desvincular de pensamentos ansiosos sobre o passado ou o futuro.',
        'Mindfulness é a prática de prestar atenção ao momento presente sem julgamento. Isso pode ajudá-lo a se desvincular de pensamentos ansiosos sobre o passado ou o futuro.',
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

const ChapterSection = ({ chapter, title, description, isReversed }: { chapter: string; title: string; description: string[]; isReversed?: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <motion.section 
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 lg:gap-12 px-4 py-24"
    >
      <div className={`self-start lg:sticky lg:top-32 lg:col-span-1 ${isReversed ? 'lg:order-last' : ''}`}>
        <p className="text-[10rem] lg:text-[15rem] font-black text-foreground/10 leading-none text-center lg:text-left">{chapter}</p>
      </div>

      <div className="lg:col-span-2">
        <div className="w-full space-y-6">
          <h3 className="text-3xl font-bold tracking-tight text-primary">
            {title}
          </h3>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            {description.map((paragraph, pIndex) => (
              <p key={pIndex}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
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
      
      <div className="flex flex-col">
        {content.map((item, index) => (
          <ChapterSection 
            key={index} 
            chapter={item.chapter} 
            title={item.title} 
            description={item.description}
            isReversed={index % 2 !== 0} 
          />
        ))}
      </div>
    </div>
  );
}
