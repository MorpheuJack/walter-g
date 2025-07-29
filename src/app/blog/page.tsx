
'use client';

import BlogPostCard from '@/components/blog-post-card';
import { motion } from 'framer-motion';
import { postsData } from '@/lib/blog-data';
import Image from 'next/image';

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
        className="relative w-full py-24 md:py-32 text-white"
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
          {postsData.map((post, index) => (
            <motion.div key={index} variants={itemVariants}>
              <BlogPostCard {...post} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
