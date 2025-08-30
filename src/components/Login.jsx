import React, { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";

export default function Login({ onLogin, onForgot }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    // Static: accept any non-empty
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    onLogin?.({ email });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center">
      <div className="w-full max-w-md mx-auto px-6">
        <div className="text-center mb-6">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-lg font-bold">LD</div>
          <h1 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">Vendor Login</h1>
        </div>

        {error && <div className="mb-4 rounded-xl bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 px-4 py-2 text-sm">{error}</div>}

        <form onSubmit={submit} className="space-y-3">
          <Input label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" />
          <Input label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />
          <Button type="submit" className="w-full">Login</Button>
        </form>

        <div className="text-center mt-3">
          <button className="text-sm text-indigo-600 hover:underline" onClick={onForgot}>Forgot Password</button>
        </div>
      </div>
    </div>
  );
}
