import React from 'react';

interface M3LinearProgressProps {
  value?: number; // 0 to 100, or undefined for indeterminate
  className?: string;
}

export const M3LinearProgress: React.FC<M3LinearProgressProps> = ({
  value,
  className = '',
}) => {
  const isIndeterminate = value === undefined;

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`w-full h-1.5 rounded-full overflow-hidden bg-indigo-500/20 relative ${className}`}
    >
      {isIndeterminate ? (
        <div className="h-full bg-indigo-600 rounded-full animate-pulse w-2/3" />
      ) : (
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      )}
    </div>
  );
};

interface M3CircularProgressProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const M3CircularProgress: React.FC<M3CircularProgressProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-3',
    lg: 'w-8 h-8 border-4',
  }[size];

  return (
    <div
      role="progressbar"
      className={`rounded-full border-indigo-600 border-t-transparent animate-spin ${sizeMap} ${className}`}
    />
  );
};

interface M3BadgeProps {
  content?: string | number;
  variant?: 'dot' | 'standard';
  className?: string;
}

export const M3Badge: React.FC<M3BadgeProps> = ({
  content,
  variant = 'standard',
  className = '',
}) => {
  if (variant === 'dot') {
    return (
      <span
        className={`w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 inline-block ${className}`}
      />
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-indigo-600 text-white min-w-4 text-center leading-none ${className}`}
    >
      {content}
    </span>
  );
};
