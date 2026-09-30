import React from 'react';

export type M3ButtonVariant = 'filled' | 'elevated' | 'tonal' | 'outlined' | 'text';

interface M3ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: M3ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconTrailing?: React.ReactNode;
  children: React.ReactNode;
}

export const M3Button: React.FC<M3ButtonProps> = ({
  variant = 'filled',
  size = 'md',
  icon,
  iconTrailing,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'h-8 px-3.5 text-xs gap-1.5',
    md: 'h-10 px-5 text-xs gap-2',
    lg: 'h-12 px-6 text-sm gap-2.5',
  }[size];

  const variantClasses = {
    filled:
      'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm hover:shadow-md active:scale-95 disabled:bg-slate-400 disabled:shadow-none',
    elevated:
      'bg-white dark:bg-[#1b2332] text-indigo-600 dark:text-indigo-400 shadow-md hover:shadow-lg border border-slate-200/80 dark:border-slate-700/60 active:scale-95',
    tonal:
      'bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-700 dark:text-indigo-300 active:scale-95 disabled:opacity-50',
    outlined:
      'border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 active:scale-95',
    text:
      'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10 active:scale-95',
  }[variant];

  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center font-bold rounded-full select-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer disabled:cursor-not-allowed ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {iconTrailing && <span className="shrink-0">{iconTrailing}</span>}
    </button>
  );
};
