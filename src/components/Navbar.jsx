import React from "react";

export default function Navbar({ title='LEGEND DELIVERY', right=null }) {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      <div className="h-14 flex items-center justify-between px-4">
        <div className="font-semibold tracking-wide">{title}</div>
        <div>{right}</div>
      </div>
    </header>
  );
}
