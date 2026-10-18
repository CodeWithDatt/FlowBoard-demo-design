"use client";

import { Bot, MessageSquareDashed, Sparkles } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const AISection = () => {
  const scope = useReveal<HTMLElement>();

  return (
    <section id="ai" ref={scope} className="border-b border-border bg-background py-24 lg:py-32">
      <div className="container-flow">
        <div className="mx-auto max-w-[56ch] text-center" data-reveal>
          <span className="font-mono text-[11px] tracking-wide text-ink-3">
            CONTEXTUAL AI
          </span>
          <h2 className="section-heading mt-4 font-display font-semibold tracking-tight text-ink">
            Don&apos;t give AI another empty chat.
            <span className="block text-accent">Give it the work.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-2">
            FlowBoard&apos;s AI sits on top of your actual workspace — the
            drawing you made, the doc you wrote, the tasks you opened — instead
            of starting from a blank prompt every time.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* ================= GENERIC CHAT ================= */}
          <div data-reveal className="rounded-2xl border border-border bg-surface-2 p-6 opacity-80">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-hover">
                <MessageSquareDashed size={15} className="text-ink-3" />
              </span>
              <span className="text-[13px] font-medium text-ink-3">
                A generic assistant
              </span>
            </div>

            <div className="mt-6 rounded-xl border border-dashed border-border-strong bg-background p-5">
              <p className="text-[14px] text-ink-3">
                Ask me anything.
              </p>
            </div>

            <p className="mt-4 text-[13px] text-ink-3">
              Starts from nothing. Doesn&apos;t know your workspace exists.
            </p>
          </div>

          {/* ================= FLOWBOARD AI ================= */}
          <div
            data-reveal
            className="rounded-2xl border border-accent/40 bg-surface p-6 shadow-md"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-tint">
                <Bot size={15} className="text-accent" />
              </span>
              <span className="text-[13px] font-medium text-ink">
                FlowBoard AI
              </span>
              <span className="ml-auto flex items-center gap-1 font-mono text-[10.5px] text-accent">
                <Sparkles size={11} />
                reading 3 objects
              </span>
            </div>

            <div className="mt-6 space-y-2.5">
              <div className="rounded-lg bg-surface-hover px-3.5 py-2.5">
                <p className="text-[13.5px] text-ink">
                  &ldquo;Turn the onboarding-idea drawing and its linked doc
                  into a task list.&rdquo;
                </p>
              </div>

              <div className="rounded-lg border border-border bg-background px-3.5 py-3">
                <p className="text-[13.5px] leading-relaxed text-ink-2">
                  Based on the drawing&apos;s three sections and the open
                  questions in{" "}
                  <span className="font-mono text-ink">spec-draft</span>, I
                  created 4 tasks in Plan and linked each one back to the
                  source paragraph.
                </p>
              </div>
            </div>

            <p className="mt-4 text-[13px] text-ink-2">
              Grounded in the content you already made, not a fresh guess.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
