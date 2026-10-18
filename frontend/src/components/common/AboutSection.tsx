"use client";

import { useReveal } from "@/hooks/useReveal";

const notClones = [
  "an Excalidraw clone",
  "a Notion clone",
  "a Figma clone",
  "a Trello clone",
];

const traits = [
  "Calm",
  "Focused",
  "Creative",
  "Connected",
  "Technically sophisticated",
];

const AboutSection = () => {
  const scope = useReveal<HTMLElement>();

  return (
    <section id="about" ref={scope} className="border-b border-border bg-surface-2 py-24 lg:py-32">
      <div className="container-flow grid gap-16 lg:grid-cols-2">
        {/* ================= NOT A CLONE ================= */}
        <div data-reveal>
          <span className="font-mono text-[11px] tracking-wide text-ink-3">
            WHY ANOTHER WORKSPACE
          </span>
          <h2 className="section-heading mt-4 font-display font-semibold tracking-tight text-ink">
            We didn&apos;t set out to clone anything.
          </h2>
          <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-ink-2">
            It would have been faster to build FlowBoard as a whiteboard app,
            or a docs app, or a planner. We built it as none of those, and all
            of them, because the real problem was never a missing feature —
            it was the wall between tools. FlowBoard is deliberately not:
          </p>

          <ul className="mt-6 space-y-2.5">
            {notClones.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-[14.5px] text-ink-2"
              >
                <span className="h-1 w-4 rounded-full bg-border-strong" />
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-ink-2">
            It borrows ideas each of those categories got right, then holds
            them together with one architecture built for a single purpose:
            keeping your work connected as its shape keeps changing.
          </p>
        </div>

        {/* ================= PRINCIPLE ================= */}
        <div data-reveal className="flex flex-col justify-between">
          <blockquote className="rounded-2xl border border-border bg-surface p-8 shadow-sm lg:p-10">
            <p className="font-display text-2xl leading-snug font-medium text-ink sm:text-[1.7rem]">
              &ldquo;Separate tools for the best experience.
              <br />
              Connected tools for the best workflow.&rdquo;
            </p>
            <p className="mt-4 font-mono text-[12px] text-ink-3">
              — the principle behind every decision in FlowBoard
            </p>
          </blockquote>

          <div className="mt-8">
            <p className="font-mono text-[11px] tracking-wide text-ink-3">
              PRODUCT PERSONALITY
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {traits.map((trait) => (
                <span
                  key={trait}
                  className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-[12.5px] font-medium text-ink-2"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
