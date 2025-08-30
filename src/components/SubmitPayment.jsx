import React, { useState } from "react";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Button from "./ui/Button";

export default function SubmitPayment({ onSubmit, onCancel }) {
  const [form, setForm] = useState({ amount:'', currency:'AED', method:'BANK', reference:'', periodStart:'', periodEnd:'', notes:'', receipt:null });
  const update = (k,v)=>setForm({...form,[k]:v});

  const onFile = (e)=>{
    const file = e.target.files?.[0];
    if(!file) return;
    update('receipt', file.name);
  };

  const valid = form.amount && form.periodStart && form.periodEnd;

  return (
    <div className="px-4 pb-24 pt-16">
      <div className="max-w-xl space-y-3">
        <Input label="Amount" type="number" value={form.amount} onChange={e=>update('amount', e.target.value)} />
        <Select label="Currency" value={form.currency} onChange={e=>update('currency', e.target.value)} options={['AED','USD','EUR']} />
        <Select label="Method" value={form.method} onChange={e=>update('method', e.target.value)} options={['BANK','CASH','WALLET']} />
        <Input label="Reference" value={form.reference} onChange={e=>update('reference', e.target.value)} />
        <Input label="Period Start" type="date" value={form.periodStart} onChange={e=>update('periodStart', e.target.value)} />
        <Input label="Period End" type="date" value={form.periodEnd} onChange={e=>update('periodEnd', e.target.value)} />
        <label className="block">
          <span className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-200">Notes</span>
          <textarea className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5" rows={3} value={form.notes} onChange={e=>update('notes', e.target.value)} />
        </label>
        <label className="block">
          <span className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-200">Upload receipt (image/pdf)</span>
          <input type="file" accept="image/*,application/pdf" onChange={onFile} />
          {form.receipt && <p className="mt-1 text-xs text-slate-500">Selected: {form.receipt}</p>}
        </label>
        <div className="flex gap-3 pt-2">
          <Button disabled={!valid} onClick={()=>onSubmit?.(form)}>Submit</Button>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}
