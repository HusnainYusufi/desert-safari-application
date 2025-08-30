import React from "react";
import VoucherCreate from "./VoucherCreate";

export default function VoucherEdit({ initial, drivers, onSave, onCancel }) {
  return <VoucherCreate drivers={drivers} onSave={onSave} onCancel={onCancel} initial={initial} />;
}
