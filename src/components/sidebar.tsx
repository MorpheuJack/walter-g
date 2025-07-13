'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';

interface SidebarProps {
  navLinks: { href: string; label: string }[];
}

export default function Sidebar({ navLinks }: SidebarProps) {
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
      </div>
    </aside>
  );
}
