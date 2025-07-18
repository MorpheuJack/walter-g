
'use client';

import BlogPostCard from '@/components/blog-post-card';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';

const posts = [
  {
    title: '5 Maneiras de Lidar com a Ansiedade no Dia a Dia',
    category: 'Ansiedade',
    imageUrl: 'https://placehold.co/1200x800.png',
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
      delayChildren: 0.3,
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
       <motion.section 
        className="w-full py-24 md:py-32"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
       >
        <div className="container mx-auto px-4 text-center">
            <motion.h1 
                className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
                variants={itemVariants}
            >
                Blog Terapia Digital
            </motion.h1>
            <motion.p 
                className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl"
                variants={itemVariants}
            >
                Artigos, dicas e reflexões para sua jornada de autoconhecimento e bem-estar.
            </motion.p>
             <motion.div className="mt-8" variants={itemVariants}>
              <Button asChild size="lg" className="transition-transform duration-300 hover:scale-105">
                <Link href="/#analysis-section">
                  <Heart className="mr-2 h-5 w-5" />
                  Receber Análise Gratuita
                </Link>
              </Button>
            </motion.div>
        </div>
      </motion.section>

      <motion.div
        className="container mx-auto px-4 pb-16 md:pb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.div key={index} variants={itemVariants}>
              <BlogPostCard {...post} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
