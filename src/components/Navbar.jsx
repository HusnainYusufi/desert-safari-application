import React from "react";

export default function Navbar({ title='DESERT SAFARI', right=null }) {
  return (
    <header
      className="fixed top-0 inset-x-0 z-40 desert-header"
      style={{ paddingTop: "var(--safe-top)", height: "calc(56px + var(--safe-top))" }}
    >
      <div className="h-14 flex items-center justify-between px-4">
        <div className="font-semibold tracking-wide text-[15px] text-slate-900">{title}</div>
        <div>{right}</div>
      </div>
    </header>
  );
}
