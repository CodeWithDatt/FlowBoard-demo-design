"use client";

import { environments } from "@/constants/environments";
import { useReveal } from "@/hooks/useReveal";

const WorkspacesSection = () => {
  const scope = useReveal<HTMLElement>();

  return (
    <section
      id="workspaces"
      ref={scope}
      className="border-b border-border bg-surface-2 py-24 lg:py-32"
    >
      <div className="container-flow">
        <div className="max-w-[52ch]" data-reveal>
          <span className="font-mono text-[11px] tracking-wide text-ink-3">
            THE SIX ENVIRONMENTS
          </span>
          <h2 className="section-heading mt-4 font-display font-semibold tracking-tight text-ink">
            Separate tools for the best experience.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-2">
            Drawing, writing, designing and planning don&apos;t work the same
            way, so FlowBoard doesn&apos;t force them into one generic editor.
            Each environment is purpose-built for how that kind of work
            actually happens.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {environments.map((env) => {
            const Icon = env.icon;
            return (
              <div
                key={env.key}
                data-reveal
                className="group relative flex min-h-[280px] flex-col justify-between bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-hover sm:p-7"
              >
                <div
                  className="absolute inset-x-0 top-0 h-[3px] scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                  style={{ backgroundColor: `var(--${env.colorVar})` }}
                />

                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `color-mix(in srgb, var(--${env.colorVar}) 14%, transparent)`,
                      }}
                    >
                      <Icon size={18} style={{ color: `var(--${env.colorVar})` }} />
                    </span>
                    <span className="font-mono text-[11px] text-ink-3">
                      {env.index}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                    {env.name}
                  </h3>
                  <p
                    className="mt-1 text-[13px] font-medium"
                    style={{ color: `var(--${env.colorVar})` }}
                  >
                    {env.tagline}
                  </p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-2">
                    {env.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2">
                  <span className="font-mono text-[11px] text-ink-3">
                    {env.detail}
                  </span>
                  <span className="font-mono text-[11px] font-medium text-ink-2">
                    {env.verb}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkspacesSection;
