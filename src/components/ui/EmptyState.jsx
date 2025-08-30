import React from "react";
import Button from "./Button";

export default function EmptyState({ title="Nothing here yet", subtitle="", cta=null, icon=null }) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        {icon ?? <span className="text-xl">🗂️</span>}
      </div>
      <h3 className="text-slate-900 dark:text-slate-100 font-semibold">{title}</h3>
      {subtitle && <p className="text-slate-500 mt-1">{subtitle}</p>}
      {cta && <div className="mt-4">{cta}</div>}
    </div>
  );
}
