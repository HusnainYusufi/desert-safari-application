import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./app-globals.css";

export default function Splash() {
  const [show, setShow] = useState(true);
  useEffect(()=>{ const t = setTimeout(()=>setShow(false), 1400); return ()=>clearTimeout(t); },[]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-50 grid place-items-center bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1.12, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.2,0.8,0.2,1] }}
            className="flex flex-col items-center gap-4"
          >
            <div className="h-20 w-20 rounded-3xl desert-primary flex items-center justify-center text-2xl font-bold">DS</div>
            <div className="text-[17px] font-semibold text-slate-900 tracking-wide">DESERT SAFARI</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
