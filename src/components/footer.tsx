import Link from 'next/link';
import { Heart } from 'lucide-react';

const navLinks = [
  { href: '/blog', label: 'Blog' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-auto">
      <div className="container mx-auto px-8 py-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
             <Heart className="h-5 w-5 text-primary" />
            <span className="text-base font-semibold text-foreground">
              Terapia Digital
            </span>
          </div>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Terapia Digital. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
