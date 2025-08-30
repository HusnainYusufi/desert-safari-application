import React, { useState } from "react";
import Select from "./ui/Select";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

export default function PaymentsList({ payments=[], onCreate, onOpen, onExport }) {
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const filtered = payments.filter(p => (!status || p.status===status) && (!type || p.type===type) && (!from || p.created>=from) && (!to || p.created<=to));

  return (
    <div className="px-4 pb-24 pt-16">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Select label="Status" options={[{value:'',label:'All'},{value:'PENDING',label:'Pending'},{value:'CONFIRMED',label:'Confirmed'}]} value={status} onChange={e=>setStatus(e.target.value)} />
          <Select label="Type" options={[{value:'',label:'All'},{value:'BANK',label:'Bank'},{value:'CASH',label:'Cash'},{value:'WALLET',label:'Wallet'}]} value={type} onChange={e=>setType(e.target.value)} />
          <label className="flex items-end gap-2">
            <span className="text-xs text-slate-500 block">From</span>
            <input type="date" className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2" value={from} onChange={e=>setFrom(e.target.value)} />
          </label>
          <label className="flex items-end gap-2">
            <span className="text-xs text-slate-500 block">To</span>
            <input type="date" className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2" value={to} onChange={e=>setTo(e.target.value)} />
          </label>
        </div>
        <div className="mt-3 flex gap-3">
          <Button variant="secondary" onClick={()=>onExport?.('xlsx')}>Export Excel</Button>
          <Button variant="secondary" onClick={()=>onExport?.('pdf')}>Statement PDF</Button>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {filtered.map(p => (
          <button key={p.id} onClick={()=>onOpen?.(p)} className="w-full text-left rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{p.type} — AED {p.amount}</div>
              <div className="text-xs text-slate-500">{p.created}</div>
            </div>
            <Badge color={p.status==='CONFIRMED'?'green':'yellow'}>{p.status}</Badge>
          </button>
        ))}
      </div>

      <Button className="fixed right-4 bottom-20 rounded-full shadow-lg" onClick={onCreate}>+ Submit Payment</Button>
    </div>
  );
}
