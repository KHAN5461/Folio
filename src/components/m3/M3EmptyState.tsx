import React from 'react';
import { M3Button } from './M3Button';
import {
  EmptySearchIllustration,
  NoProjectsIllustration,
  JsonErrorIllustration,
  GitSyncIllustration,
} from '../illustrations';

export type EmptyStateType =
  | 'no-search-results'
  | 'no-projects'
  | 'no-experience'
  | 'json-syntax-error'
  | 'import-failed'
  | 'empty-skills';

interface M3EmptyStateProps {
  type?: EmptyStateType;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export const M3EmptyState: React.FC<M3EmptyStateProps> = ({
  type = 'no-search-results',
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className = '',
}) => {
  return (
    <div
      className={`p-8 md:p-12 rounded-3xl border border-dashed text-center flex flex-col items-center justify-center transition-all ${className} bg-slate-50/60 dark:bg-[#0f1422]/60 border-slate-300 dark:border-slate-800`}
    >
      {/* Decorative Vector Illustration */}
      <div className="mb-4">
        {type === 'no-search-results' && <EmptySearchIllustration className="w-28 h-28" />}
        {type === 'no-projects' && <NoProjectsIllustration className="w-28 h-28" />}
        {type === 'no-experience' && <NoProjectsIllustration className="w-28 h-28" />}
        {type === 'json-syntax-error' && <JsonErrorIllustration className="w-28 h-28" />}
        {type === 'import-failed' && <GitSyncIllustration className="w-28 h-28" />}
        {type === 'empty-skills' && <EmptySearchIllustration className="w-28 h-28" />}
      </div>

      {/* Typography */}
      <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight mb-2">
        {title}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed mb-6 font-medium">
        {description}
      </p>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {actionLabel && onAction && (
          <M3Button
            variant="filled"
            size="sm"
            onClick={onAction}
            className="shadow-sm"
          >
            {actionLabel}
          </M3Button>
        )}

        {secondaryActionLabel && onSecondaryAction && (
          <M3Button
            variant="outlined"
            size="sm"
            onClick={onSecondaryAction}
          >
            {secondaryActionLabel}
          </M3Button>
        )}
      </div>
    </div>
  );
};
