import React, { useState } from "react";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

const STATUSES = ["PENDING","SCHEDULED","COMPLETED","CANCELLED"];

export default function VouchersList({ vouchers=[], drivers=[], onCreate, onOpen, onExport }) {
  const [status, setStatus] = useState("");
  const [driverId, setDriverId] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const filtered = vouchers.filter(v => (!status || v.status===status) && (!driverId || v.driverId===driverId) && (!from || v.date>=from) && (!to || v.date<=to));

  return (
    <div className="px-4 pb-24 pt-16">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <label className="flex items-end gap-2">
            <span className="text-xs text-slate-500 block">From</span>
            <input type="date" className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2" value={from} onChange={e=>setFrom(e.target.value)} />
          </label>
          <label className="flex items-end gap-2">
            <span className="text-xs text-slate-500 block">To</span>
            <input type="date" className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2" value={to} onChange={e=>setTo(e.target.value)} />
          </label>
          <Select label="Driver" options={[{value:'',label:'All drivers'}, ...drivers.map(d=>({value:d.id,label:d.name}))]} value={driverId} onChange={e=>setDriverId(e.target.value)} />
          <Select label="Status" options={[{value:'',label:'All'}, ...STATUSES.map(s=>({value:s,label:s}))]} value={status} onChange={e=>setStatus(e.target.value)} />
        </div>
        <div className="mt-3 flex gap-3">
          <Button variant="secondary" onClick={()=>onExport?.('pdf')}>Export PDF</Button>
          <Button variant="secondary" onClick={()=>onExport?.('xlsx')}>Export Excel</Button>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {filtered.map(v => (
          <button key={v.id} onClick={()=>onOpen?.(v)} className="w-full text-left rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{v.clientName} — {v.packageName}</div>
              <div className="text-xs text-slate-500">{v.date} • {drivers.find(d=>d.id===v.driverId)?.name ?? 'Unassigned'}</div>
            </div>
            <Badge color={v.status==='COMPLETED'?'green':v.status==='PENDING'?'yellow':v.status==='CANCELLED'?'red':'blue'}>{v.status}</Badge>
          </button>
        ))}
      </div>

      <Button className="fixed right-4 bottom-20 rounded-full shadow-lg" onClick={onCreate}>+ Create Voucher</Button>
    </div>
  );
}
