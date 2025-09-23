"use client";

import { cn } from "@/lib/utils";

interface SegmentedControlProps {
  options: { value: string; label: string }[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function SegmentedControl({ 
  options, 
  value, 
  onValueChange, 
  className 
}: SegmentedControlProps) {
  return (
    <div className={cn(
      "inline-flex items-center rounded-lg border border-gray-200 bg-gray-50 p-1",
      className
    )}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onValueChange(option.value)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
            value === option.value
              ? "bg-white text-gray-900 shadow-sm border border-gray-200"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
