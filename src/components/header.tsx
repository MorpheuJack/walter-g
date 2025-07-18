'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const headerClasses = cn(
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
