import React from "react";
import Button from "./Button";

export default function Modal({ open, title, children, onClose, actions }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full sm:max-w-lg bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl shadow-lg">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <div className="p-5">{children}</div>
        <div className="px-5 pb-5 pt-2 flex gap-3 justify-end">
          {actions ?? <Button variant="secondary" onClick={onClose}>Close</Button>}
        </div>
      </div>
    </div>
  );
}
