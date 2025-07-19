
'use client';

import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import MobileMenu from './header-mobile';
import NavigationElements from './navigation-elements';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/blog', label: 'Blog' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    // Check if scrolled past the viewport height (past the hero)
    if (typeof window !== 'undefined') {
        setIsScrolled(latest > window.innerHeight * 0.9);
    }
  });

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth >= 768) {
            setIsMobileMenuOpen(false);
        }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);
  
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
        className={cn(
            "fixed top-0 z-50 w-full transition-colors duration-300",
            isScrolled ? 'bg-background' : 'bg-transparent'
        )}
      >
        <div className="container flex h-20 items-center justify-between">
           <NavigationElements navLinks={navLinks} showCta={true} isHeaderScrolled={isScrolled} />

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
