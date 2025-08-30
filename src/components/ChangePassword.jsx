import React, { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";

export default function ChangePassword({ onUpdate, onCancel }) {
  const [oldP, setOldP] = useState("");
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const valid = p1.length>=8 && p1===p2 && oldP.length>0;
  return (
    <div className="px-4 safe-b pt-16">
      <div className="max-w-md">
        <Input label="Old password" type="password" value={oldP} onChange={e=>setOldP(e.target.value)} />
        <Input className="mt-3" label="New password" type="password" value={p1} onChange={e=>setP1(e.target.value)} hint="Minimum 8 characters" />
        <Input className="mt-3" label="Confirm new password" type="password" value={p2} onChange={e=>setP2(e.target.value)} error={p2 && p1!==p2 ? "Passwords must match" : ""} />
        <div className="mt-4 flex gap-3">
          <Button disabled={!valid} onClick={()=>onUpdate?.()}>Update Password</Button>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}
