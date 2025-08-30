import React, { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";

export default function ResetPassword({ onReset, onCancel }) {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const min = 8;
  const match = p1 === p2;
  const valid = p1.length >= min && match;

  const submit = (e) => {
    e.preventDefault();
    if (valid) onReset?.();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center">
      <div className="w-full max-w-md mx-auto px-6">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Reset Password</h1>
        <form onSubmit={submit} className="space-y-3">
          <Input label="New password" type="password" value={p1} onChange={e=>setP1(e.target.value)} hint={`Minimum ${min} characters`} error={p1 && p1.length<min ? `Must be at least ${min} characters` : ""} />
          <Input label="Confirm password" type="password" value={p2} onChange={e=>setP2(e.target.value)} error={p2 && !match ? "Passwords must match" : ""} />
          <div className="flex gap-3">
            <Button type="submit" disabled={!valid} className="flex-1">Reset Password</Button>
            <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
