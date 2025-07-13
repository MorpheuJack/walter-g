
'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface StickySidebarProps {
  children: React.ReactNode;
}

export default function StickySidebar({ children }: StickySidebarProps) {
  const [isFixed, setIsFixed] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (wrapperRef.current) {
        const wrapperTop = wrapperRef.current.getBoundingClientRect().top;
        // Adjust the offset value based on your header's height or desired trigger point
        const offset = 100; 
        if (window.scrollY > wrapperRef.current.offsetTop - offset) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full md:w-1/4 mb-12 md:mb-0 float-left -ml-8 mr-8">
      <div
        className={cn(
          'transition-all duration-300',
          isFixed ? 'fixed top-24' : 'relative'
        )}
      >
        {children}
      </div>
       {isFixed && (
        <div style={{ height: wrapperRef.current?.offsetHeight }} />
      )}
    </div>
  );
}

    