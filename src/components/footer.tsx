import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-auto">
      <div className="container mx-auto px-8 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
             <Heart className="h-5 w-5 text-primary" />
            <span className="text-base font-semibold text-foreground">
              Terapia Digital
            </span>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Terapia Digital. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
