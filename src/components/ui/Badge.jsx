import React from "react";

export default function Badge({ children, color='slate', className='' }) {
  const map = {
    slate: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-800/40 dark:text-emerald-300",
    yellow: "bg-amber-100 text-amber-700 dark:bg-amber-800/40 dark:text-amber-300",
    red: "bg-rose-100 text-rose-700 dark:bg-rose-800/40 dark:text-rose-300",
    blue: "bg-indigo-100 text-indigo-700 dark:bg-indigo-800/40 dark:text-indigo-300",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${map[color] ?? map.slate} ${className}`}>{children}</span>;
}
