import React, { useState } from "react";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Button from "./ui/Button";

export default function VoucherCreate({ drivers=[], onSave, onCancel }) {
  const [form, setForm] = useState({
    clientName:'', clientPhone:'', packageName:'', paxCount:1, price:0, paymentStatus:'UNPAID', bookingDate:'', pickupTime:'', pickupLocation:'', driverId:'', notes:''
  });
  const update = (k,v)=>setForm({...form,[k]:v});

  const valid = form.clientName && form.clientPhone && form.packageName && form.bookingDate;

  return (
    <div className="px-4 pb-24 pt-16">
      <div className="max-w-xl space-y-3">
        <Input label="Client Name" value={form.clientName} onChange={e=>update('clientName', e.target.value)} />
        <Input label="Client Phone" value={form.clientPhone} onChange={e=>update('clientPhone', e.target.value)} />
        <Input label="Package Name" value={form.packageName} onChange={e=>update('packageName', e.target.value)} />
        <Input label="Pax Count" type="number" value={form.paxCount} onChange={e=>update('paxCount', Number(e.target.value))} />
        <Input label="Price" type="number" value={form.price} onChange={e=>update('price', Number(e.target.value))} />
        <Select label="Payment Status" value={form.paymentStatus} onChange={e=>update('paymentStatus', e.target.value)} options={[{value:'UNPAID',label:'Unpaid'},{value:'PAID',label:'Paid'}]} />
        <Input label="Booking Date" type="date" value={form.bookingDate} onChange={e=>update('bookingDate', e.target.value)} />
        <Input label="Pickup Time" type="time" value={form.pickupTime} onChange={e=>update('pickupTime', e.target.value)} />
        <Input label="Pickup Location" value={form.pickupLocation} onChange={e=>update('pickupLocation', e.target.value)} />
        <Select label="Driver" value={form.driverId} onChange={e=>update('driverId', e.target.value)} options={[{value:'',label:'Unassigned'}, ...drivers.map(d=>({value:d.id,label:d.name}))]} />
        <label className="block">
          <span className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-200">Notes</span>
          <textarea className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5" rows={3} value={form.notes} onChange={e=>update('notes', e.target.value)} />
        </label>
        <div className="flex gap-3 pt-2">
          <Button disabled={!valid} onClick={()=>onSave?.(form)}>Save</Button>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}
