import React from "react";
import Button from "./ui/Button";

export default function Account({ user, onChangePassword, onLogout }) {
  return (
    <div className="px-4 safe-b pt-16">
      <div className="card p-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full desert-primary text-white flex items-center justify-center font-bold">{user?.name?.[0] ?? 'U'}</div>
          <div>
            <div className="font-semibold">{user?.name ?? "Vendor Admin"}</div>
            <div className="text-sm text-slate-500">{user?.email ?? "admin@legend.example"}</div>
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <Button onClick={onChangePassword}>Change Password</Button>
          <Button variant="outline" onClick={onLogout}>Logout</Button>
        </div>
      </div>
      <p className="text-xs text-slate-500 mt-3">App version 1.0.0</p>
    </div>
  );
}
