import React, { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";

export default function DriverForm({ initial, onSave, onCancel, onDelete }) {
  const [form, setForm] = useState(initial ?? { name:'', phone:'', active:true });
  const update = (k,v)=>setForm({...form,[k]:v});
  const isEditing = !!initial;

  return (
    <div className="px-4 pb-24 pt-16">
      <div className="max-w-md space-y-3">
        <Input label="Name" value={form.name} onChange={e=>update('name', e.target.value)} />
        <Input label="Phone" value={form.phone} onChange={e=>update('phone', e.target.value)} />
        <label className="flex items-center gap-2 select-none">
          <input type="checkbox" checked={form.active} onChange={e=>update('active', e.target.checked)} />
          <span className="text-sm text-slate-700 dark:text-slate-300">Active</span>
        </label>
        <div className="flex gap-3 pt-2">
          <Button onClick={()=>onSave?.(form)} disabled={!form.name || !form.phone}>Save</Button>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          {isEditing && <Button variant="danger" onClick={onDelete}>Delete</Button>}
        </div>
      </div>
    </div>
  );
}
