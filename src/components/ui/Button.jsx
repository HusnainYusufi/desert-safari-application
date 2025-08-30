import React from "react";

export default function Button({ as='button', className='', children, variant='primary', size='lg', disabled=false, ...props }) {
  const Comp = as;
  const base = "inline-flex items-center justify-center rounded-2xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
    xl: "px-6 py-3.5 text-base"
  };
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-500",
    secondary: "border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700",
    danger: "bg-rose-600 text-white hover:bg-rose-500 focus:ring-rose-500",
    ghost: "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800",
    outline: "border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800"
  };
  return <Comp disabled={disabled} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>{children}</Comp>;
}
