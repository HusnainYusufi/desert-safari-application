import React from "react";
import Spinner from "./ui/Spinner";
import "./splash.css";

export default function Splash() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4 splash-screen">
        <div className="h-20 w-20 rounded-3xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold logo-pop">
          DS
        </div>
        <div className="text-slate-900 font-semibold text-lg logo-pop">Desert Safari</div>
        <Spinner />
      </div>
    </div>
  );
}
