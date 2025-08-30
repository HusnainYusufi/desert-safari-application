import React from "react";
import Select from "./ui/Select";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

const STATUSES = ["PENDING","SCHEDULED","COMPLETED","CANCELLED"];

export default function VouchersList({ vouchers=[], drivers=[], onCreate, onOpen, onExport }) {
  const [status, setStatus] = React.useState("");
  const [driverId, setDriverId] = React.useState("");
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");

  const filtered = vouchers.filter(v => (!status || v.status===status) && (!driverId || v.driverId===driverId) && (!from || v.date>=from) && (!to || v.date<=to));

  return (
    <div className="px-4 safe-b pt-16">
      <div className="card p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <label className="flex items-end gap-2">
            <span className="text-xs text-slate-500 block">From</span>
            <input type="date" className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2" value={from} onChange={e=>setFrom(e.target.value)} />
          </label>
          <label className="flex items-end gap-2">
            <span className="text-xs text-slate-500 block">To</span>
            <input type="date" className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2" value={to} onChange={e=>setTo(e.target.value)} />
          </label>
          <Select label="Driver" options={[{value:'',label:'All drivers'}, ...drivers.map(d=>({value:d.id,label:d.name}))]} value={driverId} onChange={e=>setDriverId(e.target.value)} />
          <Select label="Status" options={[{value:'',label:'All'}, ...STATUSES.map(s=>({value:s,label:s}))]} value={status} onChange={e=>setStatus(e.target.value)} />
        </div>
        <div className="mt-3 flex gap-3">
          <Button variant="outline" onClick={()=>onExport?.('pdf')}>Export PDF</Button>
          <Button variant="outline" onClick={()=>onExport?.('xlsx')}>Export Excel</Button>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {filtered.map(v => (
          <button key={v.id} onClick={()=>onOpen?.(v)} className="w-full text-left card p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{v.clientName} — {v.packageName}</div>
              <div className="text-xs text-slate-500">{v.date} • {drivers.find(d=>d.id===v.driverId)?.name ?? 'Unassigned'}</div>
            </div>
            <Badge color={v.status==='COMPLETED'?'green':v.status==='PENDING'?'yellow':v.status==='CANCELLED'?'red':'blue'}>{v.status}</Badge>
          </button>
        ))}
      </div>

      <Button className="fixed right-4 bottom-[calc(var(--tabbar-h)+20px)] rounded-full shadow-lg" onClick={onCreate}>+ Create Voucher</Button>
    </div>
  );
}
