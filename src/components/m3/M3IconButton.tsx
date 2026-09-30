import React from 'react';

export type M3IconButtonVariant = 'standard' | 'filled' | 'tonal' | 'outlined';

interface M3IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: M3IconButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  selected?: boolean;
}

export const M3IconButton: React.FC<M3IconButtonProps> = ({
  variant = 'standard',
  size = 'md',
  children,
  selected = false,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  }[size];

  const variantClasses = {
    standard: selected
      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10'
      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800',
    filled:
      'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs',
    tonal:
      'bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-700 dark:text-indigo-300',
    outlined:
      'border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200',
  }[variant];

  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-full select-none transition-all duration-200 active:scale-90 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
