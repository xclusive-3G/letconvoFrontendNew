import { motion } from "framer-motion";

export default function PageHero({ chip, title, hlWord, sub, primaryBtn, primaryAction, secondaryBtn, secondaryAction }) {
  const parts = hlWord ? title.split(hlWord) : [title, ""];
  return (
    <section style={{
      position:"relative", width:"100%",
      height:"100vh", minHeight:480, maxHeight:820,
      display:"flex", flexDirection:"column", justifyContent:"flex-end",
      overflow:"hidden",
    }}>
      <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.58)", pointerEvents:"none", zIndex:1 }}/>
      <div style={{
        position:"relative", zIndex:2,
        width:"100%", maxWidth:1024, margin:"0 auto",
        padding:"0 20px 40px 20px",
      }} className="sm:px-8 sm:pb-14">
        {chip && (
          <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:.05,duration:.45,ease:[.16,1,.3,1]}}
            style={{ display:"inline-block", color:"rgba(255,255,255,0.65)", fontFamily:"'Syne',sans-serif", fontWeight:600, fontSize:"9px", textTransform:"uppercase", letterSpacing:"0.2em", marginBottom:8 }}>
            {chip}
          </motion.div>
        )}
        <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:.12,duration:.65,ease:[.16,1,.3,1]}}
          style={{
            fontFamily:"'Syne',sans-serif", fontWeight:900, color:"#ffffff",
            textTransform:"uppercase", lineHeight:1.02, letterSpacing:"-0.02em",
            /* mobile: 34px → tablet: 48px → desktop: 64px */
            fontSize:"clamp(32px, 6.5vw, 64px)",
            maxWidth:600, margin:0,
          }}>
          {hlWord ? (
            <>{parts[0]}<span style={{ background:"linear-gradient(90deg,#F59E0B,#06B6D4)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>{hlWord}</span>{parts[1]}</>
          ) : title}
        </motion.h1>
        {sub && (
          <motion.p initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.26,duration:.5,ease:[.16,1,.3,1]}}
            style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(12px,1.6vw,14px)", color:"rgba(255,255,255,0.68)", lineHeight:1.65, marginTop:12, maxWidth:300 }}>
            {sub}
          </motion.p>
        )}
        {(primaryBtn || secondaryBtn) && (
          <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:.36,duration:.45,ease:[.16,1,.3,1]}}
            style={{ display:"flex", gap:10, marginTop:20, flexWrap:"wrap" }}>
            {primaryBtn && (
              <button onClick={primaryAction}
                style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"clamp(10px,1.2vw,12px)", textTransform:"uppercase", letterSpacing:"0.1em", background:"#2d2416", color:"#ffffff", border:"none", padding:"10px 20px", cursor:"pointer" }}
                onMouseEnter={e=>e.currentTarget.style.background="#000"}
                onMouseLeave={e=>e.currentTarget.style.background="#2d2416"}>
                {primaryBtn}
              </button>
            )}
            {secondaryBtn && (
              <button onClick={secondaryAction}
                style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"clamp(10px,1.2vw,12px)", textTransform:"uppercase", letterSpacing:"0.1em", background:"transparent", color:"#ffffff", border:"1px solid rgba(255,255,255,0.5)", padding:"10px 20px", cursor:"pointer" }}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                {secondaryBtn}
              </button>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
