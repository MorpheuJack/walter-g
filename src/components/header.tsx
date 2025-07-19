
'use client';

import Link from 'next/link';
import { Heart, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import MobileMenu from './header-mobile';

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/blog', label: 'Blog' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden && !isMobileMenuOpen ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 z-50 w-full bg-transparent backdrop-blur-lg"
      >
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="Voltar para Início">
             <div className="flex items-center justify-center p-2 rounded-full bg-background/50 backdrop-blur-sm border border-white/10 shadow-md">
                <Heart className="h-6 w-6 text-primary transition-transform duration-300 hover:scale-110" />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2 p-2 rounded-full bg-background/50 backdrop-blur-sm border border-white/10 shadow-md">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors hover:text-primary rounded-full',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                   {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-primary/10 rounded-full -z-10"
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
              <Button asChild className="hidden md:flex font-semibold transition-transform duration-300 hover:scale-105 shadow-md">
                <Link href="/#analysis-section">
                  <Heart className="mr-2 h-5 w-5" />
                  Receber Análise Gratuita
                </Link>
              </Button>
            <div className="md:hidden">
              <Button onClick={toggleMobileMenu} variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-background/50 backdrop-blur-sm border border-white/10 shadow-md">
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
      </motion.header>
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
