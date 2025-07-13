
'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface StickySidebarProps {
  children: React.ReactNode;
  isFixed: boolean;
}

export default function StickySidebar({ children, isFixed }: StickySidebarProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={wrapperRef} className="relative w-full md:w-64 mb-12 md:mb-0 md:float-left transition-all duration-300">
      <div
        className={cn(
          'transition-all duration-300',
          isFixed ? 'md:fixed md:top-24' : 'relative'
        )}
      >
        {children}
      </div>
       {isFixed && (
        <div className="hidden md:block" style={{ height: wrapperRef.current?.offsetHeight }} />
      )}
    </div>
  );
}
