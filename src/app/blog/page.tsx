
'use client';

import BlogPostCard from '@/components/blog-post-card';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
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

const featuredPost = posts[0];
const otherPosts = posts.slice(1);


export default function BlogPage() {
  return (
    <div className="w-full">
       <motion.section 
        className="relative w-full min-h-[80vh] lg:min-h-screen flex items-center overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
       >
        <motion.div 
          className="absolute inset-0 z-0"
          variants={{
            hidden: { opacity: 0, scale: 1.1 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
          }}
        >
          <Image
            src={featuredPost.imageUrl}
            data-ai-hint={featuredPost.aiHint}
            alt={featuredPost.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent lg:bg-gradient-to-r lg:from-background lg:via-background/70 lg:to-transparent"></div>
        </motion.div>
        
        <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div className="text-white py-12" variants={itemVariants}>
              <Badge variant="secondary" className="mb-4">{featuredPost.category}</Badge>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-headline">
                {featuredPost.title}
              </h1>
              <p className="mt-6 text-lg text-primary/80 md:text-xl max-w-lg">
                {featuredPost.description}
              </p>
              <Button asChild size="lg" className="mt-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-300 hover:scale-105">
                 <Link href="/blog/post-exemplo">
                    Ler Artigo
                    <ArrowRight className="ml-2 h-5 w-5" />
                 </Link>
              </Button>
            </motion.div>
            
            <motion.div 
              className="hidden lg:grid grid-cols-1 gap-8"
            >
              <motion.div variants={itemVariants}>
                <BlogPostCard {...posts[1]} />
              </motion.div>
              <motion.div variants={itemVariants}>
                <BlogPostCard {...posts[2]} />
              </motion.div>
            </motion.div>
        </div>
      </motion.section>

      <motion.div
        className="container mx-auto px-4 py-16 md:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-12"
          variants={itemVariants}
        >
          Mais Artigos
        </motion.h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {otherPosts.map((post, index) => (
            <motion.div key={index} variants={itemVariants}>
              <BlogPostCard {...post} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
