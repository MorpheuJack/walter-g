
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

interface NavigationElementsProps {
    navLinks: { href: string; label: string }[];
    showCta: boolean;
    isHeaderScrolled?: boolean;
}

export default function NavigationElements({ navLinks, showCta, isHeaderScrolled = false }: NavigationElementsProps) {
    const pathname = usePathname();
    const isBlogPost = pathname.startsWith('/blog/post-exemplo');

    const elementStyle = 'bg-background/50 backdrop-blur-sm border border-white/10 shadow-md';

    return (
        <>
            <Link href="/" className="flex items-center gap-2" aria-label="Voltar para Início">
                <div className={cn(
                    "flex items-center justify-center p-2 rounded-full transition-all duration-300",
                    isBlogPost && isHeaderScrolled ? elementStyle : 
                    !isHeaderScrolled && !isBlogPost ? elementStyle : 'bg-transparent border-none shadow-none'
                )}>
                    <Heart className="h-6 w-6 text-primary transition-transform duration-300 hover:scale-110" />
                </div>
            </Link>

            <nav className={cn(
                "hidden md:flex items-center gap-2 p-2 rounded-full transition-all duration-300",
                isBlogPost && isHeaderScrolled ? '' : elementStyle
            )}>
                {navLinks.map((link) => {
                const isActive = pathname === link.href && !isBlogPost;
                return (
                    isBlogPost ? (
                       <p key={link.href} className="px-4 py-2 text-sm font-semibold text-foreground truncate max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                         {link.label}
                       </p>
                    ) : (
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
                        className={cn(
                            "absolute inset-0 rounded-full -z-10",
                            isHeaderScrolled ? 'bg-primary/20' : 'bg-primary/10'
                        )}
                        layoutId="underline"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                    )}
                    </Link>
                    )
                );
                })}
            </nav>
            
            <div className="flex items-center gap-4">
                {showCta && (
                     <Button asChild className={cn(
                        "hidden md:flex font-semibold transition-all duration-300 hover:scale-105",
                        isHeaderScrolled ? 'bg-primary hover:bg-primary/90' : 'shadow-md'
                     )}>
                        <Link href="/#analysis-section">
                        <Heart className="mr-2 h-5 w-5" />
                        Receber Análise Gratuita
                        </Link>
                    </Button>
                )}
                 {!showCta && (
                    <div className="hidden md:block w-[244px]"></div>
                )}
            </div>
        </>
    );
}
