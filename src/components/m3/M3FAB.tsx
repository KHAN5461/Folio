import React from 'react';

export type M3FABVariant = 'primary' | 'secondary' | 'tertiary' | 'surface';

interface M3FABProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: M3FABVariant;
  size?: 'sm' | 'md' | 'lg';
  icon: React.ReactNode;
  label?: string; // If provided, renders as Extended FAB
}

export const M3FAB: React.FC<M3FABProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  label,
  className = '',
  ...props
}) => {
  const isExtended = Boolean(label);

  const sizeClasses = isExtended
    ? {
        sm: 'h-10 px-4 text-xs gap-2 rounded-2xl',
        md: 'h-13 px-5 text-xs gap-2.5 rounded-2xl',
        lg: 'h-16 px-6 text-sm gap-3 rounded-3xl',
      }[size]
    : {
        sm: 'w-10 h-10 rounded-xl',
        md: 'w-13 h-13 rounded-2xl',
        lg: 'w-16 h-16 rounded-3xl',
      }[size];

  const variantClasses = {
    primary:
      'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl hover:shadow-2xl border border-indigo-400/30',
    secondary:
      'bg-cyan-600 hover:bg-cyan-500 text-white shadow-xl hover:shadow-2xl border border-cyan-400/30',
    tertiary:
      'bg-amber-500 hover:bg-amber-400 text-black shadow-xl hover:shadow-2xl border border-amber-300',
    surface:
      'bg-white dark:bg-[#1b2332] text-slate-800 dark:text-slate-100 shadow-xl hover:shadow-2xl border border-slate-200 dark:border-slate-700',
  }[variant];

  return (
    <button
      className={`inline-flex items-center justify-center font-extrabold select-none transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      <span className="shrink-0">{icon}</span>
      {label && <span>{label}</span>}
    </button>
  );
};
