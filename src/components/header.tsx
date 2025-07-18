'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/blog', label: 'Blog' },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const isSpecialHeaderPage = pathname.startsWith('/blog') || pathname.startsWith('/chat');

  useEffect(() => {
    const isSpecial = pathname.startsWith('/blog') || pathname.startsWith('/chat');
    if (isSpecial) {
      setIsScrolled(false);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname.startsWith(href);
    return (
      <Link
        href={href}
        className={cn(
          'text-base font-medium transition-colors hover:text-primary',
          isActive ? 'text-primary' : 'text-muted-foreground'
        )}
      >
        {label}
      </Link>
    );
  };

  const headerClasses = isSpecialHeaderPage
    ? 'absolute top-0 z-50 w-full bg-transparent'
    : cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'border-b border-border/50 bg-background/80 backdrop-blur-lg' : 'bg-transparent'
      );

  return (
    <header className={headerClasses}>
       <div className="container flex h-20 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2 mr-6" aria-label="Voltar para Início">
            <Heart className="h-7 w-7 text-primary transition-transform duration-300 hover:scale-110" />
            <span className="font-bold hidden sm:inline-block">Terapia Digital</span>
          </Link>
          <nav className="items-center gap-6 text-sm hidden md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
           <AnimatePresence>
            {pathname !== '/' && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="hidden sm:flex"
              >
                <Button asChild className="font-semibold transition-transform duration-300 hover:scale-105">
                  <Link href="/#analysis-section">
                    <Heart className="mr-2 h-5 w-5" />
                    Receber Análise Gratuita
                  </Link>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
