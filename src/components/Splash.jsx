import React from "react";
import "./app-globals.css";
export default function Splash() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3 splash-screen">
        <div className="h-20 w-20 rounded-3xl desert-primary flex items-center justify-center text-2xl font-bold logo-pop">DS</div>
        <div className="text-[17px] font-semibold text-slate-900 logo-pop tracking-wide">DESERT SAFARI</div>
      </div>
    </div>
  );
}
