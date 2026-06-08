import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Counter({ to, suffix = "", duration = 1400 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const dec = String(to).includes(".") ? 1 : 0;
    const start = performance.now();
    const tick = (now) => {
      const p    = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount((to * ease).toFixed(dec));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}
