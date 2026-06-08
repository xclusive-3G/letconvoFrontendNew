import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
// import { supabase } from '../lib/supabase';

// const Pr = "#8B6E3C";

/* ── Static data ── */
const PLANS = [
  { id:"starter",  name:"Starter",  price:"$149/mo", desc:"Perfect for solo practices" },
  { id:"growth",   name:"Growth",   price:"$349/mo", desc:"For growing businesses"     },
  { id:"premium",  name:"Premium",  price:"$699+/mo",desc:"Enterprise & agencies"      },
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
  "Plan & Billing",
  "Owner Info",
];

const STEP_SUBS = [
  "Tell us about your business",
  "Configure your AI receptionist",
  "Choose your plan",
  "Create your account",
];

/* ── Reusable form atoms ── */
const inputCls = "text-[12.5px] text-[#1A1614] bg-white border border-[#d4c8b8]/70 rounded-sm px-3 py-2 w-full focus:outline-none focus:border-[#8B6E3C] transition-colors placeholder:text-[#aaa8a5]";
const labelCls = "font-syne font-bold text-[9px] uppercase tracking-[.12em] text-[#4E4439]/55 mb-1 block";

const Inp = ({ label, type = "text", placeholder, required = false, value, onChange }) => (
  <div className="flex flex-col">
    <label className={labelCls}>{label}{required && <span className="text-[#8B6E3C] ml-0.5">*</span>}</label>
    <input type={type} placeholder={placeholder} required={required} value={value} onChange={onChange}
      className={inputCls} />
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
function Step1({ data, setData, onNext }) {
  const set = k => e => setData(p => ({ ...p, [k]: e.target.value }));
  const valid = data.businessName && data.businessPhone && data.businessEmail;
  return (
    <form onSubmit={e => { e.preventDefault(); if (valid) onNext(); }} className="flex flex-col gap-3.5">
      <SectionDivider number="1" title="Business Info" />
      <Inp label="Business Name" placeholder="Apex Health Clinic" required value={data.businessName} onChange={set("businessName")} />
      <Sel label="Business Type" required value={data.businessType} onChange={set("businessType")}
        options={["Salon","Clinic / Healthcare","Legal Practice","Real Estate Agency","Financial Services","Restaurant","Retail Store","Home Services","Other"]} />
      <Inp label="Business Phone Number" type="tel" placeholder="+234 803 456 7890" required value={data.businessPhone} onChange={set("businessPhone")} />
      <Inp label="Business Email" type="email" placeholder="info@apexhealth.com" required value={data.businessEmail} onChange={set("businessEmail")} />
      <Inp label="Business Address (optional)" placeholder="123 Victoria Island, Lagos" value={data.businessAddress} onChange={set("businessAddress")} />
      <NextBtn disabled={!valid}>Continue →</NextBtn>
    </form>
  );
}

/* ── Step 2: Reception Setup ── */
function Step2({ data, setData, onNext }) {
  const set = k => e => setData(p => ({ ...p, [k]: e.target.value }));
  const setRadio = k => v => setData(p => ({ ...p, [k]: v }));
  const valid = data.receptionistMode && data.greetingMessage;
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
        label="Greeting Message"
        required
        placeholder={"e.g. \"Welcome to Elite Fade, you've reached our automated receptionist. How can I help you?\""}
        value={data.greetingMessage}
        onChange={set("greetingMessage")}
      />
      <div>
        <label className={labelCls}>Working Hours</label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-syne text-[9px] uppercase tracking-[.08em] text-[#8B7060] mb-1 block">Open Time</label>
            <input type="time" value={data.openTime} onChange={set("openTime")}
              className={inputCls} defaultValue="08:00" />
          </div>
          <div>
            <label className="font-syne text-[9px] uppercase tracking-[.08em] text-[#8B7060] mb-1 block">Close Time</label>
            <input type="time" value={data.closeTime} onChange={set("closeTime")}
              className={inputCls} defaultValue="18:00" />
          </div>
        </div>
        <p className="text-[10.5px] text-[#8B7060] mt-1.5">AI is active 24/7 — hours set the after-hours greeting mode.</p>
      </div>
      <NextBtn disabled={!valid}>Continue →</NextBtn>
    </form>
  );
}

/* ── Step 3: Plan & Billing ── */
function Step3({ data, setData, onNext }) {
  const valid = !!data.plan;
  return (
    <form onSubmit={e => { e.preventDefault(); if (valid) onNext(); }} className="flex flex-col gap-4">
      <SectionDivider number="3" title="Plan & Billing" />
      <div>
        <label className={labelCls}>Choose Your Plan<span className="text-[#8B6E3C] ml-0.5">*</span></label>
        <div className="flex flex-col gap-2.5 mt-1">
          {PLANS.map(p => (
            <motion.label
              key={p.id}
              whileHover={{ x: 2 }}
              className={`flex items-center gap-3 px-4 py-3 border rounded-sm cursor-pointer transition-all ${data.plan === p.id ? "border-[#8B6E3C] bg-[#8B6E3C]/05" : "border-[#d4c8b8]/60 hover:border-[#8B6E3C]/40"}`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${data.plan === p.id ? "border-[#8B6E3C]" : "border-[#d4c8b8]"}`}>
                {data.plan === p.id && <div className="w-2 h-2 rounded-full bg-[#8B6E3C]" />}
              </div>
              <input type="radio" name="plan" value={p.id} checked={data.plan === p.id}
                onChange={() => setData(d => ({ ...d, plan: p.id }))} className="sr-only" />
              <div className="flex-1">
                <div className="font-syne font-bold text-[12px] text-[#1A1614]">{p.name}</div>
                <div className="text-[10.5px] text-[#8B7060] mt-0.5">{p.desc}</div>
              </div>
              <div className="font-syne font-black text-[13px] text-[#8B6E3C] flex-shrink-0">{p.price}</div>
            </motion.label>
          ))}
        </div>
      </div>

      {/* Plan features summary */}
      {data.plan && (
        <motion.div initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
          className="bg-[#fdf9f5] border border-[#d4c8b8]/60 rounded-sm p-3">
          <div className="font-syne font-bold text-[9px] uppercase tracking-[.12em] text-[#8B6E3C] mb-2">What's included</div>
          {data.plan === "starter" && ["300 minutes/month","Basic call handling","SMS follow-up","Digital call logs"].map(f=>(
            <div key={f} className="flex items-center gap-2 text-[11.5px] text-[#4E4439] mb-1"><span className="material-symbols-outlined text-[#8B6E3C] text-[12px]">check_circle</span>{f}</div>
          ))}
          {data.plan === "growth" && ["1,000 minutes/month","Calendar booking","Full CRM integration","Advanced analytics"].map(f=>(
            <div key={f} className="flex items-center gap-2 text-[11.5px] text-[#4E4439] mb-1"><span className="material-symbols-outlined text-[#8B6E3C] text-[12px]">check_circle</span>{f}</div>
          ))}
          {data.plan === "premium" && ["3,000+ minutes/month","Multi-location","Custom AI voice","White-label dashboard"].map(f=>(
            <div key={f} className="flex items-center gap-2 text-[11.5px] text-[#4E4439] mb-1"><span className="material-symbols-outlined text-[#8B6E3C] text-[12px]">check_circle</span>{f}</div>
          ))}
          <p className="text-[10px] text-[#8B7060] mt-1.5">14-day free trial · No credit card required</p>
        </motion.div>
      )}
      <NextBtn disabled={!valid}>Continue →</NextBtn>
    </form>
  );
}

/* ── Step 4: Owner Info ── */
function Step4({ data, setData, onNext, handleSubmit }) {
  const set = k => e => setData(p => ({ ...p, [k]: e.target.value }));
  const [showPw, setShowPw] = useState(false);
  const [agree, setAgree] = useState(false);
  const valid = data.ownerName && data.ownerEmail && data.password && agree;
  return (
    <form
  onSubmit={async (e) => {
    e.preventDefault();

    if (!valid) return;

    try {
      const result = await handleSubmit();

      if (result?.success) {
        onNext();
      }
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      alert("Registration failed");
    }
  }}
  className="flex flex-col gap-3.5"
>
      <SectionDivider number="4" title="Owner Info" />
      <Inp label="Owner Name" placeholder="Sarah Adeyemi" required value={data.ownerName} onChange={set("ownerName")} />
      <Inp label="Owner Email" type="email" placeholder="sarah@apexhealth.com" required value={data.ownerEmail} onChange={set("ownerEmail")} />
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
      <NextBtn disabled={!valid}>Create Account →</NextBtn>
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
      <p className="text-[11.5px] text-[#8B6E3C] mb-6">Check your email to verify your account.</p>
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
  const TOTAL = 4;

  const [formData, setFormData] = useState({
    /* Section 1 */
    businessName: "", businessType: "", businessPhone: "", businessEmail: "", businessAddress: "",
    /* Section 2 */
    receptionistMode: "", greetingMessage: "", openTime: "08:00", closeTime: "18:00",
    /* Section 3 */
    plan: "growth",
    /* Section 4 */
    ownerName: "", ownerEmail: "", password: "",
  });



  const handleSubmit = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/register-business",
      formData
    );

    console.log("✅ Registered:", res.data);

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

            <div className="font-syne font-black text-[#8B6E3C] tracking-[.1em] uppercase text-[13px] mb-1">Luminous AI</div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#f7f2ec] border border-[#d4c8b8]/60 text-[9px] font-syne font-bold uppercase tracking-[.1em] text-[#8B6E3C] mb-5 rounded-sm w-fit">
              🎉 14-day free trial
            </span>

            <h2 className="font-syne font-black text-[16px] uppercase tracking-tight text-[#1A1614] leading-tight mb-2">
              Start Capturing Every Lead Today
            </h2>
            <p className="text-[12px] text-[#4E4439]/65 leading-relaxed mb-6">
              Join thousands of businesses that never miss a call. Setup in under 15 minutes, no contract required.
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
                {step === 3 && <Step3 data={formData} setData={setFormData} onNext={next} />}
                {step === 4 && <Step4 data={formData} setData={setFormData} onNext={next} handleSubmit={handleSubmit}/>}
                {step === 5 && <StepSuccess data={formData} onDone={() => setPage("dashboard")} />}
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
