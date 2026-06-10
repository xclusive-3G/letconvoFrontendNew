import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

const GoogleIcon = () => <svg width="13" height="13" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>;
const GHIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>;



export default function LoginPage({ setPage }) {
  const [showPw, setShowPw] = useState(false);
  const [done, setDone] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.log("❌ Login error:", error.message);
      alert(error.message);
      return;
    }

    setDone(true);

    localStorage.setItem("token", data.session.access_token);
    localStorage.setItem("user", JSON.stringify(data.user));

    console.log("✅ Logged in:", data.user);

    setPage ? setPage("dashboard") : (window.location.href = "/dashboard");
  };
  return (
    <main style={{ position: "relative", zIndex: 10 }}>
      <div className="min-h-screen flex items-center justify-center px-5 pt-[52px] pb-8">
        <div className="absolute inset-0 bg-black/52" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, ease: [.16, 1, .3, 1] }}
          className="relative z-10 w-full max-w-[360px] bg-white border border-[#d4c8b8]/60 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,.18)]">
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="font-syne font-black text-[#8B6E3C] tracking-[.12em] uppercase text-[13px] mb-0.5">Luminous AI</div>
              <div className="text-[10.5px] text-[#4E4439]/50">The Future of Receptionist Services</div>
            </div>
            <h2 className="font-syne font-black text-[18px] uppercase tracking-tight text-[#1A1614] mb-5">Welcome Back</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-syne font-bold text-[9px] uppercase tracking-[.1em] text-[#4E4439]/50">Email Address</label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  required
                  className="text-[12.5px] text-[#1A1614] bg-white border border-[#d4c8b8]/70 rounded-sm px-3 py-2 w-full focus:outline-none focus:border-[#8B6E3C]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-syne font-bold text-[9px] uppercase tracking-[.1em] text-[#4E4439]/50">Password</label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-[12.5px] text-[#1A1614] bg-white border border-[#d4c8b8]/70 rounded-sm px-3 py-2 pr-10 focus:outline-none focus:border-[#8B6E3C]"
                  />                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#4E4439]/40 hover:text-[#8B6E3C] transition-colors">
                    <span className="material-symbols-outlined text-[15px]">{showPw ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-1.5 text-[11px] text-[#4E4439]/60 cursor-pointer"><input type="checkbox" className="w-3 h-3 accent-[#8B6E3C]" />Remember me</label>
                <span className="text-[11px] text-[#8B6E3C] font-semibold cursor-pointer hover:underline">Forgot password?</span>
              </div>
              <motion.button whileHover={{ scale: done ? 1 : 1.02 }} whileTap={{ scale: .97 }} type="submit"
                className={`w-full py-2.5 font-syne font-bold text-[11px] uppercase tracking-[.1em] rounded-sm transition-colors ${done ? "bg-green-600 text-white" : "bg-[#8B6E3C] text-white hover:bg-[#6b5228]"}`}>
                {done ? "Signed In ✓" : "Sign In →"}
              </motion.button>
            </form>
            <div className="flex items-center gap-3 my-4 text-[10px] text-[#4E4439]/40">
              <div className="flex-1 h-px bg-[#d4c8b8]/60" /><span>or continue with</span><div className="flex-1 h-px bg-[#d4c8b8]/60" />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[["Google", <GoogleIcon />], ["GitHub", <GHIcon />]].map(([name, icon]) => (
                <motion.button key={name} whileHover={{ scale: 1.02 }} className="flex items-center justify-center gap-2 py-2 border border-[#d4c8b8]/70 rounded-sm font-syne font-semibold text-[11px] text-[#1A1614] hover:border-[#8B6E3C]/40 transition-colors bg-white">
                  {icon} {name}
                </motion.button>
              ))}
            </div>
            <p className="text-center text-[11px] text-[#4E4439]/50 mt-5">
              Don't have an account? <button onClick={() => setPage("getstarted")} className="text-[#8B6E3C] font-semibold hover:underline">Get started free →</button>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
