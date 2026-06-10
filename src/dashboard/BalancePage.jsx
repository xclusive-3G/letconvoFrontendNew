// import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { BALANCE, TRANSACTIONS, PLANS_UPGRADE, PAYMENT_METHODS } from "./data";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Pr = "#8B6E3C";

function Section({ title, icon, children, action }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      style={{ background: "#fff", border: "1px solid #e8e2d8", borderRadius: 8, overflow: "hidden", marginBottom: 14 }}>
      <div style={{ padding: "13px 20px", borderBottom: "1px solid #f0ebe4", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fdf9f5" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16, color: Pr }}>{icon}</span>
          <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#1A1614" }}>{title}</span>
        </div>
        {action}
      </div>
      <div style={{ padding: "18px 20px" }}>{children}</div>
    </motion.div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <div onClick={() => onChange(!value)}
      style={{ width: 40, height: 22, borderRadius: 11, cursor: "pointer", position: "relative", background: value ? Pr : "#e8e2d8", transition: "background 0.2s", flexShrink: 0 }}>
      <motion.div animate={{ x: value ? 20 : 2 }} transition={{ duration: 0.2 }}
        style={{ position: "absolute", top: 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)" }} />
    </div>
  );
}

function TopUpModal({ onClose, onConfirm }) {
  const [amount, setAmount] = useState(100);
  const [custom, setCustom] = useState("");
  const [step, setStep] = useState(1);
  const presets = [50, 100, 200, 500];
  const finalAmt = custom ? parseFloat(custom) : amount;
  const mins = Math.round(finalAmt / 0.22);

  const doConfirm = () => {
    setStep(2);
    setTimeout(() => { setStep(3); onConfirm(finalAmt); }, 1400);
  };

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 300 }} />
      <motion.div initial={{ opacity: 0, scale: .94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .94 }}
        transition={{ duration: .28, ease: [.16, 1, .3, 1] }}
        style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "#fff", borderRadius: 10, width: 380, boxShadow: "0 20px 60px rgba(0,0,0,.18)", zIndex: 400, overflow: "hidden" }}>
        {step === 3 ? (
          <motion.div initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} style={{ padding: "40px 24px", textAlign: "center" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#ecfdf5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 28, color: "#10b981", fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 17, color: "#1A1614", marginBottom: 6 }}>Top-up Successful!</div>
            <div style={{ fontSize: 12, color: "#8B7060", marginBottom: 20 }}>${finalAmt.toFixed(2)} added · ~{mins} extra minutes available</div>
            <button onClick={onClose} style={{ padding: "9px 28px", background: Pr, color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>Done</button>
          </motion.div>
        ) : (
          <>
            <div style={{ padding: "15px 20px", borderBottom: "1px solid #f0ebe4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 14, color: "#1A1614" }}>Top Up Balance</div>
              <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><span className="material-symbols-outlined" style={{ fontSize: 19, color: "#8B7060" }}>close</span></button>
            </div>
            <div style={{ padding: "18px 20px" }}>
              <div style={{ fontSize: 10, fontFamily: "Syne,sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8B7060", marginBottom: 8 }}>Select Amount</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 14 }}>
                {presets.map(p => (
                  <button key={p} onClick={() => { setAmount(p); setCustom(""); }}
                    style={{ padding: "10px 0", border: `1.5px solid ${amount === p && !custom ? Pr : "#e8e2d8"}`, background: amount === p && !custom ? `${Pr}10` : "#fff", borderRadius: 6, cursor: "pointer", fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 13, color: amount === p && !custom ? Pr : "#4E4439", transition: "all 0.15s" }}>
                    ${p}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 10, fontFamily: "Syne,sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8B7060", marginBottom: 6 }}>Custom Amount</div>
              <div style={{ display: "flex", marginBottom: 16, border: `1.5px solid ${custom ? Pr : "#e8e2d8"}`, borderRadius: 6, overflow: "hidden", background: "#fff" }}>
                <span style={{ padding: "9px 12px", color: "#8B7060", fontSize: 14, fontWeight: 700, borderRight: "1px solid #e8e2d8", background: "#fdf9f5" }}>$</span>
                <input type="number" placeholder="Enter amount" value={custom} onChange={e => setCustom(e.target.value)}
                  style={{ flex: 1, border: "none", outline: "none", padding: "9px 12px", fontSize: 13, color: "#1A1614", fontFamily: "DM Sans,sans-serif" }} />
              </div>
              <div style={{ background: "#fdf9f5", borderRadius: 7, border: "1px solid #f0ebe4", padding: "10px 14px", marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: "#4E4439" }}>Estimated minutes added</span>
                <span style={{ fontSize: 13, fontFamily: "Syne,sans-serif", fontWeight: 700, color: Pr }}>~{mins} min</span>
              </div>
              <div style={{ fontSize: 10, fontFamily: "Syne,sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8B7060", marginBottom: 6 }}>Charge To</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "#f7f2ec", borderRadius: 6, border: "1px solid #e8e2d8", marginBottom: 18 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: Pr }}>credit_card</span>
                <span style={{ fontSize: 12, color: "#4E4439" }}>Visa ending in 4242</span>
                <span style={{ marginLeft: "auto", fontSize: 10, fontFamily: "Syne,sans-serif", fontWeight: 600, color: "#10b981" }}>Default</span>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: .97 }} onClick={doConfirm} disabled={step === 2}
                style={{ width: "100%", padding: "11px", background: step === 2 ? "#c4a97a" : Pr, color: "#fff", border: "none", borderRadius: 6, cursor: step === 2 ? "wait" : "pointer", fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {step === 2 ? (<><motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: .8, ease: "linear" }} className="material-symbols-outlined" style={{ fontSize: 15 }}>autorenew</motion.span>Processing…</>) : `Confirm Top Up — $${finalAmt.toFixed(2)}`}
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
}

function AddCardModal({ onClose }) {
  const [num, setNum] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);
  const fmt4 = v => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const fmtE = v => v.replace(/\D/g, "").slice(0, 4).replace(/^(.{2})/, "$1/");
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 300 }} />
      <motion.div initial={{ opacity: 0, scale: .94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .94 }} transition={{ duration: .28, ease: [.16, 1, .3, 1] }}
        style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "#fff", borderRadius: 10, width: 360, boxShadow: "0 20px 60px rgba(0,0,0,.18)", zIndex: 400, overflow: "hidden" }}>
        <div style={{ padding: "15px 20px", borderBottom: "1px solid #f0ebe4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 14, color: "#1A1614" }}>Add Payment Method</div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><span className="material-symbols-outlined" style={{ fontSize: 19, color: "#8B7060" }}>close</span></button>
        </div>
        <div style={{ padding: "18px 20px" }}>
          <div style={{ background: "linear-gradient(135deg,#2d2416,#8B6E3C)", borderRadius: 10, padding: "18px 20px", marginBottom: 18, color: "#fff", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
            <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: "0.14em", opacity: .6, marginBottom: 16 }}>LUMINOUS AI</div>
            <div style={{ fontFamily: "monospace", fontSize: 16, letterSpacing: "0.15em", marginBottom: 14 }}>{(num || "•••• •••• •••• ••••").padEnd(19, "•").slice(0, 19)}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div><div style={{ fontSize: 8, opacity: .55, marginBottom: 2 }}>CARD HOLDER</div><div style={{ fontSize: 11, fontWeight: 600 }}>{name || "YOUR NAME"}</div></div>
              <div><div style={{ fontSize: 8, opacity: .55, marginBottom: 2 }}>EXPIRES</div><div style={{ fontSize: 11, fontWeight: 600 }}>{exp || "MM/YY"}</div></div>
            </div>
          </div>
          {[{ l: "Card Number", v: num, s: v => setNum(fmt4(v)), ph: "4242 4242 4242 4242", mx: 19 }, { l: "Cardholder Name", v: name, s: setName, ph: "Sarah Adeyemi", mx: 40 }].map(f => (
            <div key={f.l} style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: 9, fontFamily: "Syne,sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8B7060", marginBottom: 4 }}>{f.l}</label>
              <input value={f.v} onChange={e => f.s(e.target.value)} placeholder={f.ph} maxLength={f.mx}
                style={{ width: "100%", border: "1px solid #e8e2d8", borderRadius: 5, padding: "8px 11px", fontSize: 13, color: "#1A1614", fontFamily: "DM Sans,sans-serif", outline: "none" }} />
            </div>
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 9, fontFamily: "Syne,sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8B7060", marginBottom: 4 }}>Expiry</label>
              <input value={exp} onChange={e => setExp(fmtE(e.target.value))} placeholder="MM/YY" maxLength={5}
                style={{ width: "100%", border: "1px solid #e8e2d8", borderRadius: 5, padding: "8px 11px", fontSize: 13, color: "#1A1614", fontFamily: "DM Sans,sans-serif", outline: "none" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 9, fontFamily: "Syne,sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8B7060", marginBottom: 4 }}>CVV</label>
              <input value={cvv} onChange={e => setCvv(e.target.value.slice(0, 3))} placeholder="•••" maxLength={3}
                style={{ width: "100%", border: "1px solid #e8e2d8", borderRadius: 5, padding: "8px 11px", fontSize: 13, color: "#1A1614", fontFamily: "DM Sans,sans-serif", outline: "none" }} />
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: .97 }} onClick={() => { setDone(true); setTimeout(onClose, 1200); }}
            style={{ width: "100%", padding: "10px", background: done ? "#10b981" : Pr, color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {done ? "Card Saved ✓" : "Save Card"}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

const fetchBillingSummary = async () => {
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const [summary, tx, plansRes, methods] = await Promise.all([
    axios.get("https://api.letconvo.live/api/me/billing/summary", { headers }),
    axios.get("https://api.letconvo.live/api/me/billing/transactions", { headers }),
    axios.get("https://api.letconvo.live/api/plans"),
    axios.get("https://api.letconvo.live/api/me/payment-methods", { headers })
  ]);

  return {
    balance: summary.data.balance,
    transactions: tx.data.transactions || [],
    plans: (plansRes.data.plans || []).map((p) => ({
      ...p,
      current: p.slug === summary.data.balance.planSlug
    })),
    paymentMethods: methods.data.methods || []
  };
};



export default function BalancePage({ setActivePage }) {

  const {
    data: billingData,
    isLoading,
    error,
    // refetch
  } = useQuery({
    queryKey: ["billing"],
    queryFn: fetchBillingSummary,

    staleTime: 10000,
    gcTime: 10 * 60 * 1000,

    refetchInterval: 15000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true
  });


  const balanceData = billingData?.balance;
  const transactions = billingData?.transactions || [];
  const plans = billingData?.plans || [];
  const paymentMethods = billingData?.paymentMethods || [];
  // const Pr = "#8B6E3C";

  // const [balanceData, setBalanceData] = useState(null);
  // const [transactions, setTransactions] = useState([]);
  // const [plans, setPlans] = useState([]);
  // const [paymentMethods, setPaymentMethods] = useState([]);

  const [showTopUp, setShowTopUp] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const [autoTopUp, setAutoTopUp] = useState(false);
  const [threshold, setThreshold] = useState(100);
  const [topUpAmt, setTopUpAmt] = useState(50);

  const [filterType, setFilterType] = useState("all");
  const [balance, setBalance] = useState(0);
  const [minutes, setMinutes] = useState(0);

  // useEffect(() => {
  //   fetchBilling();
  // }, []);

  // useEffect(() => {
  //   if (!balanceData) return;

  //   setBalance(balanceData.dollarBalance);
  //   setMinutes(balanceData.minutesRemaining);
  // }, [balanceData]);


  useEffect(() => {
    if (!balanceData) return;

    setBalance(balanceData.dollarBalance);
    setMinutes(balanceData.minutesRemaining);
  }, [balanceData]);

  if (isLoading) {
    return <div style={{ padding: 40 }}>Loading billing data...</div>;
  }

  if (error) {
    return <div style={{ padding: 40 }}>Failed to load billing data.</div>;
  }



  // if (!balanceData) {
  //   return (
  //     <div style={{ padding: 40 }}>
  //       Loading billing data...
  //     </div>
  //   );
  // }

  const usedPct =
    balanceData?.minutesTotal > 0
      ? (balanceData.minutesUsed / balanceData.minutesTotal) * 100
      : 0;

  const txFiltered =
    transactions.filter(
      t => filterType === "all" || t.type === filterType
    );
  const handleTopUp = amt => { setBalance(b => +(b + parseFloat(amt)).toFixed(2)); setMinutes(m => m + Math.round(parseFloat(amt) / 0.22)); };
  const txIcon = { usage: "call", topup: "add_circle", payment: "credit_card", invoice: "receipt", refund: "undo" };
  const txColor = { usage: "#ef4444", topup: "#10b981", payment: "#3b82f6", invoice: "#8B6E3C", refund: "#8b5cf6" };



  return (
    <div style={{ padding: "24px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 18, color: "#1A1614", textTransform: "uppercase", letterSpacing: "-0.01em" }}>Balance &amp; Billing</h1>
          <p style={{ fontSize: 12, color: "#8B7060", marginTop: 2 }}>Manage your minutes, payments, and subscription</p>
        </div>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: .97 }} onClick={() => setShowTopUp(true)}
          style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", background: Pr, color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", boxShadow: `0 2px 12px ${Pr}30` }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add_circle</span>Top Up Balance
        </motion.button>
      </div>

      {/* Top 3 cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 14 }}>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}
          style={{ background: "linear-gradient(135deg,#1a1410 0%,#2d2010 100%)", borderRadius: 8, padding: "20px 22px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -20, right: -20, width: 90, height: 90, borderRadius: "50%", background: "rgba(139,110,60,0.15)" }} />
          <div style={{ fontSize: 10, fontFamily: "Syne,sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(196,169,122,0.8)", marginBottom: 6 }}>Dollar Balance</div>
          <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 36, color: "#c4a97a", letterSpacing: "-0.02em", lineHeight: 1 }}>${balance.toFixed(2)}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 6 }}>Available credit</div>
          {balance < 20 && <div style={{ marginTop: 10, padding: "5px 10px", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 5, display: "inline-flex", alignItems: "center", gap: 5 }}><span className="material-symbols-outlined" style={{ fontSize: 12, color: "#ef4444" }}>warning</span><span style={{ fontSize: 10, color: "#ef4444", fontFamily: "Syne,sans-serif", fontWeight: 600 }}>Low balance</span></div>}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .07 }}
          style={{ background: "#fff", borderRadius: 8, border: "1px solid #e8e2d8", padding: "20px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 10, fontFamily: "Syne,sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#8B7060", marginBottom: 5 }}>Minutes This Month</div>
              <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 32, color: "#1A1614", letterSpacing: "-0.02em", lineHeight: 1 }}>{minutes}</div>
              <div style={{ fontSize: 11, color: "#8B7060", marginTop: 4 }}>remaining of {balanceData?.minutesTotal || 0}</div>
            </div>
            <div style={{ width: 52, height: 52, position: "relative", flexShrink: 0 }}>
              <svg viewBox="0 0 36 36" style={{ width: 52, height: 52, transform: "rotate(-90deg)" }}>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f0ebe4" strokeWidth="3" />
                <motion.circle cx="18" cy="18" r="15.9" fill="none" stroke={usedPct > 80 ? "#ef4444" : Pr} strokeWidth="3"
                  strokeDasharray={`${usedPct} ${100 - usedPct}`} strokeLinecap="round"
                  initial={{ strokeDasharray: "0 100" }} animate={{ strokeDasharray: `${usedPct} ${100 - usedPct}` }}
                  transition={{ delay: .4, duration: 1, ease: [.16, 1, .3, 1] }} />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 10, color: Pr }}>{Math.round(usedPct)}%</div>
            </div>
          </div>
          <div style={{ height: 6, background: "#f0ebe4", borderRadius: 100, overflow: "hidden" }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${usedPct}%` }} transition={{ delay: .5, duration: 1, ease: [.16, 1, .3, 1] }}
              style={{ height: "100%", background: usedPct > 80 ? "#ef4444" : Pr, borderRadius: 100 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
            <span style={{ fontSize: 10, color: "#8B7060" }}>{balanceData?.minutesUsed || 0} used</span>
            <span style={{ fontSize: 10, color: "#8B7060" }}>Resets {balanceData?.nextBillingDate || "N/A"}</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .14 }}
          style={{ background: "#fff", borderRadius: 8, border: `1.5px solid ${Pr}40`, padding: "20px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 10, fontFamily: "Syne,sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#8B7060", marginBottom: 4 }}>Current Plan</div>
              <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 22, color: Pr, marginBottom: 2 }}>{balanceData?.planName || "Starter"}</div>
              <div style={{ fontSize: 24, fontFamily: "Syne,sans-serif", fontWeight: 800, color: "#1A1614" }}>$${balanceData?.planPrice || 0}<span style={{ fontSize: 12, fontWeight: 500, color: "#8B7060" }}>/mo</span></div>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: 9, background: `${Pr}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: Pr, fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
            </div>
          </div>
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #f0ebe4" }}>
            <div style={{ fontSize: 11, color: "#8B7060", marginBottom: 8 }}>Next billing: <strong style={{ color: "#1A1614" }}>{balanceData?.nextBillingDate || "N/A"}</strong></div>
            <button
              onClick={() => {
                if (typeof setActivePage === "function") {
                  setActivePage("settings");
                }
              }}

              style={{ padding: "5px 12px", background: `${Pr}10`, color: Pr, border: `1px solid ${Pr}30`, borderRadius: 5, cursor: "pointer", fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Manage Plan
            </button>
          </div>
        </motion.div>
      </div>

      {/* Auto top-up + Payment methods */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <Section title="Auto Top-Up" icon="autorenew" action={<Toggle value={autoTopUp} onChange={setAutoTopUp} />}>
          <p style={{ fontSize: 12, color: "#8B7060", marginBottom: 14, lineHeight: 1.55 }}>Automatically top up when minutes fall below threshold. Never let your AI go offline.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, opacity: autoTopUp ? 1 : .4, pointerEvents: autoTopUp ? "all" : "none", transition: "opacity 0.2s" }}>
            {[["Trigger Threshold (mins)", "min", threshold, setThreshold], ["Top-Up Amount ($)", "$", topUpAmt, setTopUpAmt]].map(([lbl, pre, val, set]) => (
              <div key={lbl}>
                <label style={{ display: "block", fontSize: 9, fontFamily: "Syne,sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8B7060", marginBottom: 5 }}>{lbl}</label>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid #e8e2d8", borderRadius: 5, overflow: "hidden" }}>
                  <span style={{ padding: "7px 10px", background: "#fdf9f5", fontSize: 12, color: "#8B7060", borderRight: "1px solid #e8e2d8" }}>{pre}</span>
                  <input type="number" value={val} onChange={e => set(e.target.value)} style={{ flex: 1, border: "none", outline: "none", padding: "7px 10px", fontSize: 13, color: "#1A1614", fontFamily: "DM Sans,sans-serif" }} />
                </div>
              </div>
            ))}
          </div>
          {autoTopUp && <div style={{ marginTop: 12, padding: "9px 12px", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 6, fontSize: 11, color: "#065f46" }}>✓ Will auto top-up <strong>${topUpAmt}</strong> (~{Math.round(topUpAmt / 0.22)} min) when below <strong>{threshold} minutes</strong></div>}
        </Section>

        <Section title="Payment Methods" icon="credit_card"
          action={<button onClick={() => setShowCard(true)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", background: `${Pr}10`, color: Pr, border: `1px solid ${Pr}25`, borderRadius: 4, cursor: "pointer", fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}><span className="material-symbols-outlined" style={{ fontSize: 13 }}>add</span>Add</button>}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {paymentMethods.map(pm => (
              <div key={pm.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", background: "#fdf9f5", borderRadius: 7, border: `1px solid ${pm.default ? `${Pr}40` : "#f0ebe4"}` }}>
                <div style={{ width: 44, height: 28, borderRadius: 4, background: "linear-gradient(135deg,#2d2416,#8B6E3C)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: "#fff", fontSize: 8, fontFamily: "Syne,sans-serif", fontWeight: 700, textTransform: "uppercase" }}>{pm.type}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontFamily: "Syne,sans-serif", fontWeight: 600, color: "#1A1614" }}>{pm.type.charAt(0).toUpperCase() + pm.type.slice(1)} •••• {pm.last4}</div>
                  <div style={{ fontSize: 10, color: "#8B7060" }}>Expires {pm.expiry}</div>
                </div>
                {pm.default && <span style={{ padding: "2px 8px", borderRadius: 100, fontSize: 9, fontFamily: "Syne,sans-serif", fontWeight: 700, background: "#ecfdf5", color: "#10b981", textTransform: "uppercase", letterSpacing: "0.08em" }}>Default</span>}
                <button style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}><span className="material-symbols-outlined" style={{ fontSize: 15, color: "#c4a97a" }}>more_vert</span></button>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid #f0ebe4" }}>
            <div style={{ fontSize: 10, color: "#8B7060", marginBottom: 7 }}>Accepted payment methods</div>
            <div style={{ display: "flex", gap: 6 }}>
              {["Visa", "Mastercard", "Verve", "PayPal"].map(c => (
                <span key={c} style={{ padding: "3px 8px", border: "1px solid #e8e2d8", borderRadius: 3, fontSize: 10, fontFamily: "Syne,sans-serif", fontWeight: 600, color: "#4E4439" }}>{c}</span>
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* Plan comparison */}
      <Section title="Plan Comparison" icon="workspace_premium">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {plans.map((p, i) => (
            <div key={p.name} style={{ borderRadius: 8, padding: "16px 18px", position: "relative", border: p.current ? `1.5px solid ${Pr}` : "1px solid #e8e2d8", background: p.current ? `${Pr}06` : "#fff" }}>
              {p.current && <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: Pr, color: "#fff", fontSize: 9, fontFamily: "Syne,sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", padding: "2px 10px", borderRadius: 100, whiteSpace: "nowrap" }}>Current Plan</div>}
              <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 14, color: p.current ? Pr : "#1A1614", marginBottom: 4 }}>{p.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 8 }}>
                <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 26, color: "#1A1614" }}>${p.price}</span>
                <span style={{ fontSize: 11, color: "#8B7060" }}>/mo</span>
              </div>
              <div style={{ fontSize: 11, color: "#8B7060", marginBottom: 10 }}>{p.minutes.toLocaleString()} min · ${p.perMin}/extra min</div>
              {p.features.map(f => (
                <div key={f} style={{ display: "flex", gap: 6, alignItems: "flex-start", marginBottom: 5 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 13, color: p.current ? Pr : "#10b981", flexShrink: 0, marginTop: .5 }}>check_circle</span>
                  <span style={{ fontSize: 11, color: "#4E4439" }}>{f}</span>
                </div>
              ))}
              {!p.current && <button style={{ marginTop: 12, width: "100%", padding: "7px", border: `1.5px solid ${Pr}`, background: "transparent", color: Pr, borderRadius: 5, cursor: "pointer", fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>{i < 1 ? "Downgrade" : "Upgrade →"}</button>}
            </div>
          ))}
        </div>
      </Section>

      {/* Transactions */}
      <Section title="Transaction History" icon="receipt_long"
        action={<button style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", background: "#f7f2ec", color: "#4E4439", border: "1px solid #e8e2d8", borderRadius: 4, cursor: "pointer", fontFamily: "Syne,sans-serif", fontWeight: 600, fontSize: 10 }}><span className="material-symbols-outlined" style={{ fontSize: 13 }}>download</span>Export</button>}>
        <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
          {["all", "usage", "topup", "payment", "invoice", "refund"].map(f => (
            <button key={f} onClick={() => setFilterType(f)}
              style={{ padding: "4px 12px", borderRadius: 100, border: `1px solid ${filterType === f ? Pr : "#e8e2d8"}`, background: filterType === f ? Pr : "#fff", color: filterType === f ? "#fff" : "#4E4439", fontFamily: "Syne,sans-serif", fontWeight: 600, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", cursor: "pointer" }}>
              {f === "all" ? `All (${transactions.length})` : f}
            </button>
          ))}
        </div>
        <div style={{ border: "1px solid #f0ebe4", borderRadius: 7, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#fdf9f5", borderBottom: "2px solid #f0ebe4" }}>
                {["Date", "Type", "Description", "Amount", "Balance", "Status"].map(h => (
                  <th key={h} style={{ padding: "8px 14px", textAlign: h === "Amount" || h === "Balance" ? "right" : "left", fontSize: 9, fontFamily: "Syne,sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8B7060" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {txFiltered.map((t, i) => (
                <motion.tr key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * .03 }}
                  style={{ borderBottom: "1px solid #f7f3ef" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fdf9f5"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: "#4E4439" }}>{new Date(t.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 24, height: 24, borderRadius: 5, background: `${txColor[t.type]}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 13, color: txColor[t.type] }}>{txIcon[t.type]}</span>
                      </div>
                      <span style={{ fontSize: 11, fontFamily: "Syne,sans-serif", fontWeight: 600, color: "#1A1614", textTransform: "capitalize" }}>{t.type}</span>
                    </div>
                  </td>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: "#4E4439" }}>{t.description}</td>
                  <td style={{ padding: "10px 14px", textAlign: "right", fontSize: 12, fontFamily: "Syne,sans-serif", fontWeight: 700, color: t.amount >= 0 ? "#10b981" : "#ef4444" }}>
                    {t.amount >= 0 ? `+$${t.amount.toFixed(2)}` : `-$${Math.abs(t.amount).toFixed(2)}`}
                  </td>
                  <td style={{ padding: "10px 14px", textAlign: "right", fontSize: 12, color: "#4E4439" }}>{`$${Number(t.balance_after || 0).toFixed(2)}`}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <span style={{ padding: "2px 8px", borderRadius: 100, fontSize: 9, fontFamily: "Syne,sans-serif", fontWeight: 700, background: "#ecfdf5", color: "#10b981", textTransform: "uppercase", letterSpacing: "0.06em" }}>{t.status}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <AnimatePresence>
        {showTopUp && <TopUpModal onClose={() => setShowTopUp(false)} onConfirm={handleTopUp} />}
        {showCard && <AddCardModal onClose={() => setShowCard(false)} />}
      </AnimatePresence>
    </div>
  );
}
