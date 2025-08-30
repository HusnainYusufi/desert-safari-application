import React from "react";
export default function Select({ label, options=[], error='', className='', ...props }) {
  return (
    <label className={`block ${className}`}>
      {label && <span className="block mb-1 text-sm font-medium text-slate-700">{label}</span>}
      <select className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]" {...props}>
        {options.map(opt => <option key={opt.value ?? opt} value={opt.value ?? opt}>{opt.label ?? opt}</option>)}
      </select>
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </label>
  );
}
