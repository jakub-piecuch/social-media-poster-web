"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ExpandableTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minRows?: number;
  maxRows?: number;
}

export const ExpandableTextarea = React.forwardRef<
  HTMLTextAreaElement,
  ExpandableTextareaProps
>(({ className, minRows = 2, maxRows = 10, onChange, ...props }, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState(props.value || "");
  
  // Function to adjust height based on content
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    // Reset height temporarily to get the correct scrollHeight
    textarea.style.height = "auto";
    
    // Calculate the height based on scrollHeight
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 20;
    const minHeight = lineHeight * minRows;
    const maxHeight = lineHeight * maxRows;
    
    // Calculate new height using scrollHeight (content size)
    const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
    textarea.style.height = `${newHeight}px`;
    
    // Add overflow if content exceeds max height
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  };
  
  // Handle value changes
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };
  
  // Adjust height on value changes
  useEffect(() => {
    adjustHeight();
  }, [value]);
  
  // Adjust height on window resize
  useEffect(() => {
    window.addEventListener("resize", adjustHeight);
    return () => window.removeEventListener("resize", adjustHeight);
  }, []);
  
  // Initial resize after the component mounts
  useEffect(() => {
    adjustHeight();
  }, []);
  
  // Merge refs
  const setRefs = (element: HTMLTextAreaElement) => {
    textareaRef.current = element;
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      ref.current = element;
    }
  };
  
  return (
    <textarea
      ref={setRefs}
      value={value}
      onChange={handleChange}
      className={cn(
        "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none overflow-hidden transition-all duration-100",
        className
      )}
      {...props}
    />
  );
});

ExpandableTextarea.displayName = "ExpandableTextarea";