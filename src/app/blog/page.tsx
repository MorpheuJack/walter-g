
'use client';

import BlogPostCard from '@/components/blog-post-card';
import { motion } from 'framer-motion';
import Image from 'next/image';

const posts = [
  {
    title: '5 Maneiras de Lidar com a Ansiedade no Dia a Dia',
    category: 'Ansiedade',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'calm serene',
    description: 'Estratégias práticas e eficazes para gerenciar a ansiedade e encontrar mais calma em sua rotina diária.',
  },
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
    {
    title: 'O Impacto do Sono na Saúde Mental',
    category: 'Bem-estar',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'peaceful sleep',
    description: 'Descubra a conexão profunda entre uma boa noite de sono e sua estabilidade emocional.',
  },
  {
    title: 'Construindo Resiliência em Tempos de Incerteza',
    category: 'Desenvolvimento Pessoal',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'mountain sunrise',
    description: 'Ferramentas e mentalidades para fortalecer sua capacidade de superar desafios e adversidades.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function BlogPage() {
  return (
    <div className="w-full">
       <section className="relative w-full h-[50vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://placehold.co/1920x1080.png"
            data-ai-hint="dark green leaves"
            alt="Fundo do blog"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <h1 className="text-5xl font-extrabold tracking-tighter sm:text-7xl md:text-8xl font-headline text-white">
            Nosso Blog
          </h1>
          <p className="max-w-[600px] mx-auto mt-4 text-primary/80 md:text-xl">
            Artigos, dicas e reflexões para apoiar sua jornada de autoconhecimento e bem-estar.
          </p>
        </motion.div>
      </section>

      <motion.div
        className="container mx-auto px-4 py-16 md:py-24 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {posts.map((post, index) => (
          <motion.div key={index} variants={itemVariants}>
            <BlogPostCard {...post} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
