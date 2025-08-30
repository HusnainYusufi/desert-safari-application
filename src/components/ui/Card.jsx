import React from "react";

export function Card({ className='', children }) {
  return <div className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm ${className}`}>{children}</div>;
}
export function CardHeader({ className='', children }) {
  return <div className={`px-5 pt-5 ${className}`}>{children}</div>;
}
export function CardContent({ className='', children }) {
  return <div className={`px-5 pb-5 ${className}`}>{children}</div>;
}
export function CardTitle({ className='', children }) {
  return <h3 className={`text-base font-semibold text-slate-900 dark:text-slate-100 ${className}`}>{children}</h3>;
}
