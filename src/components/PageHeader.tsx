import React from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ 
  title, 
  description, 
  actions,
  className 
}: PageHeaderProps) {
  return (
    <div className={cn("animate-fade-in", className)}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        {/* Title section - always maintains the large size */}
        <div className="flex-shrink-1">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="mt-2 text-muted-foreground">{description}</p>
          )}
        </div>
        
        {/* Actions section - right aligned */}
        {actions && (
          <div className="flex flex-wrap gap-3 justify-end mt-0 ml-auto">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}