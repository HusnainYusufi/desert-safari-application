import React from "react";
import Button from "./ui/Button";

export default function CalendarSummary({ drivers=[], onOpenFor }) {
  const [date, setDate] = React.useState(() => new Date().toISOString().slice(0,10));
  const data = drivers.map(d => ({...d, count: Math.floor(Math.random()*5)}));
  return (
    <div className="px-4 safe-b pt-16">
      <div className="flex items-center gap-3">
        <input type="date" className="rounded-2xl border border-slate-300 bg-white px-3 py-2" value={date} onChange={e=>setDate(e.target.value)} />
      </div>
      <div className="mt-3 space-y-2">
        {data.map(d => (
          <div key={d.id} className="card p-4 flex items-center justify-between">
            <div className="font-medium">{d.name}</div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">{d.count} bookings</span>
              <Button variant="outline" onClick={()=>onOpenFor?.(d, date)}>Open</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
