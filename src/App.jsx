import React, { useEffect, useState } from "react";
import "./components/app-globals.css";
import { Capacitor } from "@capacitor/core";

import Navbar from "./components/Navbar";
import TabBar from "./components/TabBar";
import Splash from "./components/Splash";

import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

import HomeDashboard from "./components/HomeDashboard";
import MyCompany from "./components/MyCompany";
import Account from "./components/Account";
import ChangePassword from "./components/ChangePassword";

import DriversList from "./components/DriversList";
import DriverForm from "./components/DriverForm";

import VouchersList from "./components/VouchersList";
import VoucherCreate from "./components/VoucherCreate";
import VoucherDetails from "./components/VoucherDetails";

import Scan from "./components/Scan";
import CalendarSummary from "./components/CalendarSummary";

import PaymentsList from "./components/PaymentsList";
import SubmitPayment from "./components/SubmitPayment";
import PaymentDetails from "./components/PaymentDetails";

import Toast from "./components/ui/Toast";

export default function App() {
  const [boot, setBoot] = useState(true);
  const [auth, setAuth] = useState(null);
  const [screen, setScreen] = useState("home");
  const [toast, setToast] = useState({ open: false, message: "", type: "success" });

  const [drivers, setDrivers] = useState([
    { id: "D01", name: "Omar Khan", phone: "+97150123456", active: true },
    { id: "D02", name: "Sara Ali", phone: "+97150765432", active: true },
  ]);
  const [vouchers, setVouchers] = useState([
    {
      id: "VCH-1001",
      clientName: "John Smith",
      packageName: "Desert Safari",
      date: "2025-09-01",
      driverId: "D01",
      status: "SCHEDULED",
      clientPhone: "+971500000001",
    },
    {
      id: "VCH-1002",
      clientName: "Alice Doe",
      packageName: "City Tour",
      date: "2025-09-02",
      driverId: "D02",
      status: "PENDING",
      clientPhone: "+971500000002",
    },
  ]);
  const [payments, setPayments] = useState([
    { id: "PAY-9001", type: "BANK", amount: 1200, status: "PENDING", created: "2025-08-15", reference: "#A1" },
    { id: "PAY-9002", type: "CASH", amount: 800, status: "CONFIRMED", created: "2025-08-20" },
  ]);
  const [selected, setSelected] = useState({ voucher: null, payment: null, driver: null });

  useEffect(() => {
    // Force LTR + Light
    document.documentElement.setAttribute("dir", "ltr");
    document.body.setAttribute("dir", "ltr");
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("dark");
    document.documentElement.style.colorScheme = "light";

    // JS fallback for bottom inset (for devices that don't expose CSS env())
    const applyInsets = () => {
      const vv = window.visualViewport;
      if (!vv) return;
      const bottomGap = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      document.documentElement.style.setProperty("--safe-bottom-js", `${Math.round(bottomGap)}px`);
    };
    applyInsets();
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", applyInsets);
      window.visualViewport.addEventListener("scroll", applyInsets);
    }

    // Status bar (lazy import; works with Capacitor v6 plugin)
    try {
      if (Capacitor.getPlatform() !== "web") {
        import("@capacitor/status-bar").then(({ StatusBar, Style }) => {
          StatusBar.setOverlaysWebView({ overlay: false }); // avoid header under punch hole
          StatusBar.setStyle({ style: Style.Dark });
          StatusBar.setBackgroundColor({ color: "#F6E9D5" }); // desert sand
        });
      }
    } catch {}

    const t = setTimeout(() => setBoot(false), 1700);
    return () => {
      clearTimeout(t);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", applyInsets);
        window.visualViewport.removeEventListener("scroll", applyInsets);
      }
    };
  }, [Capacitor]);

  const notify = (message, type = "success") => {
    setToast({ open: true, message, type });
    setTimeout(() => setToast({ open: false }), 2000);
  };

  // -------- WhatsApp (no backend): share the PDF file via system share sheet ----------
  // Build your public PDF URL (adjust to your real host/generator)
  const buildVoucherPdfUrl = (v) => {
    const base = import.meta.env.VITE_PUBLIC_PDF_BASE_URL || "https://example.com";
    return `${base.replace(/\/$/, "")}/vouchers/${encodeURIComponent(v.id)}.pdf`;
  };

  // Try Web Share API w/ files (preferred), fallback to Capacitor Share (URL), then wa.me link.
  const shareVoucherPdf = async (v) => {
    const pdfUrl = buildVoucherPdfUrl(v);
    const filename = `${v.id}.pdf`;

    try {
      // Fetch the PDF so we can share it as a real file
      const resp = await fetch(pdfUrl, { mode: "cors" });
      if (!resp.ok) throw new Error("PDF fetch failed");
      const blob = await resp.blob();
      const file = new File([blob], filename, { type: "application/pdf" });

      // 1) Web Share API with files (Android Chrome/WebView supports this)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: `Voucher ${v.id}`, text: `Voucher ${v.id}` });
        notify("Share sheet opened");
        return;
      }

      // 2) Fallback: Capacitor Share (shares the URL, user can pick WhatsApp)
      try {
        const { Share } = await import("@capacitor/share");
        await Share.share({
          title: `Voucher ${v.id}`,
          text: `Voucher ${v.id}`,
          url: pdfUrl,
          dialogTitle: "Share voucher",
        });
        notify("Share sheet opened (link)");
        return;
      } catch {
        /* continue to wa.me */
      }

      // 3) Last-resort: open WhatsApp with message + link
      window.location.href = `https://wa.me/?text=${encodeURIComponent(`Voucher ${v.id}\n${pdfUrl}`)}`;
    } catch (e) {
      // If fetching the PDF failed (CORS, 404, etc.), just share the link
      try {
        const { Share } = await import("@capacitor/share");
        await Share.share({
          title: `Voucher ${v.id}`,
          text: `Voucher ${v.id}`,
          url: pdfUrl,
          dialogTitle: "Share voucher",
        });
      } catch {
        window.location.href = `https://wa.me/?text=${encodeURIComponent(`Voucher ${v.id}\n${pdfUrl}`)}`;
      }
      notify("Shared link (file attach not available)", "error");
    }
  };
  // ----------------------------------------------------------------------

  if (boot) return <Splash />;

  if (!auth) {
    if (screen === "forgot") return <ForgotPassword onBack={() => setScreen("login")} onSent={() => setScreen("login")} />;
    if (screen === "reset") return <ResetPassword onReset={() => setScreen("login")} onCancel={() => setScreen("login")} />;
    return <Login onLogin={(u) => { setAuth({ name: "Vendor Admin", email: u.email }); setScreen("home"); }} onForgot={() => setScreen("forgot")} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar title="DESERT SAFARI" />
      <main className="safe-b" style={{ paddingTop: "calc(56px + var(--safe-top))" }}>
        {screen === "home" && (
          <HomeDashboard
            onQuickLink={(key) => {
              if (key === "voucher-create") setScreen("voucher-create");
              if (key === "scan") setScreen("scan");
              if (key === "calendar") setScreen("calendar");
            }}
          />
        )}

        {screen === "vouchers" && (
          <VouchersList
            vouchers={vouchers}
            drivers={drivers}
            onCreate={() => setScreen("voucher-create")}
            onOpen={(v) => { setSelected((s) => ({ ...s, voucher: v })); setScreen("voucher-details"); }}
            onExport={(fmt) => notify(`Exported ${fmt.toUpperCase()}`)}
          />
        )}

        {screen === "drivers" && (
          <DriversList
            drivers={drivers}
            onAdd={() => { setSelected({ driver: null }); setScreen("driver-create"); }}
            onEdit={(d) => { setSelected({ driver: d }); setScreen("driver-edit"); }}
          />
        )}

        {screen === "payments" && (
          <PaymentsList
            payments={payments}
            onCreate={() => setScreen("submit-payment")}
            onOpen={(p) => { setSelected({ payment: p }); setScreen("payment-details"); }}
            onExport={(what) => notify(`${what === "xlsx" ? "Excel" : "PDF"} ready`)}
          />
        )}

        {screen === "account" && (
          <Account
            user={auth}
            onChangePassword={() => setScreen("change-password")}
            onLogout={() => { setAuth(null); setScreen("login"); }}
          />
        )}

        {screen === "company" && <MyCompany onSave={() => { notify("Company saved"); setScreen("home"); }} onCancel={() => setScreen("home")} />}
        {screen === "change-password" && <ChangePassword onUpdate={() => { notify("Password updated"); setScreen("account"); }} onCancel={() => setScreen("account")} />}

        {screen === "driver-create" && <DriverForm onSave={(d) => { setDrivers((ds) => [...ds, { ...d, id: "D" + (ds.length + 1) }]); notify("Driver saved"); setScreen("drivers"); }} onCancel={() => setScreen("drivers")} />}
        {screen === "driver-edit" && <DriverForm initial={selected.driver} onSave={(d) => { setDrivers((ds) => ds.map((x) => (x.id === selected.driver.id ? { ...x, ...d } : x))); notify("Driver updated"); setScreen("drivers"); }} onDelete={() => { setDrivers((ds) => ds.filter((x) => x.id !== selected.driver.id)); notify("Driver deleted"); setScreen("drivers"); }} onCancel={() => setScreen("drivers")} />}

        {screen === "voucher-create" && (
          <VoucherCreate
            drivers={drivers}
            onSave={(f) => {
              const v = { id: `VCH-${Math.floor(Math.random() * 9000) + 1000}`, ...f, date: f.bookingDate, status: "SCHEDULED" };
              setVouchers((vs) => [v, ...vs]);
              setSelected({ voucher: v });
              notify("Voucher created");
              // If you want to auto-open share after generation, uncomment:
              // shareVoucherPdf(v);
              setScreen("voucher-details");
            }}
            onCancel={() => setScreen("vouchers")}
          />
        )}

        {screen === "voucher-details" && (
          <VoucherDetails
            voucher={selected.voucher}
            driverName={drivers.find((d) => d.id === selected.voucher?.driverId)?.name}
            onOpenPdf={() => notify("Opening PDF")}
            onShareEmail={() => notify("Email sent")}
            onRegeneratePdf={() => {
              // After regenerate & host, share it:
              shareVoucherPdf(selected.voucher);
            }}
            onSendWhatsApp={(v) => shareVoucherPdf(v)}
            onEdit={() => setScreen("voucher-edit")}
          />
        )}

        {screen === "voucher-edit" && (
          <VoucherCreate
            drivers={drivers}
            onSave={(f) => {
              setVouchers((vs) => vs.map((v) => (v.id === selected.voucher.id ? { ...v, ...f, date: f.bookingDate } : v)));
              notify("Voucher updated");
              setScreen("voucher-details");
            }}
            onCancel={() => setScreen("voucher-details")}
          />
        )}

        {screen === "scan" && <Scan />}
        {screen === "calendar" && <CalendarSummary drivers={drivers} onOpenFor={(d, date) => { setScreen("vouchers"); }} />}

        {screen === "submit-payment" && (
          <SubmitPayment
            onSubmit={(f) => {
              const p = {
                id: `PAY-${Math.floor(Math.random() * 9000) + 1000}`,
                type: f.method,
                amount: Number(f.amount),
                status: "PENDING",
                created: new Date().toISOString().slice(0, 10),
                reference: f.reference,
              };
              setPayments((ps) => [p, ...ps]);
              setSelected({ payment: p });
              notify("Payment submitted");
              setScreen("payment-details");
            }}
            onCancel={() => setScreen("payments")}
          />
        )}

        {screen === "payment-details" && (
          <PaymentDetails
            payment={selected.payment}
            onEdit={() => setScreen("submit-payment")}
            onOpenStatement={() => notify("Opening Statement PDF")}
          />
        )}
      </main>

      <TabBar
        current={["home", "vouchers", "drivers", "payments", "account"].includes(screen) ? screen : "home"}
        onChange={(key) => setScreen(key)}
      />
      <Toast open={toast.open} message={toast.message} type={toast.type} />
    </div>
  );
}
