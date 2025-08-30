import React from "react";
import { Home, Ticket, Users, CreditCard, User } from "lucide-react";

const tabs = [
  { key:'home', label:'Home', Icon: Home },
  { key:'vouchers', label:'Vouchers', Icon: Ticket },
  { key:'drivers', label:'Drivers', Icon: Users },
  { key:'payments', label:'Payments', Icon: CreditCard },
  { key:'account', label:'Account', Icon: User },
];

export default function TabBar({ current, onChange }) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 tabbar">
      <div className="grid grid-cols-5">
        {tabs.map(({key,label,Icon}) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`py-2.5 flex flex-col items-center gap-1 ${current===key?'text-[color:var(--brand)]':'text-slate-600'}`}
          >
            <Icon size={22} />
            <span className="text-[11px]">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
