import React from "react";
export default function Toast({ message, type='success', open }) {
  if (!open) return null;
  const color = type === 'error' ? 'bg-rose-600' : 'bg-emerald-600';
  return (
    <div className="fixed inset-x-0 bottom-[calc(var(--tabbar-h)+24px)] flex justify-center z-50">
      <div className={`${color} text-white px-4 py-2 rounded-xl shadow-lg`}>{message}</div>
    </div>
  );
}
