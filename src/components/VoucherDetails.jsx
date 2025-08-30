import React from "react";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

const QR = () => (
  <div className="h-32 w-32 bg-slate-200 grid place-items-center rounded">
    <span className="text-xs text-slate-500">QR</span>
  </div>
);

export default function VoucherDetails({
  voucher,
  driverName,
  onOpenPdf,
  onShareEmail,
  onRegeneratePdf,
  onEdit,
  onSendWhatsApp, // <-- wired in App.jsx below
}) {
  if (!voucher) return null;
  return (
    <div className="px-4 safe-b pt-16">
      <div className="card p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-lg">
              {voucher.clientName} — {voucher.packageName}
            </div>
            <div className="text-sm text-slate-500">
              {voucher.date} • {driverName ?? "Unassigned"}
            </div>
          </div>
          <Badge color={voucher.status === "COMPLETED" ? "green" : "blue"}>
            {voucher.status}
          </Badge>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <QR />
          <div className="space-y-2">
            <Button onClick={onOpenPdf}>Open PDF</Button>
            <Button variant="outline" onClick={onShareEmail}>
              Share via Email
            </Button>
            <Button variant="outline" onClick={onRegeneratePdf}>
              Regenerate PDF
            </Button>
            <Button
              variant="outline"
              onClick={() => onSendWhatsApp?.(voucher)}
            >
              Send via WhatsApp
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <Button variant="outline" onClick={onEdit}>
            Edit Voucher
          </Button>
        </div>
      </div>
    </div>
  );
}
