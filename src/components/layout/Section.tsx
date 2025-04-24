import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  containerClassName?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  heading?: string;
  subheading?: string;
}

export const Section: React.FC<SectionProps> = ({ 
  className,
  containerClassName,
  containerSize = 'lg',
  heading,
  subheading,
  children,
  ...props 
}) => {
  return (
    <section 
      className={cn("py-12 md:py-16", className)}
      {...props}
    >
      <Container size={containerSize} className={containerClassName}>
        {(heading || subheading) && (
          <div className="mb-10 text-center">
            {heading && <h2 className="text-3xl font-bold mb-4">{heading}</h2>}
            {subheading && <p className="text-lg text-muted-foreground">{subheading}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
};