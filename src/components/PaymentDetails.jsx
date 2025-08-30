import React from "react";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

export default function PaymentDetails({ payment, onEdit, onOpenStatement }) {
  if (!payment) return null;
  const readonly = payment.status === 'CONFIRMED';
  return (
    <div className="px-4 safe-b pt-16">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <div className="flex items-center justify-between">
          <div className="font-semibold">Payment {payment.id}</div>
          <Badge color={readonly?'green':'yellow'}>{payment.status}</Badge>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <div><span className="text-slate-500">Type:</span> {payment.type}</div>
          <div><span className="text-slate-500">Amount:</span> AED {payment.amount}</div>
          <div><span className="text-slate-500">Created:</span> {payment.created}</div>
          <div><span className="text-slate-500">Reference:</span> {payment.reference ?? '-'}</div>
        </div>
        <div className="mt-4 flex gap-3">
          <Button variant="secondary" onClick={onOpenStatement}>Open Statement PDF</Button>
          {!readonly && <Button onClick={onEdit}>Edit</Button>}
        </div>
      </div>
    </div>
  );
}
