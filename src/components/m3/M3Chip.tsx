import React from 'react';
import { X, Check } from 'lucide-react';

export type M3ChipVariant = 'assist' | 'filter' | 'input' | 'suggestion';

interface M3ChipProps {
  variant?: M3ChipVariant;
  label: string;
  icon?: React.ReactNode;
  selected?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  className?: string;
}

export const M3Chip: React.FC<M3ChipProps> = ({
  variant = 'assist',
  label,
  icon,
  selected = false,
  onRemove,
  onClick,
  className = '',
}) => {
  const isClickable = Boolean(onClick);

  return (
    <span
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium font-mono select-none transition-all duration-200 border ${
        selected
          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
          : variant === 'input'
          ? 'bg-slate-100 dark:bg-[#182133] border-slate-250 dark:border-slate-700 text-slate-800 dark:text-slate-200'
          : variant === 'filter'
          ? 'bg-slate-100 dark:bg-[#141b27] border-slate-250 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
          : variant === 'suggestion'
          ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
          : 'bg-slate-100 dark:bg-[#161d2b] border-slate-250 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
      } ${isClickable ? 'cursor-pointer active:scale-95' : ''} ${className}`}
    >
      {selected ? (
        <Check className="w-3 h-3 text-white shrink-0" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}

      <span>{label}</span>

      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 -mr-1 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
          title="Remove"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};
