import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 active:scale-[0.98] focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]',
      secondary: 'bg-purple-900/40 text-purple-100 hover:bg-purple-800/50 border border-purple-500/20',
      glass: 'bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-white/20',
      ghost: 'hover:bg-white/5 text-gray-300 hover:text-white',
    };

    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-6 text-base',
      lg: 'h-14 px-8 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
