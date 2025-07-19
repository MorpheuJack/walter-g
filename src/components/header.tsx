'use client';

import Link from 'next/link';
import { Heart, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MobileMenu from './header-mobile';

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/blog', label: 'Blog' },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const headerClasses = cn(
      'fixed top-0 z-50 w-full transition-all duration-300',
      isScrolled || isMobileMenuOpen ? 'border-b border-border/50 bg-background/80 backdrop-blur-lg' : 'bg-transparent'
    );
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [pathname]);

  return (
    <>
      <header className={headerClasses}>
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="Voltar para Início">
            <Heart className="h-7 w-7 text-primary transition-transform duration-300 hover:scale-110" />
            <span className="font-bold hidden sm:inline-block">Terapia Digital</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative text-sm font-medium transition-colors hover:text-primary',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                   {isActive && (
                    <motion.div
                      className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-primary"
                      layoutId="underline"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
              <Button asChild className="hidden md:flex font-semibold transition-transform duration-300 hover:scale-105">
                <Link href="/#analysis-section">
                  <Heart className="mr-2 h-5 w-5" />
                  Receber Análise Gratuita
                </Link>
              </Button>
            <div className="md:hidden">
              <Button onClick={toggleMobileMenu} variant="ghost" size="icon">
                <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={isMobileMenuOpen ? 'x' : 'menu'}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isMobileMenuOpen ? <X/> : <Menu />}
                    </motion.div>
                </AnimatePresence>
                <span className="sr-only">Abrir menu</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
       <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu 
            links={navLinks} 
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
