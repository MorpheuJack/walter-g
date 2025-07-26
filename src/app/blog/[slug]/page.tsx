
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
import { postsData, Post } from '@/lib/blog-data';
import { notFound } from 'next/navigation';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = postsData.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const navLinks = post.content.map(item => ({ href: `#${item.id}`, label: item.title }));
  const contentRef = useRef<HTMLDivElement>(null);
  const [isTitleBarVisible, setIsTitleBarVisible] = useState(false);
  
  // Filter out the current post from the featured list
  const featuredPosts = postsData.filter(p => p.slug !== params.slug).slice(0, 3);

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
          alt={post.title}
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
            onClick={() => contentRef.current?.scrollIntoView({ behavior: 'smooth' })}
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
                  featuredPosts={featuredPosts}
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
                  {post.content.map((section) => (
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
