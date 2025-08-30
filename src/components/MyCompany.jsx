import React from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { Card } from "./ui/Card";

export default function MyCompany({ initial, onSave, onCancel }) {
  const [form, setForm] = React.useState(initial ?? { name:"Legend Delivery", phone:"+971 55 555 5555", address:"Dubai, UAE", logo:null });
  const update = (k,v)=>setForm({...form,[k]:v});
  const onLogo = (e)=>{ const file = e.target.files?.[0]; if(!file) return; const reader = new FileReader(); reader.onload = () => setForm({...form, logo: reader.result}); reader.readAsDataURL(file); };

  return (
    <div className="px-4 safe-b pt-16">
      <Card className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-20 w-20 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
            {form.logo ? <img src={form.logo} alt="Logo" className="h-full w-full object-cover" /> : <span className="text-slate-500">Logo</span>}
          </div>
          <label className="cursor-pointer desert-link">
            <input type="file" accept="image/*" className="hidden" onChange={onLogo} />
            Change Logo
          </label>
        </div>
        <div className="space-y-3">
          <Input label="Company name" value={form.name} onChange={e=>update('name', e.target.value)} />
          <Input label="Phone" value={form.phone} onChange={e=>update('phone', e.target.value)} />
          <Input label="Address" value={form.address} onChange={e=>update('address', e.target.value)} />
        </div>
        <div className="mt-5 flex gap-3">
          <Button onClick={()=>onSave?.(form)}>Save</Button>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
        </div>
      </Card>
    </div>
  );
}
