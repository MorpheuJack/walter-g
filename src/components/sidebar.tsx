
'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Badge } from './ui/badge';

interface Post {
    title: string;
    category: string;
    imageUrl: string;
    aiHint: string;
    description: string;
}

interface SidebarProps {
  navLinks: { href: string; label: string }[];
  featuredPosts: Post[];
}

export default function Sidebar({ navLinks, featuredPosts }: SidebarProps) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` }
    );

    navLinks.forEach((link) => {
      const element = document.getElementById(link.href.substring(1));
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      navLinks.forEach((link) => {
        const element = document.getElementById(link.href.substring(1));
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [navLinks]);


  return (
    <aside className="sticky top-24">
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-foreground mb-3">Neste artigo</h3>
          <nav className="flex flex-col space-y-1 border-l-2 border-border">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block -ml-px pl-4 py-1 text-sm text-muted-foreground border-l-2 ',
                  activeId === link.href.substring(1)
                    ? 'border-primary text-primary font-semibold'
                    : 'border-transparent hover:border-foreground/50 hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="space-y-3">
          <Button className="w-full" asChild>
            <Link href="/chat">Falar com Bússola AI</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/blog">Voltar ao Blog</Link>
          </Button>
        </div>
         <div>
          <h3 className="font-semibold text-foreground mb-4">Posts em Destaque</h3>
            <div className="space-y-4">
                {featuredPosts.map((post) => (
                    <Link href="/blog/post-exemplo" key={post.title} className="group flex items-center gap-4">
                        <div className="relative h-16 w-16 flex-shrink-0">
                            <Image
                                src={post.imageUrl}
                                alt={post.title}
                                fill
                                className="rounded-md object-cover"
                                data-ai-hint={post.aiHint}
                            />
                        </div>
                        <div>
                            <Badge variant="secondary" className="mb-1 text-xs">{post.category}</Badge>
                            <h4 className="text-sm font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
                                {post.title}
                            </h4>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
      </div>
    </aside>
  );
}
