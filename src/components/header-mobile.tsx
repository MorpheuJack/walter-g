
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';

interface MobileMenuProps {
  links: { href: string; label: string }[];
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants = {
  open: { opacity: 1, transition: { duration: 0.3 } },
  closed: { opacity: 0, transition: { duration: 0.3, delay: 0.3 } },
};

const menuVariants = {
  open: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const menuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export default function MobileMenu({ links, isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <motion.div
      className="fixed inset-0 z-40 bg-background/80 backdrop-blur-lg"
      variants={overlayVariants}
      initial="closed"
      animate="open"
      exit="closed"
      onClick={onClose}
    >
      <motion.div
        className="container flex h-full flex-col items-center justify-center"
        variants={menuVariants}
      >
        <motion.nav 
          variants={menuVariants}
          className="flex flex-col items-center gap-8 text-center"
        >
          {links.map((link) => (
            <motion.div key={link.href} variants={menuItemVariants}>
              <Link
                href={link.href}
                className={cn(
                  'text-3xl font-bold tracking-tight transition-colors hover:text-primary',
                  pathname === link.href ? 'text-primary' : 'text-foreground'
                )}
                onClick={onClose}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
        <motion.div className="mt-12" variants={menuItemVariants}>
           <Button asChild size="lg" className="font-semibold transition-transform duration-300 hover:scale-105">
              <Link href="/#analysis-section" onClick={onClose}>
                <Heart className="mr-2 h-5 w-5" />
                Receber Análise Gratuita
              </Link>
            </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
