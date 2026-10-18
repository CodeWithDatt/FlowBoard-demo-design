"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, FileText, Frame, ListChecks, PenTool } from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";

/**
 * Every value here is a percentage of the panel's width/height, never a
 * fixed pixel — the card widths scale with the container so nothing can
 * clip or overflow on narrow screens.
 */
const nodes = [
  {
    id: "n1",
    label: "Idea sketch",
    icon: PenTool,
    color: "draw",
    x: 4,
    y: 8,
    w: 46,
  },
  {
    id: "n2",
    label: "Spec draft",
    icon: FileText,
    color: "write",
    x: 50,
    y: 4,
    w: 42,
  },
  {
    id: "n3",
    label: "Onboarding frame",
    icon: Frame,
    color: "design",
    x: 52,
    y: 46,
    w: 44,
  },
  {
    id: "n4",
    label: "3 tasks",
    icon: ListChecks,
    color: "plan",
    x: 6,
    y: 60,
    w: 38,
  },
];

const edges = [
  { from: "n1", to: "n2" },
  { from: "n2", to: "n3" },
  { from: "n3", to: "n4" },
  { from: "n1", to: "n4" },
];

const nodeCenter = (n: (typeof nodes)[number]) => ({
  x: n.x + n.w / 2,
  y: n.y + 6,
});

const HeroSection = () => {
  const scope = useRef<HTMLDivElement>(null);
  const { user } = useCurrentUser();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from("[data-hero-eyebrow]", {
          autoAlpha: 0,
          y: 10,
          duration: 0.5,
        })
          .from(
            "[data-hero-line]",
            {
              autoAlpha: 0,
              y: 22,
              duration: 0.7,
              stagger: 0.08,
            },
            "-=0.25",
          )
          .from(
            "[data-hero-sub]",
            {
              autoAlpha: 0,
              y: 14,
              duration: 0.5,
            },
            "-=0.3",
          )
          .from(
            "[data-hero-cta]",
            {
              autoAlpha: 0,
              y: 10,
              duration: 0.5,
              stagger: 0.06,
            },
            "-=0.3",
          )
          .from(
            "[data-hero-panel]",
            {
              autoAlpha: 0,
              y: 24,
              scale: 0.98,
              duration: 0.8,
            },
            "-=0.55",
          )
          .from(
            "[data-hero-edge]",
            {
              autoAlpha: 0,
              duration: 0.5,
              stagger: 0.06,
            },
            "-=0.4",
          )
          .from(
            "[data-hero-node]",
            {
              autoAlpha: 0,
              y: 10,
              duration: 0.45,
              stagger: 0.08,
            },
            "-=0.3",
          );
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className="relative overflow-hidden border-b border-border"
    >
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />

      <div className="container-flow relative grid gap-16 py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-28">
        {/* ================= COPY ================= */}

        <div>
          <div
            data-hero-eyebrow
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-[11px] text-ink-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            One connected workspace, six ways to work
          </div>

          <h1 className="hero-heading font-display font-semibold tracking-tight text-ink">
            <span data-hero-line className="block">
              Create anywhere.
            </span>

            <span data-hero-line className="block">
              Use everywhere.
            </span>

            <span data-hero-line className="block text-accent">
              Connect everything.
            </span>
          </h1>

          <p
            data-hero-sub
            className="mt-7 max-w-[46ch] text-lg leading-relaxed text-ink-2"
          >
            Most work is scattered across a whiteboard, a doc, a design file and
            a task board that don&apos;t know about each other. FlowBoard gives
            drawing, writing, designing and planning their own dedicated
            environments — wired to a single shared body of work underneath.
          </p>

          <div data-hero-cta className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={user ? "/dashboard" : "/signup"}
              className="flex items-center gap-2 rounded-lg bg-accent px-5 py-3.5 text-sm font-semibold !text-white shadow-sm transition-all duration-200 hover:bg-accent-hover"
            >
              {user ? "Open your workspace" : "Start building for free"}
              <ArrowRight size={16} />
            </Link>

            <Link
              href="#workspaces"
              className="flex items-center gap-2 rounded-lg border border-border px-5 py-3.5 text-sm font-semibold text-ink transition-all duration-200 hover:border-border-strong hover:bg-surface-hover"
            >
              See the six environments
            </Link>
          </div>

          <p data-hero-cta className="mt-6 font-mono text-[12px] text-ink-3">
            No credit card · Free workspace for individuals · Import in minutes
          </p>
        </div>

        {/* ================= CONNECTED CANVAS VISUAL ================= */}

        <div className="relative">
          <div
            data-hero-panel
            className="relative aspect-[4/3.1] w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-lg"
          >
            {/* panel chrome */}

            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
              </div>

              <span className="font-mono text-[10.5px] text-ink-3">
                camera 428, 192 · zoom 100%
              </span>
            </div>

            {/* canvas field */}

            <div className="relative h-[calc(100%-41px)] w-full [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:20px_20px]">
              <svg
                className="absolute inset-0 h-full w-full overflow-visible"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {edges.map((edge, i) => {
                  const from = nodes.find((n) => n.id === edge.from)!;

                  const to = nodes.find((n) => n.id === edge.to)!;

                  const a = nodeCenter(from);
                  const b = nodeCenter(to);
                  const midX = (a.x + b.x) / 2;

                  return (
                    <path
                      key={i}
                      data-hero-edge
                      d={`M ${a.x} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x} ${b.y}`}
                      fill="none"
                      stroke="var(--border-strong)"
                      strokeWidth="0.35"
                      strokeDasharray="1.4 1.4"
                    />
                  );
                })}
              </svg>

              {nodes.map((node) => {
                const Icon = node.icon;

                return (
                  <div
                    key={node.id}
                    data-hero-node
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      width: `${node.w}%`,
                    }}
                    className="absolute flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2 py-1.5 shadow-sm transition-transform duration-300 hover:z-10 hover:scale-[1.04] sm:gap-2 sm:px-2.5 sm:py-2"
                  >
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md sm:h-6 sm:w-6"
                      style={{
                        backgroundColor: `color-mix(in srgb, var(--${node.color}) 16%, transparent)`,
                      }}
                    >
                      <Icon
                        size={12}
                        className="sm:hidden"
                        style={{
                          color: `var(--${node.color})`,
                        }}
                      />

                      <Icon
                        size={13}
                        className="hidden sm:block"
                        style={{
                          color: `var(--${node.color})`,
                        }}
                      />
                    </span>

                    <span className="truncate text-[10.5px] font-medium text-ink sm:text-[12px]">
                      {node.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="mt-3 text-center font-mono text-[11px] text-ink-3 lg:text-left">
            Four objects. One shared graph underneath.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
