import React, { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";

export default function ForgotPassword({ onBack, onSent }) {
  const [email, setEmail] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSent?.(email);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center">
      <div className="w-full max-w-md mx-auto px-6">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Forgot Password</h1>
        <form onSubmit={submit} className="space-y-4">
          <Input label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" />
          <div className="flex gap-3">
            <Button type="submit" className="flex-1">Send Reset Link</Button>
            <Button variant="secondary" type="button" className="flex-1" onClick={onBack}>Back</Button>
          </div>
        </form>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">If your email exists, a reset link was sent.</p>
      </div>
    </div>
  );
}
