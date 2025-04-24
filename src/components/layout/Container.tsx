import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Container: React.FC<ContainerProps> = ({ 
  className, 
  size = 'lg', 
  children,
  ...props 
}) => {
  return (
    <div
      className={cn(
        "w-full px-4 mx-auto",
        {
          'sm:max-w-xl': size === 'sm',
          'sm:max-w-3xl': size === 'md',
          'sm:max-w-5xl': size === 'lg',
          'sm:max-w-7xl': size === 'xl',
          'max-w-none': size === 'full',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};