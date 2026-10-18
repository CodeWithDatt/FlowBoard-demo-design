"use client";

import { Copy, Layers, Link2, GitBranch, Camera } from "lucide-react";
import { environments } from "@/constants/environments";
import { useReveal } from "@/hooks/useReveal";

const operations = [
  {
    icon: Link2,
    name: "Link",
    description: "Point one piece of work at another without duplicating it.",
  },
  {
    icon: Layers,
    name: "Embed",
    description: "Drop a live drawing or frame straight inside a document.",
  },
  {
    icon: GitBranch,
    name: "Reference",
    description: "Let a task cite the doc, design or file it depends on.",
  },
  {
    icon: Copy,
    name: "Duplicate",
    description: "Branch a copy off when work needs to diverge, on purpose.",
  },
  {
    icon: Camera,
    name: "Snapshot",
    description: "Freeze a version of anything before it changes again.",
  },
];

const RADIUS = 132;

const FeaturesSection = () => {
  const scope = useReveal<HTMLElement>();

  return (
    <section
      id="connected-system"
      ref={scope}
      className="border-b border-border bg-background py-24 lg:py-32"
    >
      <div className="container-flow grid gap-16 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        {/* ================= COPY ================= */}
        <div data-reveal>
          <span className="font-mono text-[11px] tracking-wide text-ink-3">
            THE UNIVERSAL CONTENT SYSTEM
          </span>
          <h2 className="section-heading mt-4 font-display font-semibold tracking-tight text-ink">
            Connected tools for the best workflow.
          </h2>
          <p className="mt-4 max-w-[50ch] text-base leading-relaxed text-ink-2">
            Underneath every drawing, page, frame, task and file sits the same
            content record — an id, a type, a workspace, an owner, a history.
            The environment changes. The identity of the work never does.
          </p>

          <div className="mt-9 flex flex-col divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
            {operations.map((op) => {
              const Icon = op.icon;
              return (
                <div key={op.name} className="flex items-start gap-4 p-5">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-tint">
                    <Icon size={16} className="text-accent" />
                  </span>
                  <div>
                    <p className="text-[14.5px] font-semibold text-ink">
                      {op.name}
                    </p>
                    <p className="mt-0.5 text-[13.5px] leading-relaxed text-ink-2">
                      {op.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= DIAGRAM ================= */}
        <div className="relative mx-auto flex aspect-square w-full max-w-[420px] items-center justify-center" data-reveal>
          <svg className="absolute inset-0 h-full w-full overflow-visible">
            {environments.map((env, i) => {
              const angle = (i / environments.length) * Math.PI * 2 - Math.PI / 2;
              const cx = 50 + (RADIUS / 4.2) * Math.cos(angle);
              const cy = 50 + (RADIUS / 4.2) * Math.sin(angle);
              return (
                <line
                  key={env.key}
                  x1="50%"
                  y1="50%"
                  x2={`${cx}%`}
                  y2={`${cy}%`}
                  stroke="var(--border-strong)"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                />
              );
            })}
          </svg>

          {environments.map((env, i) => {
            const Icon = env.icon;
            const angle = (i / environments.length) * Math.PI * 2 - Math.PI / 2;
            const cx = 50 + (RADIUS / 4.2) * Math.cos(angle);
            const cy = 50 + (RADIUS / 4.2) * Math.sin(angle);
            return (
              <div
                key={env.key}
                className="absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-border bg-surface shadow-sm"
                style={{ left: `${cx}%`, top: `${cy}%` }}
              >
                <Icon size={18} style={{ color: `var(--${env.colorVar})` }} />
              </div>
            );
          })}

          <div className="relative z-10 flex w-[128px] flex-col gap-1 rounded-xl border border-accent/40 bg-surface p-3 text-left shadow-lg sm:w-[168px] sm:rounded-2xl sm:p-4">
            <span className="font-mono text-[10px] text-ink-3">content_object</span>
            <span className="font-mono text-[11px] text-ink">id: 8f2a…c19</span>
            <span className="font-mono text-[11px] text-ink">type: drawing</span>
            <span className="font-mono text-[11px] text-ink">workspace: acme</span>
            <span className="font-mono text-[11px] text-accent">refs: 4 linked</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
