import { useEffect, useState, useCallback } from "react";
import {
  fetchCompanyDetail,
  fetchAdminPlans,
  updateCompanyPlan,
  updateCompanyStatus,
  adjustCompanyCredits,
  assignPhoneNumber,
  assignRetellAgent,
  migrateToRetellNative,
  deleteCompany
} from "../api/adminApi";

const Pr = "#8B6E3C";

function Section({ title, children }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e8e2d8", borderRadius: 8, padding: "16px 18px", marginBottom: 14 }}>
      <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#8B6E3C", marginBottom: 12 }}>{title}</div>
      {children}
    </div>
  );
}

const inputCls = { padding: "8px 12px", border: "1px solid #d4c8b8", borderRadius: 6, fontSize: 12, outline: "none", fontFamily: "DM Sans,sans-serif" };
const btnCls = { padding: "8px 14px", background: Pr, color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em" };

export default function AdminCompanyDetailPage({ clientId, onBack }) {
  const [detail, setDetail] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const [planId, setPlanId] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [agentInput, setAgentInput] = useState("");
  const [creditAmount, setCreditAmount] = useState("");
  const [creditType, setCreditType] = useState("credit");
  const [creditDesc, setCreditDesc] = useState("");
  const [phoneError, setPhoneError] = useState(null);
  const [migrating, setMigrating] = useState(false);
  const [migrateResult, setMigrateResult] = useState(null);

  const [deleteInput, setDeleteInput] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const load = useCallback(() => {
    if (!clientId) return;
    setLoading(true);
    setError(null);
    Promise.all([fetchCompanyDetail(clientId), fetchAdminPlans()])
      .then(([detailRes, plansRes]) => {
        setDetail(detailRes);
        setPlans(plansRes.plans || []);
        setPlanId(detailRes.client.plan_id || "");
        setPhoneInput(detailRes.numbers?.[0]?.telnyx_number || "");
        setAgentInput(detailRes.settings?.retell_agent_id || "");
      })
      .catch((err) => setError(err.response?.data?.error || err.message))
      .finally(() => setLoading(false));
  }, [clientId]);

  useEffect(() => { load(); }, [load]);

  if (!clientId) {
    return <div style={{ padding: 24, fontSize: 12, color: "#8B7060" }}>No company selected.</div>;
  }

  if (loading) {
    return <div style={{ padding: 24, fontSize: 12, color: "#8B7060" }}>Loading...</div>;
  }

  if (error || !detail) {
    return (
      <div style={{ padding: 24 }}>
        <div style={{ fontSize: 12, color: "#ef4444", marginBottom: 12 }}>{error || "Company not found."}</div>
        <button onClick={onBack} style={btnCls}>← Back to Companies</button>
      </div>
    );
  }

  const { client, recentCalls, recentBilling, recentCreditTransactions } = detail;

  const handleSavePlan = async () => {
    setSaving(true);
    try {
      await updateCompanyPlan(clientId, planId);
      load();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to update plan");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async () => {
    const nextStatus = client.status === "active" ? "paused" : "active";
    setSaving(true);
    try {
      await updateCompanyStatus(clientId, nextStatus);
      load();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to update status");
    } finally {
      setSaving(false);
    }
  };

  const handleAdjustCredits = async () => {
    const amt = Number(creditAmount);
    if (!(amt > 0)) return alert("Enter a positive amount");
    setSaving(true);
    try {
      await adjustCompanyCredits(clientId, { amount: amt, type: creditType, description: creditDesc });
      setCreditAmount("");
      setCreditDesc("");
      load();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to adjust credits");
    } finally {
      setSaving(false);
    }
  };

  const handleSavePhone = async () => {
    setPhoneError(null);
    setSaving(true);
    try {
      await assignPhoneNumber(clientId, phoneInput);
      load();
    } catch (err) {
      if (err.response?.status === 409) {
        setPhoneError(err.response.data.error);
      } else {
        alert(err.response?.data?.error || "Failed to assign number");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAgent = async () => {
    setSaving(true);
    try {
      await assignRetellAgent(clientId, agentInput);
      load();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to assign agent");
    } finally {
      setSaving(false);
    }
  };

  const handleMigrateToRetellNative = async () => {
    setMigrating(true);
    setMigrateResult(null);
    try {
      const res = await migrateToRetellNative(clientId);
      setMigrateResult({ ok: true, message: `Migrated — inbound webhook set, agent ${res.retellNumber?.inbound_agents?.[0]?.agent_id || ""}` });
    } catch (err) {
      setMigrateResult({ ok: false, message: err.response?.data?.error || "Migration failed" });
    } finally {
      setMigrating(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteCompany(clientId);
      onBack();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete company");
      setDeleting(false);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "#8B7060", marginBottom: 12, fontFamily: "Syne,sans-serif", fontWeight: 600 }}>
        ← Back to Companies
      </button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 20, color: "#1A1614" }}>{client.business_name}</h1>
          <p style={{ fontSize: 12, color: "#8B7060", marginTop: 2 }}>
            {client.ownerName || "-"} · {client.ownerEmail} · Signed up {new Date(client.created_at).toLocaleDateString()}
          </p>
        </div>
        <span style={{ padding: "5px 12px", borderRadius: 100, fontSize: 11, fontFamily: "Syne,sans-serif", fontWeight: 700, textTransform: "uppercase", background: client.status === "active" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", color: client.status === "active" ? "#10b981" : "#ef4444", border: `1px solid ${client.status === "active" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}` }}>
          {client.status}
        </span>
      </div>

      <Section title="Plan">
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <select value={planId} onChange={(e) => setPlanId(e.target.value)} style={{ ...inputCls, flex: 1, background: "#fff", cursor: "pointer" }}>
            <option value="">— Select plan —</option>
            {plans.map((p) => <option key={p.id} value={p.id}>{p.name} (${p.price_usd}/mo)</option>)}
          </select>
          <button onClick={handleSavePlan} disabled={saving || !planId} style={{ ...btnCls, opacity: saving || !planId ? 0.6 : 1 }}>Save</button>
        </div>
      </Section>

      <Section title="Account Status">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 12, color: "#4E4439" }}>Currently <strong>{client.status}</strong>.</span>
          <button onClick={handleToggleStatus} disabled={saving}
            style={{ ...btnCls, background: client.status === "active" ? "#8B7060" : "#10b981", opacity: saving ? 0.6 : 1 }}>
            {client.status === "active" ? "Suspend" : "Reactivate"}
          </button>
        </div>
      </Section>

      <Section title="Credits">
        <div style={{ fontSize: 12, color: "#4E4439", marginBottom: 10 }}>
          Current balance: <strong style={{ color: Pr }}>{Math.round(client.credits_remaining || 0).toLocaleString()} credits</strong>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
          <input type="number" placeholder="Amount" value={creditAmount} onChange={(e) => setCreditAmount(e.target.value)} style={{ ...inputCls, width: 110 }} />
          <select value={creditType} onChange={(e) => setCreditType(e.target.value)} style={{ ...inputCls, background: "#fff", cursor: "pointer" }}>
            <option value="credit">Add (credit)</option>
            <option value="debit">Remove (debit)</option>
          </select>
          <input placeholder="Reason (optional)" value={creditDesc} onChange={(e) => setCreditDesc(e.target.value)} style={{ ...inputCls, flex: 1, minWidth: 160 }} />
          <button onClick={handleAdjustCredits} disabled={saving} style={{ ...btnCls, opacity: saving ? 0.6 : 1 }}>Apply</button>
        </div>
        {recentCreditTransactions?.length > 0 && (
          <div style={{ borderTop: "1px solid #f0ebe4", paddingTop: 10 }}>
            {recentCreditTransactions.slice(0, 5).map((t) => (
              <div key={t.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#4E4439", padding: "4px 0" }}>
                <span>{t.description || t.type}</span>
                <span style={{ color: t.type === "credit" ? "#10b981" : "#ef4444", fontWeight: 700 }}>{t.type === "credit" ? "+" : "-"}{t.amount}</span>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section title="Phone Number">
        <div style={{ display: "flex", gap: 10 }}>
          <input placeholder="+1 555 000 1111" value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} style={{ ...inputCls, flex: 1 }} />
          <button onClick={handleSavePhone} disabled={saving} style={{ ...btnCls, opacity: saving ? 0.6 : 1 }}>Assign</button>
        </div>
        {phoneError && <div style={{ marginTop: 8, fontSize: 11, color: "#ef4444" }}>{phoneError}</div>}
      </Section>

      <Section title="Retell Agent">
        <div style={{ display: "flex", gap: 10 }}>
          <input placeholder="agent_xxxxxxxxxxxx" value={agentInput} onChange={(e) => setAgentInput(e.target.value)} style={{ ...inputCls, flex: 1 }} />
          <button onClick={handleSaveAgent} disabled={saving} style={{ ...btnCls, opacity: saving ? 0.6 : 1 }}>Assign</button>
        </div>
      </Section>

      <Section title="Call Routing">
        <div style={{ fontSize: 11.5, color: "#8B7060", marginBottom: 10, lineHeight: 1.5 }}>
          By default, live calls route through Telnyx's SIP-transfer path — Telnyx only allows
          about 1 second before it gives up on an unanswered call, which is too tight for a
          database lookup to reliably beat. Migrating switches this number to Retell's own
          native inbound routing instead, which gives a 10 second budget for the same
          per-client agent/personalization resolution. Safe to run again if it's already migrated.
        </div>
        <button onClick={handleMigrateToRetellNative} disabled={migrating} style={{ ...btnCls, opacity: migrating ? 0.6 : 1 }}>
          {migrating ? "Migrating..." : "Migrate to Retell-native routing"}
        </button>
        {migrateResult && (
          <div style={{ marginTop: 10, fontSize: 11.5, color: migrateResult.ok ? "#10b981" : "#ef4444" }}>
            {migrateResult.message}
          </div>
        )}
      </Section>

      <Section title="Recent Calls">
        {(!recentCalls || recentCalls.length === 0) && <div style={{ fontSize: 12, color: "#8B7060" }}>No calls yet.</div>}
        {recentCalls?.map((c) => (
          <div key={c.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#4E4439", padding: "5px 0", borderBottom: "1px solid #f7f2ec" }}>
            <span>{c.caller_phone || "Unknown"} · {c.call_status || "-"}</span>
            <span>{c.created_at ? new Date(c.created_at).toLocaleString() : "-"}</span>
          </div>
        ))}
      </Section>

      <Section title="Recent Billing">
        {(!recentBilling || recentBilling.length === 0) && <div style={{ fontSize: 12, color: "#8B7060" }}>No transactions yet.</div>}
        {recentBilling?.map((t) => (
          <div key={t.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#4E4439", padding: "5px 0", borderBottom: "1px solid #f7f2ec" }}>
            <span>{t.description || t.type}</span>
            <span>${Number(t.amount || 0).toFixed(2)}</span>
          </div>
        ))}
      </Section>

      <Section title="Danger Zone">
        <p style={{ fontSize: 11.5, color: "#8B7060", marginBottom: 10 }}>
          Permanently deletes all data for this company — calls, billing history, credits, phone number assignment, and the owner's login. This cannot be undone.
        </p>
        <button onClick={() => setShowDeleteModal(true)}
          style={{ padding: "8px 14px", background: "#fef2f2", color: "#ef4444", border: "1px solid #fecaca", borderRadius: 6, cursor: "pointer", fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 11, textTransform: "uppercase" }}>
          Delete Company
        </button>
      </Section>

      {showDeleteModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 420, background: "#fff", borderRadius: 10, padding: 22 }}>
            <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 15, color: "#1A1614", marginBottom: 8 }}>Delete {client.business_name}?</div>
            <p style={{ fontSize: 12, color: "#8B7060", lineHeight: 1.5, marginBottom: 12 }}>
              This permanently deletes all data for <strong>{client.business_name}</strong> — calls, billing history, credits, phone number assignment, and the owner's login. This cannot be undone.
            </p>
            <p style={{ fontSize: 11, color: "#8B7060", marginBottom: 6 }}>Type the business name to confirm:</p>
            <input value={deleteInput} onChange={(e) => setDeleteInput(e.target.value)} style={{ ...inputCls, width: "100%", marginBottom: 14 }} />
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => { setShowDeleteModal(false); setDeleteInput(""); }}
                style={{ flex: 1, padding: "10px 14px", background: "#f7f2ec", color: "#4E4439", border: "1px solid #e8e2d8", borderRadius: 6, cursor: "pointer", fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 11, textTransform: "uppercase" }}>
                Cancel
              </button>
              <button onClick={handleDelete} disabled={deleteInput !== client.business_name || deleting}
                style={{ flex: 1, padding: "10px 14px", background: "#ef4444", color: "#fff", border: "none", borderRadius: 6, cursor: deleteInput === client.business_name ? "pointer" : "not-allowed", fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 11, textTransform: "uppercase", opacity: deleteInput === client.business_name ? 1 : 0.5 }}>
                {deleting ? "Deleting…" : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
