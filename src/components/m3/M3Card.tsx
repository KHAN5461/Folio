import React from 'react';

export type M3CardVariant = 'elevated' | 'filled' | 'outlined';

interface M3CardProps {
  variant?: M3CardVariant;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const M3Card: React.FC<M3CardProps> = ({
  variant = 'filled',
  children,
  className = '',
  onClick,
}) => {
  const isClickable = Boolean(onClick);

  const variantClasses = {
    elevated:
      'bg-white dark:bg-[#111726] border border-slate-200/80 dark:border-slate-800/70 shadow-xs hover:shadow-sm',
    filled:
      'bg-slate-50/80 dark:bg-[#0d121e] border border-slate-200/60 dark:border-slate-800/50',
    outlined:
      'bg-transparent border border-slate-300/80 dark:border-slate-700/60',
  }[variant];

  return (
    <div
      onClick={onClick}
      className={`rounded-3xl p-5 md:p-6 transition-all duration-200 ${variantClasses} ${
        isClickable ? 'cursor-pointer active:scale-[0.99]' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
