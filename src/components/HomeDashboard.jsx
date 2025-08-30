import React from "react";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const data = [
  { d:"Mon", bookings: 8, completed:5 },
  { d:"Tue", bookings: 12, completed:7 },
  { d:"Wed", bookings: 10, completed:9 },
  { d:"Thu", bookings: 14, completed:12 },
  { d:"Fri", bookings: 13, completed:10 },
  { d:"Sat", bookings: 18, completed:15 },
  { d:"Sun", bookings: 20, completed:17 },
];

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
    <div className="px-4 pt-16 safe-b">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {cards.map((c) => (
          <div key={c.title} className="card p-4 text-center">
            <div className="text-sm text-slate-600">{c.title}</div>
            <div className="text-2xl font-bold mt-1">{c.value}</div>
            <div className={`text-xs mt-0.5 ${c.delta.startsWith('-')?'text-rose-600':'text-emerald-600'}`}>{c.delta} vs last week</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="card p-3 mt-4">
        <div className="flex items-center justify-between px-1">
          <div className="text-sm font-medium text-slate-800">Weekly Bookings</div>
        </div>
        <div style={{height: 180}} className="mt-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--brand)" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="var(--brand)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f6" />
              <XAxis dataKey="d" tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip />
              <Area type="monotone" dataKey="bookings" stroke="var(--brand)" fill="url(#g1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming + Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
        <div className="card p-4">
          <div className="text-sm font-medium text-slate-800">Upcoming Vouchers</div>
          <div className="space-y-2 mt-2">
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
        </div>
        <div className="card p-2">
          <DayPicker
            mode="single"
            defaultMonth={new Date()}
            className="rdp-desert"
            styles={{
              caption: { color: 'var(--ink)' },
              head_cell: { color: 'var(--ink-2)', fontWeight: 600 },
              day: { color: 'var(--ink)' },
              day_selected: { background: 'var(--brand)', color: '#fff' },
              day_today: { borderColor: 'var(--brand-600)' },
            }}
          />
        </div>
      </div>

      {/* Quick Links */}
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
