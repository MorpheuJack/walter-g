'use client';

import { usePathname } from 'next/navigation';
import Header from './header';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      {!isHomePage && <Header />}
      <main className={!isHomePage ? 'pt-20' : ''}>
        {children}
      </main>
    </>
  );
}
