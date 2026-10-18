import { Check, FileText, Frame, PenTool } from "lucide-react";

const checklist = [
  "One workspace, six specialized environments",
  "Every drawing, doc and task stays connected",
  "AI grounded in your real work, not a blank prompt",
];

const floatingIcons = [
  { icon: PenTool, color: "draw", x: 12, y: 18 },
  { icon: FileText, color: "write", x: 68, y: 8 },
  { icon: Frame, color: "design", x: 78, y: 58 },
];

const AuthMarketingPanel = () => {
  return (
    <div className="relative hidden h-dvh flex-col justify-between overflow-hidden bg-[#0c0d10] p-10 text-[#f3f2ee] lg:flex xl:p-14">
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:26px_26px]" />

      {/* floating connection motif */}
      <div className="pointer-events-none absolute inset-0">
        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          {floatingIcons.map((node, i) => {
            const next = floatingIcons[(i + 1) % floatingIcons.length];
            return (
              <line
                key={i}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${next.x}%`}
                y2={`${next.y}%`}
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="0.3"
                strokeDasharray="1.2 1.6"
              />
            );
          })}
        </svg>
        {floatingIcons.map((node, i) => {
          const Icon = node.icon;
          return (
            <div
              key={i}
              className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <Icon size={18} style={{ color: `var(--${node.color})` }} />
            </div>
          );
        })}
      </div>

      {/* logo */}
      <div className="relative z-10 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent font-display text-sm font-semibold text-white">
          F
        </div>
        <span className="font-display text-lg font-semibold tracking-tight">
          FlowBoard
        </span>
      </div>

      {/* tagline */}
      <div className="relative z-10 max-w-md">
        <p className="font-display text-[clamp(1.6rem,2.4vw,2.25rem)] leading-[1.15] font-semibold tracking-tight">
          Create anywhere. Use everywhere. Connect everything.
        </p>
        <p className="mt-3 text-[14px] leading-relaxed text-white/60">
          A connected creative workspace — drawing, writing, designing and
          planning, wired to one shared body of work underneath.
        </p>
      </div>

      {/* checklist */}
      <ul className="relative z-10 flex flex-col gap-3">
        {checklist.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[13px] text-white/70">
            <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-white/10">
              <Check size={10} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthMarketingPanel;
