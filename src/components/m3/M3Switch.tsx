import React from 'react';
import { Check } from 'lucide-react';

interface M3SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const M3Switch: React.FC<M3SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
}) => {
  return (
    <label
      className={`inline-flex items-center gap-3 select-none cursor-pointer ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`w-13 h-7 rounded-full p-1 transition-all duration-200 flex items-center relative focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
          checked
            ? 'bg-indigo-600'
            : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
        }`}
      >
        <div
          className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 flex items-center justify-center ${
            checked ? 'translate-x-6' : 'translate-x-0'
          }`}
        >
          {checked && <Check className="w-3 h-3 text-indigo-600 stroke-[3]" />}
        </div>
      </button>

      {label && (
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {label}
        </span>
      )}
    </label>
  );
};

interface M3CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const M3Checkbox: React.FC<M3CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
}) => {
  return (
    <label
      className={`inline-flex items-center gap-2 select-none cursor-pointer ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`w-5 h-5 rounded-lg border-2 transition-all duration-150 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
          checked
            ? 'bg-indigo-600 border-indigo-600 text-white'
            : 'border-slate-400 dark:border-slate-600 hover:border-indigo-500'
        }`}
      >
        {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
      </button>

      {label && (
        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
          {label}
        </span>
      )}
    </label>
  );
};
