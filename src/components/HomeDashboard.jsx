import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/Card";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

export default function HomeDashboard({ onQuickLink, upcoming=[] }) {
  const cards = [
    { title:"Today’s bookings", value: 18 },
    { title:"Completed", value: 12 },
    { title:"Pending", value: 6 },
  ];

  const quick = [
    { key:"voucher-create", label:"Create Voucher" },
    { key:"scan", label:"Scan" },
    { key:"calendar", label:"Calendar" },
  ];

  return (
    <div className="px-4 pb-24 pt-16">
      <div className="grid grid-cols-3 gap-3">
        {cards.map(c => (
          <Card key={c.title} className="text-center">
            <CardHeader>
              <CardTitle>{c.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{c.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-5">
        <h2 className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Quick links</h2>
        <div className="flex gap-3">
          {quick.map(q => (
            <Button key={q.key} onClick={()=>onQuickLink?.(q.key)}>{q.label}</Button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Upcoming Vouchers</h2>
        <div className="space-y-2">
          {(upcoming.length ? upcoming : [
            { id:"VCH-101", client:"John Smith", date:"2025-09-01", status:"SCHEDULED" },
            { id:"VCH-102", client:"Alice Doe", date:"2025-09-02", status:"SCHEDULED" },
          ]).map(v => (
            <div key={v.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">{v.client}</div>
                <div className="text-xs text-slate-500">{v.date}</div>
              </div>
              <Badge color="blue">{v.status}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
