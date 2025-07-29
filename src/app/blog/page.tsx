
'use client';

import BlogPostCard from '@/components/blog-post-card';
import { motion } from 'framer-motion';
import { postsData, Post } from '@/lib/blog-data';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(postsData);

  useEffect(() => {
    const results = postsData.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchTerm]);

  return (
    <div className="w-full">
       <motion.section 
        className="relative w-full min-h-[80vh] flex items-center justify-center text-white"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
       >
        <Image
            src="/cadeira.jpg"
            alt="Blog background"
            fill
            className="object-cover -z-20"
            data-ai-hint="calm abstract"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-hero-purple/90 via-hero-purple/80 to-background -z-10"></div>
        <div className="container mx-auto px-4 text-center z-10">
            <motion.h1 
                className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl drop-shadow-lg"
                variants={itemVariants}
            >
                Blog Terapia Digital
            </motion.h1>
            <motion.p 
                className="mt-6 max-w-2xl mx-auto text-lg text-white/80 md:text-xl"
                variants={itemVariants}
            >
                Artigos, dicas e reflexões para sua jornada de autoconhecimento e bem-estar.
            </motion.p>
            <motion.div className="mt-8 max-w-lg mx-auto" variants={itemVariants}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Pesquisar artigos por tema ou palavra-chave..."
                  className="w-full rounded-full bg-background/80 py-6 pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground border-border/50 backdrop-blur-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 pt-16">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <motion.div key={post.slug} variants={itemVariants}>
                <BlogPostCard {...post} />
              </motion.div>
            ))
          ) : (
            <motion.div className="col-span-full text-center py-16" variants={itemVariants}>
                <p className="text-muted-foreground">Nenhum artigo encontrado.</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

