import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE } from "../config/apiBase";
import { supabase } from "../lib/supabase";

const GoogleIcon = () => <svg width="13" height="13" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>;

const DRAFT_KEY = "getstarted_draft";

// const Pr = "#8B6E3C";

/* ── Static data ── */
const PLANS = [
  { id:"starter",  name:"Starter",  price:"$120/mo", desc:"Perfect for solo practices",   available:true  },
  { id:"growth",   name:"Growth",   price:"$349/mo", desc:"For growing businesses",       available:false },
  { id:"premium",  name:"Premium",  price:"$699+/mo",desc:"Enterprise & agencies",        available:false },
];

const PERKS = [
  "No credit card required",
  "Full feature access for 14 days",
  "Cancel anytime, no penalties",
  "Setup in under 15 minutes",
  "Live onboarding support included",
];

const STEP_TITLES = [
  "Business Info",
  "Reception Setup",
  "Booking Details",
  "Plan & Billing",
  "Owner Info",
];

const STEP_SUBS = [
  "Tell us about your business",
  "Configure your AI receptionist",
  "What the AI should collect",
  "Choose your plan",
  "Create your account",
];

// Details the AI can ask a caller for when booking an appointment. Feeds
// client_settings.booking_info_fields — this is the reference list used to
// hand-build each client's Retell agent prompt (what to collect, in what
// order) since prompts aren't generated dynamically from this data.
const BOOKING_FIELD_OPTIONS = [
  { value: "Full Name", sub: "Who the appointment is for" },
  { value: "Phone Number", sub: "For confirmation & reminders" },
  { value: "Email Address", sub: "For confirmation & reminders" },
  { value: "Service / Reason for Visit", sub: "What they need done" },
  { value: "Preferred Date", sub: "" },
  { value: "Preferred Time", sub: "" },
  { value: "New or Returning Client", sub: "" },
  { value: "Insurance Provider", sub: "Healthcare businesses" },
  { value: "Special Notes / Requests", sub: "Allergies, accessibility, etc." },
];

/* ── Reusable form atoms ── */
const inputCls = "text-[12.5px] text-[#1A1614] bg-white border border-[#d4c8b8]/70 rounded-sm px-3 py-2 w-full focus:outline-none focus:border-[#8B6E3C] transition-colors placeholder:text-[#aaa8a5]";
const labelCls = "font-syne font-bold text-[9px] uppercase tracking-[.12em] text-[#4E4439]/55 mb-1 block";

const Inp = ({ label, type = "text", placeholder, required = false, value, onChange, disabled = false }) => (
  <div className="flex flex-col">
    <label className={labelCls}>{label}{required && <span className="text-[#8B6E3C] ml-0.5">*</span>}</label>
    <input type={type} placeholder={placeholder} required={required} value={value} onChange={onChange} disabled={disabled}
      className={inputCls + (disabled ? " bg-[#f7f2ec] text-[#8B7060] cursor-not-allowed" : "")} />
  </div>
);

const Sel = ({ label, options, required = false, value, onChange }) => (
  <div className="flex flex-col">
    <label className={labelCls}>{label}{required && <span className="text-[#8B6E3C] ml-0.5">*</span>}</label>
    <select required={required} value={value} onChange={onChange}
      className={inputCls + " cursor-pointer bg-white"}>
      <option value="">— Select —</option>
      {options.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
    </select>
  </div>
);

const Textarea = ({ label, placeholder, required = false, value, onChange }) => (
  <div className="flex flex-col">
    <label className={labelCls}>{label}{required && <span className="text-[#8B6E3C] ml-0.5">*</span>}</label>
    <textarea placeholder={placeholder} required={required} rows={3} value={value} onChange={onChange}
      className={inputCls + " resize-none leading-relaxed"} />
  </div>
);

const RadioGroup = ({ label, required, options, value, onChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className={labelCls}>
      {label}
      {required && <span className="text-[#8B6E3C] ml-0.5">*</span>}
    </label>

    <div className="flex flex-col gap-2">
      {options.map((opt) => (
        <label
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex items-center gap-2.5 px-3 py-2.5 border rounded-sm cursor-pointer transition-all ${
            value === opt.value
              ? "border-[#8B6E3C] bg-[#8B6E3C]/05"
              : "border-[#d4c8b8]/60 hover:border-[#8B6E3C]/40"
          }`}
        >
          <input
            type="radio"
            name={label}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="sr-only"
          />

          <div
            className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
              value === opt.value ? "border-[#8B6E3C]" : "border-[#d4c8b8]"
            }`}
          >
            {value === opt.value && (
              <div className="w-2 h-2 rounded-full bg-[#8B6E3C]" />
            )}
          </div>

          <div>
            <div className="font-syne font-semibold text-[12px] text-[#1A1614]">
              {opt.label}
            </div>

            {opt.sub && (
              <div className="text-[10px] text-[#8B7060] mt-0.5">
                {opt.sub}
              </div>
            )}
          </div>
        </label>
      ))}
    </div>
  </div>
);

const CheckboxGroup = ({ label, sub, options, value, onToggle }) => (
  <div className="flex flex-col gap-1.5">
    <label className={labelCls}>{label}</label>
    {sub && <p className="text-[10.5px] text-[#8B7060] -mt-1 mb-1">{sub}</p>}
    <div className="flex flex-col gap-2">
      {options.map((opt) => {
        const checked = value.includes(opt.value);
        return (
          <label key={opt.value} onClick={() => onToggle(opt.value)}
            className={`flex items-center gap-2.5 px-3 py-2.5 border rounded-sm cursor-pointer transition-all ${checked ? "border-[#8B6E3C] bg-[#8B6E3C]/05" : "border-[#d4c8b8]/60 hover:border-[#8B6E3C]/40"}`}>
            <div className={`w-4 h-4 rounded-sm border-2 flex-shrink-0 flex items-center justify-center transition-colors ${checked ? "border-[#8B6E3C] bg-[#8B6E3C]" : "border-[#d4c8b8]"}`}>
              {checked && <span className="material-symbols-outlined text-white text-[10px]" style={{ fontVariationSettings:"'FILL' 1" }}>check</span>}
            </div>
            <div>
              <div className="font-syne font-semibold text-[12px] text-[#1A1614]">{opt.value}</div>
              {opt.sub && <div className="text-[10px] text-[#8B7060] mt-0.5">{opt.sub}</div>}
            </div>
          </label>
        );
      })}
    </div>
  </div>
);

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DaysPicker = ({ label, sub, required = false, value, onToggle }) => (
  <div className="flex flex-col gap-1.5">
    <label className={labelCls}>{label}{required && <span className="text-[#8B6E3C] ml-0.5">*</span>}</label>
    {sub && <p className="text-[10.5px] text-[#8B7060] -mt-1 mb-1">{sub}</p>}
    <div className="flex flex-wrap gap-1.5">
      {DAYS_OF_WEEK.map(day => {
        const checked = value.includes(day);
        return (
          <button
            type="button"
            key={day}
            onClick={() => onToggle(day)}
            className={`px-2.5 py-1.5 border rounded-sm font-syne font-semibold text-[10.5px] transition-all cursor-pointer ${
              checked
                ? "border-[#8B6E3C] bg-[#8B6E3C] text-white"
                : "border-[#d4c8b8]/60 text-[#4E4439] hover:border-[#8B6E3C]/40"
            }`}
          >
            {day.slice(0, 3)}
          </button>
        );
      })}
    </div>
  </div>
);

const SectionDivider = ({ number, title }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="w-5 h-5 rounded-full bg-[#8B6E3C] flex items-center justify-center flex-shrink-0">
      <span className="text-white font-syne font-bold text-[9px]">{number}</span>
    </div>
    <span className="font-syne font-bold text-[10px] uppercase tracking-[.14em] text-[#8B6E3C]">{title}</span>
    <div className="flex-1 h-px bg-[#d4c8b8]/60" />
  </div>
);

const NextBtn = ({ children, disabled }) => (
  <motion.button whileHover={{ scale: disabled ? 1 : 1.02 }} whileTap={{ scale: disabled ? 1 : .97 }}
    type="submit" disabled={disabled}
    className={`w-full py-3 font-syne font-bold text-[11px] uppercase tracking-[.12em] rounded-sm transition-colors mt-2 ${disabled ? "bg-[#c4a97a] text-white cursor-not-allowed" : "bg-[#8B6E3C] text-white hover:bg-[#6b5228] cursor-pointer"}`}>
    {children}
  </motion.button>
);

/* ── Step 1: Business Info ── */
const SUPPORTED_COUNTRIES = ["United States", "Canada"];

// Loose "looks like a domain" check — matches the backend's acceptance in
// register_business.js so a value that passes here won't get rejected
// server-side. Bare domains ("apexhealth.com") are fine, no protocol required.
const WEBSITE_URL_RE = /^(https?:\/\/)?[a-z0-9-]+(\.[a-z0-9-]+)+(\/\S*)?$/i;

function Step1({ data, setData, onNext }) {
  const set = k => e => setData(p => ({ ...p, [k]: e.target.value }));
  const countryBlocked = data.country && !SUPPORTED_COUNTRIES.includes(data.country);
  const websiteUrlValid = WEBSITE_URL_RE.test(data.websiteUrl.trim());
  const valid = data.businessName && data.businessPhone && data.businessEmail && data.country && !countryBlocked && websiteUrlValid;
  return (
    <form onSubmit={e => { e.preventDefault(); if (valid) onNext(); }} className="flex flex-col gap-3.5">
      <SectionDivider number="1" title="Business Info" />
      <Inp label="Business Name" placeholder="Apex Health Clinic" required value={data.businessName} onChange={set("businessName")} />
      <Sel label="Business Type" required value={data.businessType} onChange={set("businessType")}
        options={["Salon","Clinic / Healthcare","Legal Practice","Real Estate Agency","Financial Services","Restaurant","Retail Store","Home Services","Other"]} />
      <Sel label="Country" required value={data.country} onChange={set("country")}
        options={[...SUPPORTED_COUNTRIES, "Other"]} />
      {countryBlocked && (
        <p className="text-[10.5px] text-red-600 -mt-2 leading-relaxed">
          Letconvo is currently only available to businesses in the United States and Canada. We'll let you know when we expand.
        </p>
      )}
      <Inp label="Business Phone Number" type="tel" placeholder="+1 (415) 555-0132" required value={data.businessPhone} onChange={set("businessPhone")} />
      <Inp label="Business Email" type="email" placeholder="info@apexhealth.com" required value={data.businessEmail} onChange={set("businessEmail")} />
      <div className="flex flex-col">
        <Inp label="Website URL" placeholder="apexhealth.com" required value={data.websiteUrl} onChange={set("websiteUrl")} />
        <p className="text-[10.5px] text-[#8B7060] mt-1">We use this to help build out what your AI receptionist knows about your business.</p>
        {data.websiteUrl && !websiteUrlValid && (
          <p className="text-[10.5px] text-red-600 mt-1">Enter a valid website, e.g. apexhealth.com</p>
        )}
      </div>
      <Inp label="Business Address (optional)" placeholder="123 Main St, Austin, TX" value={data.businessAddress} onChange={set("businessAddress")} />
      <NextBtn disabled={!valid}>Continue →</NextBtn>
    </form>
  );
}

/* ── Step 2: Reception Setup ── */
function Step2({ data, setData, onNext }) {
  const set = k => e => setData(p => ({ ...p, [k]: e.target.value }));
  const setRadio = k => v => setData(p => ({ ...p, [k]: v }));
  const toggleWorkingDay = (day) => setData(p => ({
    ...p,
    workingDays: p.workingDays.includes(day)
      ? p.workingDays.filter(d => d !== day)
      : [...p.workingDays, day]
  }));
  const valid = data.receptionistMode && data.greetingMessage && data.openTime && data.closeTime && data.workingDays.length > 0;
  return (
    <form onSubmit={e => { e.preventDefault(); if (valid) onNext(); }} className="flex flex-col gap-4">
      <SectionDivider number="2" title="Reception Setup" />
      <RadioGroup
        label="Receptionist Mode"
        required
        value={data.receptionistMode}
        onChange={setRadio("receptionistMode")}
        options={[
          { value:"live",     label:"Live Receptionist",     sub:"AI answers every incoming call in real-time" },
          { value:"callback", label:"Missed Call Callback",  sub:"AI calls back missed calls automatically"    },
        ]}
      />
      <Textarea
        label="Tell us about your business "
        required
        placeholder={"e.g. \"We are a leading healthcare provider dedicated to delivering exceptional care.\""}
        value={data.greetingMessage}
        onChange={set("greetingMessage")}
      />
      <div>
        <label className={labelCls}>Working Hours<span className="text-[#8B6E3C] ml-0.5">*</span></label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-syne text-[9px] uppercase tracking-[.08em] text-[#8B7060] mb-1 block">Open Time</label>
            <input type="time" required value={data.openTime} onChange={set("openTime")}
              className={inputCls} />
          </div>
          <div>
            <label className="font-syne text-[9px] uppercase tracking-[.08em] text-[#8B7060] mb-1 block">Close Time</label>
            <input type="time" required value={data.closeTime} onChange={set("closeTime")}
              className={inputCls} />
          </div>
        </div>
        <p className="text-[10.5px] text-[#8B7060] mt-1.5">AI is active 24/7 — hours set the after-hours greeting mode.</p>
      </div>
      <DaysPicker
        label="Working Days"
        required
        sub="Days your AI receptionist should treat as open — it uses this to answer availability questions instead of guessing."
        value={data.workingDays}
        onToggle={toggleWorkingDay}
      />
      <NextBtn disabled={!valid}>Continue →</NextBtn>
    </form>
  );
}

/* ── Step 3: Booking Details ── */
function Step3Booking({ data, setData, onNext }) {
  const set = k => e => setData(p => ({ ...p, [k]: e.target.value }));
  const toggleField = (fieldValue) => setData(p => ({
    ...p,
    bookingFields: p.bookingFields.includes(fieldValue)
      ? p.bookingFields.filter(f => f !== fieldValue)
      : [...p.bookingFields, fieldValue]
  }));
  const valid = data.bookingFields.length > 0;
  return (
    <form onSubmit={e => { e.preventDefault(); if (valid) onNext(); }} className="flex flex-col gap-4">
      <SectionDivider number="3" title="Booking Details" />
      <p className="text-[11.5px] text-[#4E4439]/65 -mt-2 leading-relaxed">
        This tells us what your AI receptionist should ask a caller for before booking their appointment — we use it to build your Retell AI prompt.
      </p>
      <CheckboxGroup
        label="Collect from every caller"
        sub="Pick everything your AI should ask for before confirming a booking."
        options={BOOKING_FIELD_OPTIONS}
        value={data.bookingFields}
        onToggle={toggleField}
      />
      <Textarea
        label="Services You Offer (optional)"
        placeholder={"e.g. \"Haircut, Coloring, Consultation, Teeth Cleaning, Root Canal\""}
        value={data.servicesOffered}
        onChange={set("servicesOffered")}
      />
      <Textarea
        label="Booking Policies & Notes (optional)"
        placeholder={"e.g. \"Appointments are 30 minutes. 24-hour cancellation notice required. New clients need a $20 deposit.\""}
        value={data.bookingPolicies}
        onChange={set("bookingPolicies")}
      />
      <NextBtn disabled={!valid}>Continue →</NextBtn>
    </form>
  );
}

/* ── Step 4: Plan & Billing ── */
function Step4Plan({ data, setData, onNext }) {
  const valid = !!data.plan;
  return (
    <form onSubmit={e => { e.preventDefault(); if (valid) onNext(); }} className="flex flex-col gap-4">
      <SectionDivider number="4" title="Plan & Billing" />
      <div>
        <label className={labelCls}>Choose Your Plan<span className="text-[#8B6E3C] ml-0.5">*</span></label>
        <div className="flex flex-col gap-2.5 mt-1">
          {PLANS.map(p => (
            <motion.label
              key={p.id}
              whileHover={p.available ? { x: 2 } : {}}
              title={p.available ? undefined : "This plan is still under build and isn't available yet"}
              className={`flex items-center gap-3 px-4 py-3 border rounded-sm transition-all ${
                !p.available
                  ? "cursor-not-allowed opacity-55 border-[#d4c8b8]/40 bg-[#f7f2ec]/60"
                  : data.plan === p.id
                    ? "cursor-pointer border-[#8B6E3C] bg-[#8B6E3C]/05"
                    : "cursor-pointer border-[#d4c8b8]/60 hover:border-[#8B6E3C]/40"
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${data.plan === p.id ? "border-[#8B6E3C]" : "border-[#d4c8b8]"}`}>
                {data.plan === p.id && <div className="w-2 h-2 rounded-full bg-[#8B6E3C]" />}
              </div>
              <input type="radio" name="plan" value={p.id} checked={data.plan === p.id} disabled={!p.available}
                onChange={() => p.available && setData(d => ({ ...d, plan: p.id }))} className="sr-only" />
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <div className="font-syne font-bold text-[12px] text-[#1A1614]">{p.name}</div>
                  {!p.available && (
                    <span className="font-syne font-bold text-[8px] uppercase tracking-[.08em] text-[#8B6E3C] bg-[#8B6E3C]/10 border border-[#8B6E3C]/25 rounded-sm px-1.5 py-0.5">
                      Coming Soon
                    </span>
                  )}
                </div>
                <div className="text-[10.5px] text-[#8B7060] mt-0.5">
                  {p.available ? p.desc : "Still under build — not available yet"}
                </div>
              </div>
              <div className="font-syne font-black text-[13px] text-[#8B6E3C] flex-shrink-0">{p.available ? p.price : "—"}</div>
            </motion.label>
          ))}
        </div>
      </div>

      {/* Plan features summary */}
      {data.plan && (
        <motion.div initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
          className="bg-[#fdf9f5] border border-[#d4c8b8]/60 rounded-sm p-3">
          <div className="font-syne font-bold text-[9px] uppercase tracking-[.12em] text-[#8B6E3C] mb-2">What's included</div>
          {data.plan === "starter" && ["400 minutes/month","Basic call handling","SMS follow-up","Digital call logs"].map(f=>(
            <div key={f} className="flex items-center gap-2 text-[11.5px] text-[#4E4439] mb-1"><span className="material-symbols-outlined text-[#8B6E3C] text-[12px]">check_circle</span>{f}</div>
          ))}
          {data.plan === "growth" && ["334 minutes/month","Calendar booking","Full CRM integration","Advanced analytics"].map(f=>(
            <div key={f} className="flex items-center gap-2 text-[11.5px] text-[#4E4439] mb-1"><span className="material-symbols-outlined text-[#8B6E3C] text-[12px]">check_circle</span>{f}</div>
          ))}
          {data.plan === "premium" && ["1,000 minutes/month","Multi-location","Custom AI voice","White-label dashboard"].map(f=>(
            <div key={f} className="flex items-center gap-2 text-[11.5px] text-[#4E4439] mb-1"><span className="material-symbols-outlined text-[#8B6E3C] text-[12px]">check_circle</span>{f}</div>
          ))}
          <p className="text-[10px] text-[#8B7060] mt-1.5">450 credits free trial · No credit card required</p>
        </motion.div>
      )}
      <NextBtn disabled={!valid}>Continue →</NextBtn>
    </form>
  );
}

/* ── Step 5: Owner Info ── */
function Step5Owner({ data, setData, onNext, handleSubmit, oauthSession, onGoogleSignup }) {
  const set = k => e => setData(p => ({ ...p, [k]: e.target.value }));
  const [showPw, setShowPw] = useState(false);
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const valid = oauthSession
    ? !!(data.ownerName && data.ownerEmail && agree)
    : !!(data.ownerName && data.ownerEmail && data.password && agree);
  return (
    <form
  onSubmit={async (e) => {
    e.preventDefault();

    if (!valid || submitting) return;

    setSubmitting(true);
    try {
      const result = await handleSubmit();

      if (result?.success) {
        onNext();
      }
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      alert("Registration failed");
    } finally {
      setSubmitting(false);
    }
  }}
  className="flex flex-col gap-3.5"
>
      <SectionDivider number="5" title="Owner Info" />

      {!oauthSession && (
        <>
          <motion.button type="button" onClick={onGoogleSignup} whileHover={{ scale: 1.02 }} whileTap={{ scale: .98 }}
            className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#d4c8b8]/70 rounded-sm font-syne font-semibold text-[11px] text-[#1A1614] hover:border-[#8B6E3C]/40 transition-colors bg-white">
            <GoogleIcon /> Continue with Google
          </motion.button>
          <div className="flex items-center gap-3 text-[10px] text-[#4E4439]/40">
            <div className="flex-1 h-px bg-[#d4c8b8]/60" /><span>or create with email</span><div className="flex-1 h-px bg-[#d4c8b8]/60" />
          </div>
        </>
      )}

      {oauthSession && (
        <div className="flex items-center gap-2.5 px-3 py-2.5 border border-[#8B6E3C]/30 bg-[#8B6E3C]/05 rounded-sm">
          <span className="material-symbols-outlined text-[#8B6E3C] text-[16px]">check_circle</span>
          <span className="text-[11.5px] text-[#4E4439]">Connected as <strong>{oauthSession.user.email}</strong> via Google</span>
        </div>
      )}

      <Inp label="Owner Name" placeholder="Sarah Adeyemi" required value={data.ownerName} onChange={set("ownerName")} />
      <Inp label="Owner Email" type="email" placeholder="sarah@apexhealth.com" required value={data.ownerEmail} onChange={set("ownerEmail")} disabled={!!oauthSession} />
      {!oauthSession && (
        <div className="flex flex-col">
          <label className={labelCls}>Password<span className="text-[#8B6E3C] ml-0.5">*</span></label>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              placeholder="Min. 8 characters"
              required
              value={data.password}
              onChange={set("password")}
              className={inputCls + " pr-10"}
            />
            <button type="button" onClick={() => setShowPw(!showPw)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8B7060] hover:text-[#8B6E3C] transition-colors">
              <span className="material-symbols-outlined text-[16px]">{showPw ? "visibility_off" : "visibility"}</span>
            </button>
          </div>
          {data.password && (
            <div className="flex gap-1 mt-1.5">
              {["Length","Uppercase","Number"].map((req, i) => {
                const ok = i === 0 ? data.password.length >= 8 : i === 1 ? /[A-Z]/.test(data.password) : /\d/.test(data.password);
                return (
                  <div key={req} className={`flex items-center gap-1 text-[9.5px] ${ok ? "text-green-600" : "text-[#c4a97a]"}`}>
                    <span className="material-symbols-outlined text-[10px]">{ok ? "check_circle" : "radio_button_unchecked"}</span>
                    {req}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      {/* T&C */}
      <label className="flex items-start gap-2.5 cursor-pointer mt-0.5">
        <div
          onClick={() => setAgree(!agree)}
          className={`w-4 h-4 rounded-sm border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors cursor-pointer ${agree ? "border-[#8B6E3C] bg-[#8B6E3C]" : "border-[#d4c8b8]"}`}
        >
          {agree && <span className="material-symbols-outlined text-white text-[10px]" style={{ fontVariationSettings:"'FILL' 1" }}>check</span>}
        </div>
        <span className="text-[11.5px] text-[#4E4439]/70 leading-relaxed">
          I agree to the <button type="button" className="text-[#8B6E3C] font-semibold hover:underline">Terms of Service</button> and <button type="button" className="text-[#8B6E3C] font-semibold hover:underline">Privacy Policy</button>.
        </span>
      </label>
      <NextBtn disabled={!valid || submitting}>{submitting ? "Creating Account…" : "Create Account →"}</NextBtn>
    </form>
  );
}

/* ── Step 5: Success ── */
function StepSuccess({ data, onDone }) {
  return (
    <motion.div initial={{ scale:.92, opacity:0 }} animate={{ scale:1, opacity:1 }}
      transition={{ duration:.45, ease:[.16,1,.3,1] }} className="text-center py-4">
      <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:.15, duration:.5, ease:[.16,1,.3,1] }}
        className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-4">
        <span className="material-symbols-outlined text-green-500 text-[28px]" style={{ fontVariationSettings:"'FILL' 1" }}>check_circle</span>
      </motion.div>
      <h3 className="font-syne font-black text-[17px] uppercase tracking-tight text-[#1A1614] mb-1.5">You're All Set!</h3>
      <p className="text-[12.5px] text-[#4E4439]/65 leading-relaxed mb-1 max-w-[240px] mx-auto">
        Welcome, <strong>{data.ownerName || "there"}</strong>. <strong>{data.businessName}</strong> is ready to go.
      </p>
      {data.password && <p className="text-[11.5px] text-[#8B6E3C] mb-6">Check your email to verify your account.</p>}
      <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:.97 }} onClick={onDone}
        className="bg-[#8B6E3C] text-white font-syne font-bold text-[11px] uppercase tracking-[.12em] px-8 py-3 rounded-sm hover:bg-[#6b5228] transition-colors">
        Go to Dashboard →
      </motion.button>
    </motion.div>
  );
}

/* ── Main export ── */
export default function GetStartedPage({ setPage }) {
  const [step, setStep] = useState(1);
  const TOTAL = 5;

  const [formData, setFormData] = useState({
    /* Section 1 */
    businessName: "", businessType: "", country: "", businessPhone: "", businessEmail: "", businessAddress: "", websiteUrl: "",
    /* Section 2 */
    receptionistMode: "", greetingMessage: "", openTime: "08:00", closeTime: "18:00",
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    /* Section 3 */
    bookingFields: ["Full Name", "Phone Number"], servicesOffered: "", bookingPolicies: "",
    /* Section 4 */
    plan: "starter",
    /* Section 5 */
    ownerName: "", ownerEmail: "", password: "",
  });

  const [oauthSession, setOauthSession] = useState(null);

  // Resumes the wizard after a Google OAuth redirect: restores whatever the
  // user had filled in before leaving, pre-fills owner name/email from the
  // Google profile, and jumps back to the owner-info step.
  useEffect(() => {
    if (localStorage.getItem("oauth_intent") !== "signup") return;

    supabase.auth.getSession().then(({ data }) => {
      const session = data?.session;
      if (!session) return;

      localStorage.removeItem("oauth_intent");

      const draftRaw = localStorage.getItem(DRAFT_KEY);
      const draft = draftRaw ? JSON.parse(draftRaw) : {};
      localStorage.removeItem(DRAFT_KEY);

      setFormData(p => ({
        ...p,
        ...draft,
        ownerName: draft.ownerName || session.user.user_metadata?.full_name || session.user.user_metadata?.name || "",
        ownerEmail: session.user.email || "",
      }));
      setOauthSession(session);

      // Only skip ahead to Owner Info if there's an actual draft to resume
      // (i.e. this is a real mid-wizard OAuth redirect). Arriving here with
      // no draft — e.g. from the dashboard's "Complete Business Setup"
      // prompt — means business info was never collected, so start at step 1.
      if (draft.businessName) {
        setStep(5);
      }
    });
  }, []);

  const handleGoogleSignup = async () => {
    localStorage.setItem("oauth_intent", "signup");
    localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/#getstarted" }
    });

    if (error) {
      localStorage.removeItem("oauth_intent");
      localStorage.removeItem(DRAFT_KEY);
      alert(error.message);
    }
  };

  const handleSubmit = async () => {
  try {
    const { password, ...rest } = formData;
    const payload = oauthSession ? rest : formData;

    const res = await axios.post(
      `${API_BASE}/register-business`,
      payload,
      oauthSession ? { headers: { Authorization: `Bearer ${oauthSession.access_token}` } } : undefined
    );

    console.log("✅ Registered:", res.data);

    // Email/password signups create the Supabase session entirely
    // server-side, so the browser's own Supabase client doesn't know about
    // it yet. Without this, DashboardPage's supabase.auth.getSession() call
    // on mount falls back to whatever session was already active in this
    // browser (e.g. a different logged-in account) and overwrites the
    // correct token with it. Google sign-in already has a client-side
    // session from supabase.auth.signInWithOAuth, so skip this there.
    if (!oauthSession && res.data.refresh_token) {
      await supabase.auth.setSession({
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token
      });
    }

    localStorage.setItem("token", res.data.access_token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return { success: true };
  } catch (err) {
    console.log("❌ Registration error:", err.response?.data || err.message);
    alert(err.response?.data?.error || "Registration failed");
    return { success: false };
  }
};

  const next = () => setStep(s => Math.min(s + 1, TOTAL + 1));
  const back = () => setStep(s => Math.max(s - 1, 1));

  return (
    <main style={{ position:"relative", zIndex:10 }}>
      <div className="min-h-screen flex items-center justify-center px-4 pt-[52px] pb-10">
        <div className="absolute inset-0 bg-black/52" />

        <motion.div initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:.6, ease:[.16,1,.3,1] }}
          className="relative z-10 w-full bg-white border border-[#d4c8b8]/60 rounded-sm shadow-[0_24px_60px_rgba(0,0,0,.22)] overflow-hidden grid grid-cols-1 md:grid-cols-[300px_1fr]"
          style={{ maxWidth:820 }}
        >
          {/* ── LEFT PANEL ── */}
          <div className="p-8 border-r border-[#d4c8b8]/40 flex flex-col"
            style={{ background:"linear-gradient(150deg,rgba(255,247,237,.98),rgba(240,248,255,.6))" }}>

            <div className="font-syne font-black text-[#8B6E3C] tracking-[.1em] uppercase text-[13px] mb-1">Letconvo AI</div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#f7f2ec] border border-[#d4c8b8]/60 text-[9px] font-syne font-bold uppercase tracking-[.1em] text-[#8B6E3C] mb-5 rounded-sm w-fit">
              🎉 450 credits free trial
            </span>

            <h2 className="font-syne font-black text-[16px] uppercase tracking-tight text-[#1A1614] leading-tight mb-2">
              Start Capturing Every Lead Today
            </h2>
            <p className="text-[12px] text-[#4E4439]/65 leading-relaxed mb-3">
              Join thousands of businesses that never miss a call. Setup in under 15 minutes, no contract required.
            </p>
            <p className="text-[10.5px] text-[#8B7060] leading-relaxed mb-6 flex items-start gap-1.5">
              <span className="material-symbols-outlined text-[12px] flex-shrink-0 mt-[1px]">info</span>
              Currently available to <strong>USA and Canada businesses</strong> only.
            </p>

            {/* Perks */}
            <div className="flex flex-col gap-2.5 mb-8">
              {PERKS.map(p => (
                <div key={p} className="flex items-center gap-2 text-[12px] text-[#4E4439]/75">
                  <span className="material-symbols-outlined text-[#8B6E3C] text-[13px] flex-shrink-0">check_circle</span>
                  {p}
                </div>
              ))}
            </div>

            {/* Step nav list */}
            <div className="mt-auto">
              <div className="font-syne font-bold text-[9px] uppercase tracking-[.12em] text-[#4E4439]/50 mb-3">Your Progress</div>
              {STEP_TITLES.map((title, i) => {
                const n = i + 1;
                const done = step > n;
                const active = step === n;
                return (
                  <div key={title} className="flex items-center gap-2.5 mb-2.5">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-syne font-black transition-all ${done ? "bg-[#8B6E3C] text-white" : active ? "border-2 border-[#8B6E3C] text-[#8B6E3C]" : "border border-[#d4c8b8] text-[#c4a97a]"}`}>
                      {done ? <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings:"'FILL' 1" }}>check</span> : n}
                    </div>
                    <div>
                      <div className={`font-syne font-semibold text-[11px] uppercase tracking-[.06em] ${active ? "text-[#8B6E3C]" : done ? "text-[#1A1614]" : "text-[#4E4439]/40"}`}>{title}</div>
                      <div className="text-[9.5px] text-[#8B7060]">{STEP_SUBS[i]}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="p-8 bg-white overflow-y-auto" style={{ maxHeight:"90vh" }}>
            {/* Progress bar */}
            <div className="flex gap-1.5 mb-6">
              {Array.from({ length: TOTAL }, (_, i) => (
                <div key={i} className="flex-1 h-1 rounded-full transition-all duration-500"
                  style={{ background: step > i ? "#8B6E3C" : "#e8e2d8" }} />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={step}
                initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-16 }}
                transition={{ duration:.25, ease:[.16,1,.3,1] }}
              >
                {step === 1 && <Step1 data={formData} setData={setFormData} onNext={next} />}
                {step === 2 && <Step2 data={formData} setData={setFormData} onNext={next} />}
                {step === 3 && <Step3Booking data={formData} setData={setFormData} onNext={next} />}
                {step === 4 && <Step4Plan data={formData} setData={setFormData} onNext={next} />}
                {step === 5 && <Step5Owner data={formData} setData={setFormData} onNext={next} handleSubmit={handleSubmit} oauthSession={oauthSession} onGoogleSignup={handleGoogleSignup}/>}
                {step === 6 && <StepSuccess data={formData} onDone={() => setPage("dashboard")} />}
              </motion.div>
            </AnimatePresence>

            {/* Back + sign in */}
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#f0ebe4]">
              {step > 1 && step <= TOTAL ? (
                <button onClick={back}
                  className="flex items-center gap-1 text-[11px] font-syne font-semibold text-[#4E4439]/55 hover:text-[#8B6E3C] transition-colors">
                  <span className="material-symbols-outlined text-[13px]">arrow_back</span> Back
                </button>
              ) : <div />}
              <p className="text-[11px] text-[#4E4439]/50">
                Already have an account?{" "}
                <button onClick={() => setPage("login")} className="text-[#8B6E3C] font-semibold hover:underline">Sign in →</button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
