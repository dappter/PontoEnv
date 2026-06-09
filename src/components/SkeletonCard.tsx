import React from 'react';

interface Props {
  count?: number;
}

function SkeletonBlock({ className }: { className: string }) {
  return <div className={`skeleton rounded-xl ${className}`} />;
}

export default function SkeletonCard({ count = 3 }: Props) {
  return (
    <div className="px-4 space-y-3 mt-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 bg-white dark:bg-surface rounded-2xl px-4 py-3.5 border border-slate-100 dark:border-slate-700/50"
        >
          <SkeletonBlock className="w-10 h-10 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2">
            <SkeletonBlock className="h-3.5 w-3/4" />
            <SkeletonBlock className="h-2.5 w-1/2" />
          </div>
          <SkeletonBlock className="h-4 w-16 shrink-0" />
        </div>
      ))}
    </div>
  );
}
