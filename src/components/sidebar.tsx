'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/recursos', label: 'Recursos' },
  { href: '/ansiedade', label: 'Ansiedade' },
  { href: '/depressao', label: 'Depressão' },
  { href: '/relacionamentos', label: 'Relacionamentos' },
];

export default function Sidebar() {
  const pathname = usePathname();

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          'transition-colors hover:text-white',
          isActive ? 'text-white font-bold' : 'text-primary'
        )}
      >
        {label}
      </Link>
    );
  };

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-full w-24 flex-col items-center justify-between bg-black/10 py-8 backdrop-blur-sm">
      <Link href="/" className="text-lg font-bold tracking-[0.3em] text-white [writing-mode:vertical-rl] transform rotate-180">
        WALTER
      </Link>
      
      <nav className="flex flex-col items-center space-y-12 [writing-mode:vertical-rl]">
        {navLinks.map((link) => (
          <div key={link.href} className="transform rotate-180">
             <NavLink {...link} />
          </div>
        ))}
      </nav>

      <div />
    </aside>
  );
}
