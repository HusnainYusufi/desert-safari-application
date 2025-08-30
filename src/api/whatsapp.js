// Frontend client to hit your backend WhatsApp endpoint.
// If VITE_BACKEND_BASE_URL is not set, we fall back to device share (wa.me link).
export async function sendWhatsAppDocument({ to, pdfUrl, fileName }) {
  const base = import.meta.env.VITE_BACKEND_BASE_URL;
  if (!base) {
    // Fallback: open WhatsApp chat with a link to the PDF (no attachment)
    const msg = `Your voucher is ready.\n\n${fileName}\n${pdfUrl}`;
    const wa = `https://wa.me/${encodeURIComponent(to)}?text=${encodeURIComponent(msg)}`;
    window.location.href = wa;
    return { ok: true, fallback: true };
  }

  const res = await fetch(`${base.replace(/\/$/,'')}/api/whatsapp/send-document`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to, pdfUrl, fileName }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || "WhatsApp send failed");
  }
  return res.json();
}
