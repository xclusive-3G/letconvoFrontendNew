import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

// Reached via the link in a Supabase password-reset email
// (?passwordReset=1, see LoginPage's handleForgotPassword and App.jsx's
// top-level check). Supabase's default detectSessionInUrl parses the
// recovery tokens out of the URL hash and establishes a session
// automatically on client init — this page just waits for that, then lets
// the user set a new password with supabase.auth.updateUser.
export default function ResetPasswordPage({ setPage }) {
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [linkError, setLinkError] = useState(null); // link itself invalid/expired — hides the form
  const [formError, setFormError] = useState(null);  // form validation/submit error — shown inline, form stays up
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setReady(true);
        setUserEmail(data.session.user?.email || null);
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" && session) {
        setReady(true);
        setUserEmail(session.user?.email || null);
      }
    });

    // detectSessionInUrl needs a moment on first load — if nothing showed
    // up after a few seconds, the link is genuinely invalid/expired rather
    // than just slow.
    const timeout = setTimeout(() => {
      setReady((r) => {
        if (!r) setLinkError("This reset link is invalid or has expired. Please request a new one.");
        return r;
      });
    }, 4000);

    return () => {
      sub.subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (password.length < 8) {
      setFormError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirm) {
      setFormError("Passwords don't match");
      return;
    }

    setSubmitting(true);

    // Supabase never exposes the current password hash to check against
    // directly — attempting to sign in with the proposed new password is
    // the only reliable way to tell whether it matches the existing one.
    // A failed sign-in here just means the passwords differ (the normal,
    // expected case), not that anything went wrong. If this check itself
    // errors out for an unrelated reason (network blip, etc.), don't block
    // the user on it — fall through and let the real update attempt run.
    if (userEmail) {
      try {
        const { data: signInData } = await supabase.auth.signInWithPassword({ email: userEmail, password });
        if (signInData?.session) {
          setSubmitting(false);
          setFormError("New password must be different from your current password.");
          return;
        }
      } catch (_) {
        // ignore — treat as "couldn't confirm a match", proceed to the real update
      }
    }

    const { data, error: updateError } = await supabase.auth.updateUser({ password });
    setSubmitting(false);

    if (updateError) {
      setFormError(updateError.message);
      return;
    }

    setDone(true);

    if (data.session) {
      localStorage.setItem("token", data.session.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    setTimeout(() => {
      window.history.replaceState(null, "", window.location.pathname);
      setPage("dashboard");
    }, 1200);
  };

  return (
    <main style={{ position: "relative", zIndex: 10 }}>
      <div className="min-h-screen flex items-center justify-center px-5 pt-[52px] pb-8">
        <div className="absolute inset-0 bg-black/52" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, ease: [.16, 1, .3, 1] }}
          className="relative z-10 w-full max-w-[360px] bg-white border border-[#d4c8b8]/60 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,.18)]">
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="font-syne font-black text-[#8B6E3C] tracking-[.12em] uppercase text-[13px] mb-0.5">Letconvo AI</div>
              <div className="text-[10.5px] text-[#4E4439]/50">The Future of Receptionist Services</div>
            </div>
            <h2 className="font-syne font-black text-[18px] uppercase tracking-tight text-[#1A1614] mb-5">Set New Password</h2>

            {done ? (
              <div className="text-center text-[12.5px] text-[#4E4439]">Password updated. Redirecting…</div>
            ) : linkError ? (
              <div className="text-center">
                <div className="text-[12px] text-red-600 mb-4">{linkError}</div>
                <button onClick={() => setPage("login")} className="text-[11px] text-[#8B6E3C] font-semibold hover:underline">Back to login</button>
              </div>
            ) : !ready ? (
              <div className="text-center text-[12.5px] text-[#4E4439]/60">Verifying your reset link…</div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-syne font-bold text-[9px] uppercase tracking-[.1em] text-[#4E4439]/50">New Password</label>
                  <input type="password" placeholder="Min. 8 characters" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}
                    className="text-[12.5px] text-[#1A1614] bg-white border border-[#d4c8b8]/70 rounded-sm px-3 py-2 w-full focus:outline-none focus:border-[#8B6E3C]" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-syne font-bold text-[9px] uppercase tracking-[.1em] text-[#4E4439]/50">Confirm Password</label>
                  <input type="password" placeholder="Re-enter password" required minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)}
                    className="text-[12.5px] text-[#1A1614] bg-white border border-[#d4c8b8]/70 rounded-sm px-3 py-2 w-full focus:outline-none focus:border-[#8B6E3C]" />
                </div>
                {formError && <div className="text-[11px] text-red-600">{formError}</div>}
                <motion.button whileHover={{ scale: submitting ? 1 : 1.02 }} whileTap={{ scale: .97 }} type="submit" disabled={submitting}
                  className="w-full py-2.5 font-syne font-bold text-[11px] uppercase tracking-[.1em] rounded-sm transition-colors bg-[#8B6E3C] text-white hover:bg-[#6b5228] disabled:opacity-60">
                  {submitting ? "Updating…" : "Update Password →"}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
