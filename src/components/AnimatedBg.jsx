import { useEffect, useRef } from "react";
import OfficeBg from "../assets/office-bg.png";

export default function AnimatedBg() {
  const imgRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (!imgRef.current) return;
      const x = (e.clientX / window.innerWidth  - 0.5) * 0.7;
      const y = (e.clientY / window.innerHeight - 0.5) * 0.7;
      imgRef.current.style.transform = `scale(1.12) translate(${x}%,${y}%)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div id="bg-layer">
        <img ref={imgRef} src={OfficeBg} alt="" />
      </div>
      <div id="light-leak" />
      <ProgressBar />
    </>
  );
}

function ProgressBar() {
  const ref = useRef(null);
  useEffect(() => {
    const fn = () => {
      if (!ref.current) return;
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      ref.current.style.width = (Math.min(pct, 1) * 100) + "%";
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div id="scroll-progress" ref={ref} style={{ width: "0%" }} />;
}
