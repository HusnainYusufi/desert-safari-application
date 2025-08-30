import React from "react";
import Button from "./ui/Button";
import Toast from "./ui/Toast";

export default function Scan() {
  const [flash, setFlash] = React.useState(false);
  const [toast, setToast] = React.useState({open:false, message:'', type:'success'});

  const onScan = () => { setToast({open:true, message:'Marked Completed', type:'success'}); setTimeout(()=>setToast({open:false}), 2000); };

  return (
    <div className="px-4 safe-b pt-16">
      <div className="card p-0 bg-black h-72 grid place-items-center text-white relative overflow-hidden">
        <div className="absolute inset-10 border-2 border-white/60 rounded-xl"></div>
        <span className="opacity-70">Camera Preview</span>
      </div>
      <div className="flex gap-3 mt-3">
        <Button onClick={()=>setFlash(f=>!f)}>{flash?'Flashlight: On':'Flashlight: Off'}</Button>
        <Button variant="outline" onClick={onScan}>Simulate Scan</Button>
      </div>
      <Toast open={toast.open} message={toast.message} type={toast.type} />
    </div>
  );
}
