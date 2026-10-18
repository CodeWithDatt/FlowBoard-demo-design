"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

type Status = "idle" | "loading" | "success" | "error";

const CTASection = () => {
  const scope = useReveal<HTMLElement>();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    // TODO: replace with a real call once
    // POST /api/waitlist exists on the backend.
    await new Promise((resolve) => setTimeout(resolve, 700));

    setStatus("success");
  };

  return (
    <section ref={scope} className="border-b border-border bg-background py-24 lg:py-32">
      <div className="container-flow">
        <div
          data-reveal
          className="relative overflow-hidden rounded-3xl border border-border bg-surface px-8 py-16 text-center sm:px-16"
        >
          <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] opacity-50" />

          <div className="relative">
            <h2 className="section-heading mx-auto max-w-[24ch] font-display font-semibold tracking-tight text-ink">
              Stop copying context between tabs.
            </h2>
            <p className="mx-auto mt-4 max-w-[48ch] text-base leading-relaxed text-ink-2">
              Bring your next idea into FlowBoard and watch it stay connected
              from the first sketch to the last shipped task.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              noValidate
            >
              <label htmlFor="cta-email" className="sr-only">
                Work email
              </label>
              <input
                id="cta-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                placeholder="you@company.com"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-ink placeholder:text-ink-3 focus:border-accent"
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-ink transition-all duration-200 hover:bg-accent-hover disabled:hover:bg-accent"
              >
                {status === "loading" && (
                  <Loader2 size={15} className="animate-spin" />
                )}
                {status === "success" ? (
                  <>
                    <Check size={15} /> You&apos;re on the list
                  </>
                ) : (
                  <>
                    Join the waitlist
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>

            <p
              className={`mt-3 text-[13px] transition-opacity ${
                status === "error" ? "text-danger opacity-100" : "opacity-0"
              }`}
              role="alert"
            >
              Enter a valid work email to join.
            </p>

            <p className="mt-1 font-mono text-[11px] text-ink-3">
              Or{" "}
              <Link href="/signup" className="text-accent underline underline-offset-2">
                create a free workspace
              </Link>{" "}
              right now.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
