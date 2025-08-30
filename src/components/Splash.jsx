import React from "react";
import Spinner from "./ui/Spinner";

export default function Splash() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">LD</div>
        <Spinner />
      </div>
    </div>
  );
}
