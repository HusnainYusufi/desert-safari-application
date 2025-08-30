import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/Card";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

function Sparkline({ data=[8,12,10,14,13,18,20], width=120, height=40 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data.map((v,i)=>{
    const x = (i/(data.length-1))*width;
    const y = height - ((v-min)/(max-min||1))*height;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={width} height={height} className="opacity-80">
      <polyline fill="none" stroke="currentColor" strokeWidth="2" points={points} />
    </svg>
  );
}

function MiniCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const start = new Date(year, month, 1);
  const end = new Date(year, month+1, 0);
  const days = [];
  const pad = start.getDay(); // 0=Sun
  for (let i=0; i<pad; i++) days.push(null);
  for (let d=1; d<=end.getDate(); d++) days.push(d);
  while (days.length % 7) days.push(null);

  return (
    <div className="grid grid-cols-7 gap-1 text-xs">
      {['S','M','T','W','T','F','S'].map((d,i)=>(<div key={i} className="text-center text-slate-500">{d}</div>))}
      {days.map((d,i)=>{
        const isToday = d===now.getDate();
        return (
          <div key={i} className={`aspect-[1/1] grid place-items-center rounded ${isToday?'bg-indigo-600 text-white':'bg-slate-50'}`}>
            {d ?? ""}
          </div>
        );
      })}
    </div>
  );
}

export default function HomeDashboard({ onQuickLink, upcoming=[] }) {
  const cards = [
    { title:"Today’s bookings", value: 24, delta:"+12%" },
    { title:"Completed", value: 18, delta:"+5%" },
    { title:"Pending", value: 6, delta:"-8%" },
  ];

  const quick = [
    { key:"voucher-create", label:"Create Voucher" },
    { key:"scan", label:"Scan" },
    { key:"calendar", label:"Calendar" },
  ];

  return (
    <div className="px-4 safe-b pt-16">
      <div className="grid grid-cols-3 gap-3">
        {cards.map((c,idx) => (
          <Card key={c.title} className="text-center">
            <CardHeader>
              <CardTitle>{c.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{c.value}</div>
              <div className={`text-xs ${c.delta.startsWith('-')?'text-rose-600':'text-emerald-600'}`}>{c.delta} vs last week</div>
              <div className="mt-2 text-indigo-600/70"><Sparkline data={[8+idx,12,10,14,13,18,20-idx]} /></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Upcoming Vouchers</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {(upcoming.length ? upcoming : [
                { id:"VCH-101", client:"John Smith", date:"2025-09-01", status:"SCHEDULED" },
                { id:"VCH-102", client:"Alice Doe", date:"2025-09-02", status:"SCHEDULED" },
              ]).map(v => (
                <div key={v.id} className="rounded-xl border border-slate-200 bg-white p-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{v.client}</div>
                    <div className="text-xs text-slate-500">{v.date}</div>
                  </div>
                  <Badge color="blue">{v.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Calendar</CardTitle></CardHeader>
          <CardContent><MiniCalendar /></CardContent>
        </Card>
      </div>

      <div className="mt-5">
        <h2 className="text-sm font-medium text-slate-700 mb-2">Quick links</h2>
        <div className="flex flex-wrap gap-3">
          {quick.map(q => (
            <Button key={q.key} onClick={()=>onQuickLink?.(q.key)}>{q.label}</Button>
          ))}
        </div>
      </div>
    </div>
  );
}
