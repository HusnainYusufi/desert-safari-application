import React from "react";
export default function Badge({ children, color='slate', className='' }) {
  const map = {
    slate: "bg-slate-100 text-slate-700",
    green: "bg-emerald-100 text-emerald-700",
    yellow: "bg-amber-100 text-amber-700",
    red: "bg-rose-100 text-rose-700",
    blue: "bg-[color:var(--brand-50)] text-[color:var(--brand-700)]",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${map[color] ?? map.slate} ${className}`}>{children}</span>;
}
