import React, { useState } from "react";
import Button from "./ui/Button";
import Toast from "./ui/Toast";

export default function Scan() {
  const [flash, setFlash] = useState(false);
  const [toast, setToast] = useState({open:false, message:'', type:'success'});

  const onScan = () => {
    setToast({open:true, message:'Marked Completed', type:'success'});
    setTimeout(()=>setToast({open:false}), 2000);
  };

  return (
    <div className="px-4 safe-b pt-16">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-black h-72 grid place-items-center text-white relative overflow-hidden">
        <div className="absolute inset-10 border-2 border-white/60 rounded-xl"></div>
        <span className="opacity-70">Camera Preview</span>
      </div>
      <div className="flex gap-3 mt-3">
        <Button onClick={()=>setFlash(f=>!f)}>{flash?'Flashlight: On':'Flashlight: Off'}</Button>
        <Button variant="secondary" onClick={onScan}>Simulate Scan</Button>
      </div>
      <Toast open={toast.open} message={toast.message} type={toast.type} />
    </div>
  );
}
