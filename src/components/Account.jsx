import React from "react";
import Button from "./ui/Button";

export default function Account({ user, onChangePassword, onLogout }) {
  return (
    <div className="px-4 pb-24 pt-16">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
            {user?.name?.[0] ?? 'U'}
          </div>
          <div>
            <div className="font-semibold">{user?.name ?? "Vendor Admin"}</div>
            <div className="text-sm text-slate-500">{user?.email ?? "admin@legend.example"}</div>
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <Button onClick={onChangePassword}>Change Password</Button>
          <Button variant="secondary" onClick={onLogout}>Logout</Button>
        </div>
      </div>
      <p className="text-xs text-slate-500 mt-3">App version 1.0.0</p>
    </div>
  );
}
