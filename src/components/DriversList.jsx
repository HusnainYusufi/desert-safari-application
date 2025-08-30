import React from "react";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import EmptyState from "./ui/EmptyState";

export default function DriversList({ drivers=[], onAdd, onEdit }) {
  if (!drivers.length) {
    return <div className="px-4 pb-24 pt-16">
      <EmptyState title="No drivers yet" subtitle="Add your first driver to get started" cta={<Button onClick={onAdd}>Add Driver</Button>} />
    </div>;
  }
  return (
    <div className="px-4 pb-24 pt-16">
      <div className="space-y-2">
        {drivers.map(d => (
          <div key={d.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{d.name}</div>
              <div className="text-xs text-slate-500">{d.phone}</div>
            </div>
            <div className="flex items-center gap-3">
              <Badge color={d.active ? 'green' : 'red'}>{d.active ? 'Active' : 'Inactive'}</Badge>
              <Button variant="secondary" onClick={()=>onEdit?.(d)}>Edit</Button>
            </div>
          </div>
        ))}
      </div>
      <Button className="fixed right-4 bottom-20 rounded-full shadow-lg" onClick={onAdd}>+ Add Driver</Button>
    </div>
  );
}
