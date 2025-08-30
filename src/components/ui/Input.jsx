import React from "react";
export default function Input({ label, type='text', error='', hint='', className='', ...props }) {
  return (
    <label className={`block ${className}`}>
      {label && <span className="block mb-1 text-sm font-medium text-slate-700">{label}</span>}
      <input type={type} className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]" {...props} />
      {hint && !error && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </label>
  );
}
