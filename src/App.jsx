import React, { useEffect, useState } from "react";
import "./components/app-globals.css";
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
  const [toast, setToast] = useState({ open:false, message:'', type:'success' });

  const [drivers, setDrivers] = useState([
    { id:"D01", name:"Omar Khan", phone:"+97150123456", active:true },
    { id:"D02", name:"Sara Ali", phone:"+97150765432", active:true },
  ]);
  const [vouchers, setVouchers] = useState([
    { id:"VCH-1001", clientName:"John Smith", packageName:"Desert Safari", date:"2025-09-01", driverId:"D01", status:"SCHEDULED" },
    { id:"VCH-1002", clientName:"Alice Doe", packageName:"City Tour", date:"2025-09-02", driverId:"D02", status:"PENDING" },
  ]);
  const [payments, setPayments] = useState([
    { id:"PAY-9001", type:"BANK", amount:1200, status:"PENDING", created:"2025-08-15", reference:"#A1" },
    { id:"PAY-9002", type:"CASH", amount:800, status:"CONFIRMED", created:"2025-08-20" },
  ]);
  const [selected, setSelected] = useState({ voucher:null, payment:null, driver:null });

  useEffect(() => {
    // Force LTR + light
    document.documentElement.setAttribute('dir','ltr');
    document.body.setAttribute('dir','ltr');
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
    document.documentElement.style.colorScheme='light';

    // Splash timing
    const t = setTimeout(() => setBoot(false), 1600);
    return () => clearTimeout(t);
  }, []);

  const notify = (message, type='success') => {
    setToast({ open:true, message, type });
    setTimeout(()=>setToast({open:false}), 2000);
  };

  if (boot) return <Splash />;

  if (!auth) {
    if (screen === "forgot") return <ForgotPassword onBack={()=>setScreen("login")} onSent={()=>setScreen("login")} />;
    if (screen === "reset") return <ResetPassword onReset={()=>setScreen("login")} onCancel={()=>setScreen("login")} />;
    return <Login onLogin={(u)=>{ setAuth({ name:"Vendor Admin", email:u.email }); setScreen("home"); }} onForgot={()=>setScreen("forgot")} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar title="DESERT SAFARI" />

      {screen === "home" && <HomeDashboard onQuickLink={(key)=>{
        if (key==='voucher-create') setScreen('voucher-create');
        if (key==='scan') setScreen('scan');
        if (key==='calendar') setScreen('calendar');
      }} />}

      {screen === "vouchers" && <VouchersList
        vouchers={vouchers}
        drivers={drivers}
        onCreate={()=>setScreen('voucher-create')}
        onOpen={(v)=>{ setSelected(s=>({...s, voucher:v})); setScreen('voucher-details'); }}
        onExport={(fmt)=>notify(`Exported ${fmt.toUpperCase()}`)}
      />}

      {screen === "drivers" && <DriversList
        drivers={drivers}
        onAdd={()=>{ setSelected({driver:null}); setScreen('driver-create'); }}
        onEdit={(d)=>{ setSelected({driver:d}); setScreen('driver-edit'); }}
      />}

      {screen === "payments" && <PaymentsList
        payments={payments}
        onCreate={()=>setScreen('submit-payment')}
        onOpen={(p)=>{ setSelected({payment:p}); setScreen('payment-details'); }}
        onExport={(what)=>notify(`${what==='xlsx'?'Excel':'PDF'} ready`)}
      />}

      {screen === "account" && <Account
        user={auth}
        onChangePassword={()=>setScreen('change-password')}
        onLogout={()=>{ setAuth(null); setScreen('login'); }}
      />}

      {screen === "company" && <MyCompany onSave={()=>{ notify('Company saved'); setScreen('home'); }} onCancel={()=>setScreen('home')} />}
      {screen === "change-password" && <ChangePassword onUpdate={()=>{ notify('Password updated'); setScreen('account'); }} onCancel={()=>setScreen('account')} />}
      {screen === "driver-create" && <DriverForm onSave={(d)=>{ setDrivers(ds=>[...ds, {...d, id:'D'+(ds.length+1)}]); notify('Driver saved'); setScreen('drivers'); }} onCancel={()=>setScreen('drivers')} />}
      {screen === "driver-edit" && <DriverForm initial={selected.driver} onSave={(d)=>{ setDrivers(ds=>ds.map(x=>x.id===selected.driver.id?{...x, ...d}:x)); notify('Driver updated'); setScreen('drivers'); }} onDelete={()=>{ setDrivers(ds=>ds.filter(x=>x.id!==selected.driver.id)); notify('Driver deleted'); setScreen('drivers'); }} onCancel={()=>setScreen('drivers')} />}
      {screen === "voucher-create" && <VoucherCreate drivers={drivers} onSave={(f)=>{ const v={ id:`VCH-${Math.floor(Math.random()*9000)+1000}`, ...f, date:f.bookingDate, status:'SCHEDULED' }; setVouchers(vs=>[v, ...vs]); setSelected({voucher:v}); notify('Voucher created'); setScreen('voucher-details'); }} onCancel={()=>setScreen('vouchers')} />}
      {screen === "voucher-details" && <VoucherDetails voucher={selected.voucher} driverName={drivers.find(d=>d.id===selected.voucher?.driverId)?.name} onOpenPdf={()=>notify('Opening PDF')} onShareEmail={()=>notify('Email sent')} onRegeneratePdf={()=>notify('PDF regenerated')} onEdit={()=>setScreen('voucher-edit')} />}
      {screen === "voucher-edit" && <VoucherCreate drivers={drivers} onSave={(f)=>{ setVouchers(vs=>vs.map(v=>v.id===selected.voucher.id?{...v, ...f, date:f.bookingDate}:v)); notify('Voucher updated'); setScreen('voucher-details'); }} onCancel={()=>setScreen('voucher-details')} />}
      {screen === "scan" && <Scan />}
      {screen === "calendar" && <CalendarSummary drivers={drivers} onOpenFor={(d,date)=>{ setScreen('vouchers'); }} />}
      {screen === "submit-payment" && <SubmitPayment onSubmit={(f)=>{ const p={ id:`PAY-${Math.floor(Math.random()*9000)+1000}`, type:f.method, amount:Number(f.amount), status:'PENDING', created:new Date().toISOString().slice(0,10), reference:f.reference }; setPayments(ps=>[p, ...ps]); setSelected({payment:p}); notify('Payment submitted'); setScreen('payment-details'); }} onCancel={()=>setScreen('payments')} />}
      {screen === "payment-details" && <PaymentDetails payment={selected.payment} onEdit={()=>setScreen('submit-payment')} onOpenStatement={()=>notify('Opening Statement PDF')} />}

      <TabBar current={['home','vouchers','drivers','payments','account'].includes(screen) ? screen : 'home'} onChange={(key)=>setScreen(key)} />

      <Toast open={toast.open} message={toast.message} type={toast.type} />
    </div>
  );
}
