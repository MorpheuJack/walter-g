
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Heart } from 'lucide-react';
import TableOfContents from '@/components/table-of-contents';
import Image from 'next/image';
import Link from 'next/link';
import AudioPlayer from '@/components/audio-player';
import NavigationElements from '@/components/navigation-elements';

const post = {
  title: '5 Maneiras de Lidar com a Ansiedade no Dia a Dia',
  description: 'Estratégias práticas e eficazes para gerenciar a ansiedade e encontrar mais calma em sua rotina diária.',
  imageUrl: '/pessoas_meditando.png',
  aiHint: 'calm serene meditation'
}

const content = [
  {
    id: 'introduction',
    title: 'Introdução: Um Alarme que Não Desliga',
    paragraphs: [
      "A ansiedade parece um alarme que nunca desliga. O coração acelera, a mente dispara com preocupações e uma sensação de aperto no peito se torna uma companhia constante. Se isso soa familiar, saiba que você não está sozinho. A ansiedade é uma das experiências mais comuns no mundo moderno, mas não precisa ser a sua sentença.",
      "No dia a dia, pequenas mudanças de hábito e a aplicação de técnicas específicas podem fazer uma enorme diferença, transformando o modo como você reage aos gatilhos de estresse.",
      "Aqui no Terapia Digital, acreditamos no poder de ferramentas práticas para promover sua saúde mental. Por isso, preparamos uma lista com 5 maneiras eficazes e comprovadas de lidar com a ansiedade no dia a dia, permitindo que você respire mais aliviado e retome as rédeas da sua vida."
    ]
  },
  {
    id: 'breathing-technique',
    title: 'A Técnica da Respiração Diafragmática',
    paragraphs: [
      "Quando a ansiedade ataca, nossa respiração se torna curta e rápida, intensificando a sensação de pânico. A respiração diafragmática, ou abdominal, é a maneira mais rápida de comunicar ao seu cérebro que está tudo bem e que é seguro relaxar.",
      "Como praticar: Encontre um lugar tranquilo e sente-se ou deite-se confortavelmente. Posicione uma mão sobre o peito e a outra sobre o abdômen.",
      "Inspire lentamente pelo nariz por 4 segundos. O objetivo é sentir sua barriga expandir, enquanto o peito se move o mínimo possível. Segure a respiração por 2 segundos.",
      "Expire lentamente pela boca por 6 segundos, sentindo o abdômen se contrair. Repita este ciclo por 5 a 10 vezes.",
      "Essa técnica de relaxamento simples pode ser usada em qualquer lugar – antes de uma reunião importante, no trânsito ou durante uma crise de ansiedade."
    ]
  },
  {
    id: 'mindfulness',
    title: 'Mindfulness: A Arte de Focar no Agora',
    paragraphs: [
      "A ansiedade prospera com preocupações sobre o futuro ('e se...') e ruminações sobre o passado. O mindfulness, ou atenção plena, é a prática de trazer sua consciência para o momento presente, sem julgamentos.",
      "Para controlar a ansiedade com mindfulness, use a Técnica 5-4-3-2-1. Quando sentir a mente acelerar, pause e identifique: 5 coisas que você pode ver (olhe ao redor e nomeie cinco objetos); 4 coisas que você pode sentir (a textura da sua roupa, a cadeira sob você); 3 coisas que você pode ouvir (o teclado, um pássaro lá fora); 2 coisas que você pode cheirar (o aroma do café, um perfume); e 1 coisa que você pode provar (um gole de água).",
      "Essa prática ancora você no presente de forma imediata, interrompendo o ciclo de pensamentos ansiosos e trazendo sua atenção para a realidade sensorial."
    ]
  },
  {
    id: 'worry-time',
    title: 'Organize Suas Preocupações: O "Tempo de Preocupação"',
    paragraphs: [
      "Pode parecer contraintuitivo, mas agendar um horário para se preocupar é uma técnica poderosa da Terapia Cognitivo-Comportamental (TCC). Em vez de deixar a ansiedade consumir seu dia inteiro, você designa um período específico para ela.",
      "Para implementar, agende um horário fixo de 15 a 20 minutos no seu dia, evitando que seja perto da hora de dormir. Quando uma preocupação surgir fora desse período, anote-a e diga a si mesmo: 'Vou pensar sobre isso no meu tempo de preocupação'.",
      "Durante o tempo agendado, revise a lista. Você pode descobrir que muitas das preocupações já não parecem tão urgentes. Para as que restam, pense em um pequeno passo que você pode dar para resolvê-las. Isso helps a conter a ansiedade, em vez de deixá-la livre para aparecer a qualquer momento."
    ]
  },
  {
    id: 'movement',
    title: 'Movimente o Corpo para Acalmar a Mente',
    paragraphs: [
      "A atividade física é um dos antidepressivos e ansiolíticos mais naturais que existem. Exercícios liberam endorfinas, neurotransmissores que promovem uma sensação de bem-estar e aliviam a tensão física e mental.",
      "Você não precisa correr uma maratona. Encontrar uma atividade que você goste é a chave para a consistência. Pode ser uma caminhada de 20 minutos para espairecer, uma prática de yoga que combina movimento e respiração, ou simplesmente dançar sua música favorita.",
      "O importante é quebrar o estado de imobilidade e tensão que a ansiedade muitas vezes impõe, usando o movimento para mudar seu estado fisiológico e emocional."
    ]
  },
  {
    id: 'question-thoughts',
    title: 'Questione Seus Pensamentos Ansiosos',
    paragraphs: [
      "A ansiedade muitas vezes nos faz acreditar em cenários catastróficos como se fossem fatos. Aprender a questionar esses pensamentos é fundamental para reduzir seu poder sobre você.",
      "Quando um pensamento ansioso surgir, pergunte-se: Qual é a evidência real de que isso vai acontecer? Qual é a pior coisa que realisticamente poderia acontecer, e eu conseguiria lidar com isso?",
      "Questione também: Existe uma maneira mais realista de ver esta situação? Que conselho eu daria a um amigo que estivesse pensando isso?",
      "Ao desafiar a validade desses pensamentos, você cria uma distância saudável entre você e a sua ansiedade, percebendo que seus pensamentos não são, necessarily, a realidade."
    ]
  },
  {
    id: 'conclusion',
    title: 'Conclusão: Seu Próximo Passo',
    paragraphs: [
      "Lidar com a ansiedade no dia a dia é um processo contínuo, não uma solução instantânea. Comece escolhendo uma ou duas dessas técnicas para praticar. Seja gentil consigo mesmo e celebre as pequenas vitórias.",
      "Lembre-se: entender como controlar a ansiedade é um ato de autocuidado e fortalecimento.",
      "Se a ansiedade continua sendo um obstáculo significativo em sua vida, buscar o apoio de um profissional de saúde mental é um passo corajoso e transformador. Aqui no Terapia Digital, conectamos você a psicólogos qualificados que podem oferecer orientação personalizada e estratégias eficazes para o seu bem-estar."
    ]
  }
];

const posts = [
  {
    title: 'Introdução ao Mindfulness para Iniciantes',
    category: 'Mindfulness',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'meditation peaceful',
    description: 'Um guia passo a passo para começar a praticar a atenção plena e reduzir o estresse.',
  },
  {
    title: 'A Importância de Estabelecer Limites Saudáveis',
    category: 'Relacionamentos',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'strong confident person',
    description: 'Aprenda a definir limites em seus relacionamentos para proteger sua energia e bem-estar emocional.',
  },
  {
    title: 'Como a Terapia Cognitivo-Comportamental (TCC) Pode Ajudar',
    category: 'Terapia',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'brain illustration',
    description: 'Entenda os princípios da TCC e como ela pode ser uma ferramenta poderosa para mudar padrões de pensamento.',
  },
];


export default function BlogPostPage() {
  const navLinks = content.map(item => ({ href: `#${item.id}`, label: item.title }));
  const contentRef = useRef<HTMLDivElement>(null);
  const [isTitleBarVisible, setIsTitleBarVisible] = useState(false);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { top } = contentRef.current.getBoundingClientRect();
        setIsTitleBarVisible(top <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isTitleBarVisible && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border/50"
          >
            <div className="container flex h-20 items-center justify-between">
                <NavigationElements navLinks={[{href: '#', label: post.title}]} showCta={true} isHeaderScrolled={true} />
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <section className="relative w-full min-h-[95vh] flex items-center justify-center text-center text-white p-4">
        <Image
          src={post.imageUrl}
          data-ai-hint={post.aiHint}
          alt="Pessoas meditando em um parque tranquilo"
          fill
          className="object-cover -z-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-hero-purple/95 via-hero-purple/80 to-background -z-10"></div>
        <div className="container max-w-4xl mx-auto z-10 flex flex-col items-center">
          <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
            >
              <Heart className="h-7 w-7 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg"
          >
            {post.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-4 text-lg text-white/80"
          >
            {post.description}
          </motion.p>
          <motion.button
            onClick={scrollToContent}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            aria-label="Rolar para o conteúdo"
          >
            <ChevronDown className="h-8 w-8 text-white/80 animate-bounce" />
          </motion.button>
        </div>
      </section>
      
      <div ref={contentRef} className="container mx-auto px-4 py-12 md:py-16">
          <div className="relative lg:grid lg:grid-cols-[288px_1fr] lg:gap-12">
            <div className="hidden lg:sticky lg:top-24 lg:block h-fit bg-card p-6 rounded-2xl border">
              <aside>
                <TableOfContents
                  navLinks={navLinks}
                  featuredPosts={posts}
                  showExtras={true}
                  imageUrl={post.imageUrl}
                />
              </aside>
            </div>

            <main className="w-full max-w-4xl mx-auto">
                <div className="my-12 lg:hidden">
                  <TableOfContents navLinks={navLinks} featuredPosts={[]} showExtras={false} />
                  <div className="mt-8">
                     <AudioPlayer isMobile={true} imageUrl={post.imageUrl}/>
                  </div>
                </div>
                
                <article
                  className="prose prose-lg max-w-none prose-p:text-muted-foreground"
                >
                  {content.map((section) => (
                    <section key={section.id} id={section.id} className="scroll-mt-24">
                      <h2>{section.title}</h2>
                      {section.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </section>
                  ))}
                </article>
            </main>
          </div>
      </div>
    </>
  );
}
