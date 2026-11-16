import { useState } from "react";
import { Link } from "react-router-dom";
import { Smartphone, Sun, Ruler, Clapperboard, KeyRound, Trophy, IndianRupee, BadgeCheck, Footprints, ScanLine, Dumbbell, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tilt, Ball3D, CountUp } from "@/components/Fx3D";
import { Badge } from "@/components/Common";

const Wrap = ({ children, className = "" }) => <section className={`max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 ${className}`}>{children}</section>;
const Head = ({ eyebrow, title, desc }) => (<div className="mb-12 max-w-2xl reveal-3d"><div className="eyebrow mb-3">{eyebrow}</div><h2 className="text-3xl sm:text-4xl font-bold">{title}</h2>{desc && <p className="text-slate-400 mt-3">{desc}</p>}</div>);

const PHASES = [["Setup", "Clear frame"], ["Backlift", "Clear frame"], ["Downswing", "Clear frame"], ["Impact", "Approximate timing"], ["Follow-through", "Clear frame"]];
const DRILLS = [["Front-foot stride drill", "10 × 3 sets · cones mark the stride"], ["Head-over-ball drop feeds", "20 balls · partner feeds"], ["Shadow cover drive in mirror", "5 min · slow, then full speed"]];

export const SampleReport = () => (
  <Wrap>
    <Head eyebrow="What you get" title="A report that tells you what to fix next" desc="Every upload becomes a structured report. This is a sample to show the layout; your numbers come only from your own video." />
    <div className="grid lg:grid-cols-12 gap-5 s3d-tilt" data-s3d>
      <Tilt max={5} className="lg:col-span-4 glass rounded-2xl p-7 reveal-3d" data-testid="sample-score-card">
        <div className="flex justify-between items-center"><Badge tone="amber">SAMPLE</Badge><span className="font-mono text-[11px] text-slate-400">BATTING · SIDE-ON</span></div>
        <div className="relative w-44 h-44 mx-auto my-6 depth-pop">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90"><circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.08)" strokeWidth="9" fill="none" />
            <circle cx="50" cy="50" r="42" stroke="#10B981" strokeWidth="9" fill="none" strokeLinecap="round" strokeDasharray={`${0.74 * 264} 264`} /></svg>
          <div className="absolute inset-0 grid place-items-center text-center"><div><div className="text-5xl font-display font-extrabold"><CountUp to={74} /></div><div className="text-xs text-slate-400">technique score / 100</div></div></div>
        </div>
        <ul className="text-sm space-y-2"><li className="flex justify-between"><span className="text-slate-400">Evidence</span><span>High</span></li><li className="flex justify-between"><span className="text-slate-400">Video quality</span><span>Good</span></li><li className="flex justify-between"><span className="text-slate-400">Change since last report</span><span className="text-[#10B981]">+6</span></li></ul>
      </Tilt>
      <div className="lg:col-span-8 grid gap-5">
        <Tilt max={4} className="glass rounded-2xl p-6 reveal-3d"><div className="flex items-center gap-2 font-semibold mb-4"><ScanLine size={17} className="text-[#00B4D8]" />5-phase timeline, frame by frame</div>
          <div className="grid grid-cols-5 gap-2">{PHASES.map(([p, s], i) => <div key={p} className="rounded-lg bg-white/5 p-3 text-center"><div className="mx-auto mb-2 h-14 w-9 rounded-md border border-[#00B4D8]/40 bg-[linear-gradient(180deg,rgba(0,180,216,0.25),transparent)] relative">
            <span className="absolute left-1/2 top-1 -translate-x-1/2 w-2 h-2 rounded-full bg-[#5fd7ef]" /><span className="absolute left-1/2 top-3 bottom-2 w-px bg-[#10B981]" style={{ transform: `rotate(${[-4, -14, 10, 18, -8][i]}deg)` }} /></div>
            <div className="text-xs font-semibold">{p}</div><div className={`text-[10px] ${s.startsWith("Approx") ? "text-amber-300" : "text-slate-500"}`}>{s}</div></div>)}</div></Tilt>
        <div className="grid md:grid-cols-2 gap-5">
          <Tilt max={6} className="glass rounded-2xl p-6 reveal-3d"><div className="flex items-center gap-2 font-semibold mb-4"><Footprints size={17} className="text-[#10B981]" />Weight transfer</div>
            {[["Setup", 41], ["Impact", 72], ["Follow-through", 88]].map(([l, v]) => <div key={l} className="mb-3"><div className="flex justify-between text-xs mb-1"><span className="text-slate-400">{l}</span><span className="font-mono">{v}% front foot</span></div>
              <div className="h-2 bg-white/10 rounded"><div className="h-full rounded bg-gradient-to-r from-[#00B4D8] to-[#10B981] fill" style={{ "--w": `${v}%` }} /></div></div>)}
            <p className="text-xs text-slate-500 mt-2">Measured from hip position between your feet — for batting and bowling.</p></Tilt>
          <Tilt max={6} className="glass rounded-2xl p-6 reveal-3d"><div className="flex items-center gap-2 font-semibold mb-4"><Dumbbell size={17} className="text-amber-300" />Drills for this week</div>
            {DRILLS.map(([d, s]) => <div key={d} className="py-2 border-b border-white/5 last:border-0"><div className="text-sm font-medium">{d}</div><div className="text-xs text-slate-400">{s}</div></div>)}
            <p className="text-xs text-slate-500 mt-3 flex items-center gap-1"><Mail size={12} />Reports are emailed with a PDF and a shareable link, now or at a time you choose.</p></Tilt>
        </div>
      </div>
    </div>
  </Wrap>
);

const MEASURES = {
  batting: [["Front knee bend at impact", "How much the front leg bends as the bat comes through."], ["Head over front foot", "Whether your head stays over the ball at contact — key for balance."], ["Weight transfer", "How far your weight moves from back foot to front foot through the shot."], ["Base width & stride", "How wide you stand and how long your stride is."], ["Shoulder & hip alignment", "Whether your body lines stay side-on through the stroke."], ["Backlift height & timing", "When and how high the hands go before the downswing."]],
  bowling: [["Back-foot landing", "When and where the back foot lands compared with your hips."], ["Action type", "Side-on, semi-side-on, front-on or mixed — at back-foot contact."], ["Front shin at landing", "Whether the front leg braces or collapses at front-foot contact."], ["Trunk lean", "Forward, backward or sideways lean at the key moments."], ["Weight transfer & hip drive", "How far and how fast your hips drive over the front leg."], ["Release point", "Height of the bowling hand at release, frame by frame."]],
};

export const Measures = () => {
  const [k, setK] = useState("batting");
  return (
    <Wrap className="!pt-0">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6"><Head eyebrow="What we measure" title="Real body-tracking measurements, explained in plain words" desc="Each item shows the exact frame it came from. Anything the camera can't see clearly is marked unavailable — never guessed." />
        <div data-s3d className="s3d-up hidden md:block"><Ball3D className="w-56 h-56 -mt-10 mb-6" /></div></div>
      <div className="flex gap-2 mb-6">{["batting", "bowling"].map((t) => <button key={t} onClick={() => setK(t)} data-testid={`measures-tab-${t}`}
        className={`px-5 py-2 rounded-full text-sm capitalize border transition-colors ${k === t ? "border-[#10B981] bg-[#10B981]/10" : "border-white/10 text-slate-300 hover:border-white/30"}`}>{t}</button>)}</div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{MEASURES[k].map(([t, d], i) => <div key={k + t} data-s3d className={i % 3 === 1 ? "s3d-down" : "s3d-up"}><Tilt max={8} className="glass rounded-xl p-5 reveal-3d h-full" style={{ transitionDelay: `${i * 50}ms` }}>
        <div className="font-mono text-[11px] text-[#00B4D8] mb-2">{String(i + 1).padStart(2, "0")}</div><h3 className="font-semibold mb-1 depth-pop">{t}</h3><p className="text-sm text-slate-400">{d}</p></Tilt></div>)}</div>
    </Wrap>
  );
};

const TIPS = [[Smartphone, "Phone at hip height", "Prop it steady on a bag or tripod — no hand-held filming."], [Ruler, "Side-on, 8–12 m away", "Whole body in frame from feet to bat or bowling hand the whole time."], [Sun, "Light behind the camera", "Avoid filming into the sun or nets lights; it hides joints."], [Clapperboard, "Slow-mo if you have it", "60 fps or 120 fps captures impact and release far more clearly."]];

export const FilmingGuide = () => (
  <Wrap className="!pt-0">
    <Head eyebrow="Filming guide" title="Film it right in 30 seconds" desc="Better video means more measurements and a more confident score." />
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 s3d-tilt" data-s3d>{TIPS.map(([I, t, d], i) => <Tilt key={t} className="glass rounded-xl p-6 reveal-3d" style={{ transitionDelay: `${i * 60}ms` }}>
      <div className="w-11 h-11 rounded-xl bg-[#00B4D8]/15 grid place-items-center mb-4 depth-pop"><I className="text-[#5fd7ef]" size={20} /></div>
      <h3 className="font-semibold mb-1">{t}</h3><p className="text-sm text-slate-400">{d}</p></Tilt>)}</div>
  </Wrap>
);

const ACADEMY = [[KeyRound, "Private join codes", "Every academy gets a unique code. Players type it in, request to join, and you accept."], [Trophy, "Batting & bowling leaderboards", "Rank your players by their latest technique score, with nicknames you choose."], [IndianRupee, "Referral commission", "Share your referral link — earn on students who subscribe, paid out by CricAnalyze."], [BadgeCheck, "Verified coaches only", "Coaches upload an employee ID or certificate and are approved before seeing any player data."]];

export const AcademySection = () => (
  <Wrap className="!pt-0">
    <div data-s3d className="s3d-tilt rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(16,185,129,0.12),rgba(0,180,216,0.06)_50%,transparent)] p-8 md:p-12">
      <Head eyebrow="For coaches & academies" title="Run your academy on CricAnalyze" desc="Full access to the players you add: their analyses, progress, attendance and feedback — all in one workspace." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{ACADEMY.map(([I, t, d], i) => <Tilt key={t} className="glass rounded-xl p-6 reveal-3d" style={{ transitionDelay: `${i * 60}ms` }}>
        <I className="text-[#10B981] mb-3 depth-pop" /><h3 className="font-semibold mb-1">{t}</h3><p className="text-sm text-slate-400">{d}</p></Tilt>)}</div>
      <Button asChild className="mt-8 rounded-full bg-[#10B981] hover:bg-[#059669] text-[#0B132B]" data-testid="academy-cta-btn"><Link to="/signup">Create a coach account</Link></Button>
    </div>
  </Wrap>
);

const STEPS = [["01", "Record", "Prop your phone side-on at hip height and film a few balls. Any length — we find the shot or delivery.", "#00B4D8"],
  ["02", "Upload", "Pick batting or bowling, label the camera angle and confirm consent. Takes seconds.", "#10B981"],
  ["03", "Analyse", "Body tracking measures every key frame; the AI coach explains it in plain words.", "#F59E0B"],
  ["04", "Practise", "Get drills and a weekly plan, then compare your next video to see real progress.", "#5fd7ef"]];

export const Journey = () => (
  <section data-s3d="pin" className="relative h-[300vh]" data-testid="journey-3d">
    <div className="sticky top-16 h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-center w-full">
        <div><div className="eyebrow mb-3">How it works</div><h2 className="text-3xl sm:text-5xl font-bold leading-tight">From phone clip to<br /><span className="text-[#10B981]">practice plan.</span></h2>
          <p className="text-slate-400 mt-4 max-w-md">Keep scrolling — each step turns into view.</p>
          <div className="h-1 bg-white/10 rounded mt-8 max-w-sm"><div className="h-full rounded bg-gradient-to-r from-[#00B4D8] to-[#10B981]" style={{ width: "calc(var(--p) * 100%)" }} /></div></div>
        <div className="cyl-stage h-[360px] sm:h-[400px] relative">
          <div className="cyl absolute left-1/2 top-1/2 w-[260px] sm:w-[320px] h-[320px] sm:h-[360px] -ml-[130px] sm:-ml-[160px] -mt-[160px] sm:-mt-[180px]" style={{ "--r": "clamp(150px, 22vw, 190px)" }}>
            {STEPS.map(([n, t, d, c], i) => <div key={t} style={{ "--i": i }} className="rounded-3xl border border-white/10 bg-[#0B132B]/95 p-8 flex flex-col justify-between shadow-2xl" data-testid={`journey-step-${i}`}>
              <div className="font-mono text-6xl font-bold" style={{ color: c }}>{n}</div>
              <div><h3 className="text-2xl font-bold mb-2">{t}</h3><p className="text-sm text-slate-400 leading-relaxed">{d}</p></div></div>)}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CHIPS = ["Front knee 152°", "Weight 78% front foot", "Head over front foot", "Back-foot landing 3.02 s", "Semi-side-on action", "Shin braced 19°", "Trunk lean 8° forward", "Stride 0.9 torso lengths", "Release at frame 214", "Backlift timing", "Hip drive 2.1 /s"];

export const Marquee3D = () => (
  <div className="py-10 overflow-hidden" aria-hidden="true">
    <div className="marquee-3d"><div className="marquee-track gap-3">{[...CHIPS, ...CHIPS].map((c, i) => <span key={i} className="glass rounded-full px-5 py-2 text-sm font-mono whitespace-nowrap text-slate-200 mr-3"><span className="text-[#10B981] mr-2">●</span>{c}</span>)}</div></div>
  </div>
);
