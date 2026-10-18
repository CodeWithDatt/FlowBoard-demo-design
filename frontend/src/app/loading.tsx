import { Layers3 } from "lucide-react";

export default function Loading() {
  return (
    <main
      aria-label="Loading FlowBoard"
      className="flex min-h-screen items-center justify-center bg-background px-6 text-ink"
    >
      <div className="flex w-full max-w-xs flex-col items-center text-center">
        <div className="flowboard-skeleton relative flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
          <Layers3 size={21} strokeWidth={2.1} />
        </div>

        <p className="mt-4 font-display text-sm font-semibold tracking-tight">
          FlowBoard
        </p>

        <div className="mt-5 h-1.5 w-32 overflow-hidden rounded-full bg-surface-hover">
          <div className="flowboard-loading-bar h-full w-1/2 rounded-full bg-accent" />
        </div>

        <p className="mt-3 text-[11px] text-ink-3">
          Preparing your workspace…
        </p>
      </div>
    </main>
  );
}
