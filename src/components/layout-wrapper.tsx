
'use client';

import { usePathname } from 'next/navigation';
import Header from './header';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isBlogPostPage = pathname.startsWith('/blog/post-exemplo');

  return (
    <>
      {!isHomePage && !isBlogPostPage && <Header />}
      <main>
        {children}
      </main>
    </>
  );
}
