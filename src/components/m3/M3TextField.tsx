import React, { useState } from 'react';

export type M3TextFieldVariant = 'outlined' | 'filled';

interface M3TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  variant?: M3TextFieldVariant;
  className?: string;
}

export const M3TextField: React.FC<M3TextFieldProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  helperText,
  errorText,
  leadingIcon,
  trailingIcon,
  multiline = false,
  rows = 3,
  disabled = false,
  variant = 'outlined',
  className = '',
}) => {
  const [focused, setFocused] = useState(false);
  const hasValue = Boolean(value && value.length > 0);
  const isFloating = focused || hasValue || Boolean(placeholder);
  const hasError = Boolean(errorText);

  return (
    <div className={`relative w-full text-xs font-sans ${className}`}>
      <div
        className={`relative rounded-2xl transition-all duration-200 ${
          variant === 'outlined'
            ? `border ${
                hasError
                  ? 'border-red-500/80 ring-2 ring-red-500/20'
                  : focused
                  ? 'border-indigo-500 ring-2 ring-indigo-500/25 bg-white dark:bg-[#0c101a]'
                  : 'border-slate-300/80 dark:border-slate-700/60 hover:border-slate-400 dark:hover:border-slate-600 bg-slate-50/70 dark:bg-[#0f1422]'
              }`
            : `bg-slate-100/90 dark:bg-[#121824] border-b-2 ${
                hasError
                  ? 'border-red-500'
                  : focused
                  ? 'border-indigo-500 ring-1 ring-indigo-500/20'
                  : 'border-slate-300 dark:border-slate-700/80'
              }`
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {/* Floating Label */}
        <label
          className={`absolute left-3.5 transition-all duration-150 pointer-events-none ${
            isFloating
              ? `-top-2.5 px-1.5 text-[10px] font-bold uppercase tracking-wider ${
                  hasError
                    ? 'text-red-500'
                    : focused
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-500 dark:text-slate-400'
                } bg-white dark:bg-[#0e1320] rounded-md shadow-2xs`
              : 'top-3 text-xs text-slate-400 dark:text-slate-500'
          }`}
        >
          {label}
        </label>

        {/* Input / Textarea with Subtle Tinted Surface */}
        <div className="flex items-center px-3.5">
          {leadingIcon && (
            <span className="mr-2 text-slate-400 shrink-0">{leadingIcon}</span>
          )}

          {multiline ? (
            <textarea
              rows={rows}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              disabled={disabled}
              placeholder={focused ? placeholder : undefined}
              className="w-full pt-3 pb-2.5 bg-transparent text-slate-800 dark:text-slate-100 text-xs sm:text-sm leading-relaxed focus:outline-none resize-none font-medium placeholder-slate-400/80 dark:placeholder-slate-500"
            />
          ) : (
            <input
              type={type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              disabled={disabled}
              placeholder={focused ? placeholder : undefined}
              className="w-full h-11 bg-transparent text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-medium focus:outline-none placeholder-slate-400/80 dark:placeholder-slate-500"
            />
          )}

          {trailingIcon && (
            <span className="ml-2 text-slate-400 shrink-0">{trailingIcon}</span>
          )}
        </div>
      </div>

      {/* Helper / Error Feedback Text */}
      {(errorText || helperText) && (
        <div className="mt-1 px-2 flex items-center justify-between text-[11px]">
          <span
            className={
              hasError
                ? 'text-red-500 dark:text-red-400 font-medium'
                : 'text-slate-400 dark:text-slate-500'
            }
          >
            {errorText || helperText}
          </span>
        </div>
      )}
    </div>
  );
};
