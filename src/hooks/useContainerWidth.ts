"use client";

import { useState, useEffect, useRef, RefObject } from 'react';

export const useContainerWidth = (): [RefObject<HTMLDivElement>, number] => {
  // Here we explicitly type the ref as RefObject<HTMLDivElement>
  const containerRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    // Skip during SSR
    if (typeof window === 'undefined') return;
    
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth();

    // Use ResizeObserver only on client side
    const resizeObserver = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  return [containerRef, containerWidth];
};