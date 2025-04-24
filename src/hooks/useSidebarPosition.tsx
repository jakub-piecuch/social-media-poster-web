"use client";

import { useState, useEffect } from 'react';

type SidebarPosition = 'left' | 'top';

export function useSidebarPosition(
  breakpoint: number = 768,
  minHeight: number = 500
): SidebarPosition {
  const [position, setPosition] = useState<SidebarPosition>('left');

  useEffect(() => {
    // Skip during SSR
    if (typeof window === 'undefined') return;
    
    const updatePosition = () => {
      // For narrow screens that are tall enough, use top position
      // For very small screens (like phones in landscape), keep sidebar on left
      if (window.innerWidth < breakpoint && window.innerHeight > minHeight) {
        setPosition('top');
      } else {
        setPosition('left');
      }
    };

    // Set initial position
    updatePosition();

    // Update position when window is resized
    window.addEventListener('resize', updatePosition);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [breakpoint, minHeight]);

  return position;
}