// src/components/SlidePanel.tsx
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

interface SlidePanelProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  width?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export function SlidePanel({
  open,
  onClose,
  title,
  description,
  children,
  className,
  width = "md",
}: SlidePanelProps) {
  const [isClient, setIsClient] = useState(false);

  // Use useEffect to set isClient to true once the component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Define width classes based on the width prop
  const widthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full",
  };

  // Only render the Sheet component on the client side
  if (!isClient) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        className={cn(
          "p-0 border-l bg-background",
          widthClasses[width],
          className
        )}
        side="right"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              {title && <h2 className="text-xl font-semibold">{title}</h2>}
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-4">{children}</div>
        </div>
      </SheetContent>
    </Sheet>
  );
}