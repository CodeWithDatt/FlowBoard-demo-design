"use client";

import { useReveal } from "@/hooks/useReveal";

const steps = [
  {
    number: "01",
    title: "Start anywhere",
    description:
      "Open a canvas, a page, a frame or a board — whichever matches the shape of the thought you're having right now.",
    sample: "> new drawing \"onboarding-idea\"",
  },
  {
    number: "02",
    title: "FlowBoard keeps the thread",
    description:
      "The moment you create something, it becomes a content object with an id, a type and an owner — no separate step required.",
    sample: "+ content_object created · type: drawing",
  },
  {
    number: "03",
    title: "Move without losing context",
    description:
      "Turn a sketch into a spec, embed a frame in that spec, or spin a task off a paragraph — each new piece still points back to where it came from.",
    sample: "+ linked spec-draft → onboarding-idea",
  },
  {
    number: "04",
    title: "See the whole picture",
    description:
      "Open Connect at any point to see exactly how a project's drawings, docs, designs and tasks relate — because it's reading the same graph, live.",
    sample: "graph: 4 nodes · 3 edges · 1 project",
  },
];

const HowItWorksSection = () => {
  const scope = useReveal<HTMLElement>();

  return (
    <section
      id="how-it-works"
      ref={scope}
      className="border-b border-border bg-surface-2 py-24 lg:py-32"
    >
      <div className="container-flow">
        <div className="max-w-[52ch]" data-reveal>
          <span className="font-mono text-[11px] tracking-wide text-ink-3">
            HOW IT WORKS
          </span>
          <h2 className="section-heading mt-4 font-display font-semibold tracking-tight text-ink">
            One piece of work, followed all the way through.
          </h2>
        </div>

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-6 right-0 left-0 hidden h-px bg-border lg:block" />

          {steps.map((step) => (
            <div key={step.number} data-reveal className="relative">
              <div className="flex items-center gap-3">
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-background font-mono text-[13px] text-ink-2">
                  {step.number}
                </span>
              </div>

              <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-2">
                {step.description}
              </p>

              <div className="mt-4 rounded-lg border border-border bg-background px-3 py-2.5">
                <span className="font-mono text-[11px] text-accent">
                  {step.sample}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
