'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/chat', label: 'Chat' },
];

export default function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname.startsWith(href);
    return (
      <Link
        href={href}
        className={cn(
          'text-base font-medium transition-colors hover:text-white',
          isActive ? 'text-white' : 'text-primary/80'
        )}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 z-50 w-full p-4">
      <motion.div 
        className="container mx-auto flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur-lg"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }}
      >
        <Link href="/" className="flex items-center gap-2" aria-label="Voltar para Início">
          <Heart className="h-7 w-7 text-primary transition-transform duration-300 hover:scale-110" />
        </Link>

        <nav className="hidden items-center gap-4 md:flex">
          <div className="flex items-center gap-6 rounded-full border border-white/10 bg-black/20 px-6 py-2">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </div>
        </nav>

        <div className="flex items-center">
          <Button asChild className="rounded-full border border-primary/50 bg-primary/20 px-6 text-base font-semibold text-primary transition-all duration-300 hover:bg-primary/30 hover:text-white hover:shadow-lg hover:shadow-primary/20">
            <Link href="/#analysis-section">Começar Análise</Link>
          </Button>
        </div>
      </motion.div>
    </header>
  );
}
