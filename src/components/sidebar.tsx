'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface SidebarProps {
  navLinks: { href: string; label: string }[];
}

export default function Sidebar({ navLinks }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-24">
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-foreground mb-3">Neste artigo</h3>
          <nav className="flex flex-col space-y-2 border-l-2 border-border">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block -ml-px pl-4 text-sm text-muted-foreground border-l-2 border-transparent hover:text-foreground hover:border-foreground',
                  // TODO: Add active state based on scroll position
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="space-y-3">
          <Button className="w-full">Falar com Especialista</Button>
          <Button variant="secondary" className="w-full" asChild>
            <Link href="/blog">Voltar ao Blog</Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}
