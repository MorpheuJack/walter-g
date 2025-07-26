
'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Badge } from './ui/badge';
import AudioPlayer from './audio-player';
import type { Post } from '@/lib/blog-data';

interface TableOfContentsProps {
  navLinks: { href: string; label: string }[];
  featuredPosts: Post[];
  showExtras: boolean;
  imageUrl?: string;
}

export default function TableOfContents({ navLinks, featuredPosts, showExtras, imageUrl }: TableOfContentsProps) {
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
    <aside className="w-full">
      <div className="space-y-6">
        {showExtras && (
          <div className="mb-6 hidden lg:block">
            <AudioPlayer imageUrl={imageUrl}/>
          </div>
        )}
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
        {showExtras && (
          <>
            <div>
              <h3 className="font-semibold text-foreground my-4">Posts em Destaque</h3>
                <div className="space-y-4">
                    {featuredPosts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.title} className="group flex items-center gap-4">
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
          </>
        )}
      </div>
    </aside>
  );
}
