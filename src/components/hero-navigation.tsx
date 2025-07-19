'use client';

import NavigationElements from './navigation-elements';

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/blog', label: 'Blog' },
];

export default function HeroNavigation() {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 hidden md:block">
      <div className="container flex h-20 items-center justify-between">
        <NavigationElements navLinks={navLinks} showCta={false} />
      </div>
    </div>
  );
}
