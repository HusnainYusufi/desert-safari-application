import React from "react";
import Button from "./ui/Button";

export function NetworkError({ onRetry }) {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center">
        <div className="text-6xl">⚠️</div>
        <h1 className="mt-2 text-xl font-semibold">Something went wrong</h1>
        <Button className="mt-4" onClick={onRetry}>Try Again</Button>
      </div>
    </div>
  );
}

export function SessionExpired({ onRelogin }) {
  return (
    <div className="fixed inset-0 bg-black/50 grid place-items-center">
      <div className="bg-white rounded-2xl p-6 max-w-sm text-center">
        <h2 className="font-semibold text-lg">Session expired</h2>
        <p className="text-slate-500 mt-1">Please log in again to continue.</p>
        <Button className="mt-4" onClick={onRelogin}>Log In</Button>
      </div>
    </div>
  );
}

export function PermissionsExplainer({ title="Camera Permission", onOk }) {
  return (
    <div className="px-4 py-6">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="text-slate-600 mt-2">We need access to your camera to scan voucher QR codes. We never store raw camera data.</p>
      <Button className="mt-3" onClick={onOk}>OK</Button>
    </div>
  );
}
