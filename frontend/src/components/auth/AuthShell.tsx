import Link from "next/link";
import type { ReactNode } from "react";
import ThemeToggle from "@/components/layout/ThemeToggle";
import AuthMarketingPanel from "./AuthMarketingPanel";

const AuthShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid h-dvh w-full overflow-hidden bg-background lg:grid-cols-2">
      <AuthMarketingPanel />

      <div className="flex h-dvh flex-col overflow-y-auto">
        <div className="flex items-center justify-between px-6 pt-6 sm:px-10 sm:pt-8">
          <Link href="/" className="flex items-center gap-2.5 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-display text-[13px] font-semibold text-accent-ink">
              F
            </div>
            <span className="font-display text-[15px] font-semibold tracking-tight text-ink">
              FlowBoard
            </span>
          </Link>
          <Link
            href="/"
            className="hidden text-[13px] font-medium text-ink-2 transition-colors duration-200 hover:text-ink lg:block"
          >
            ← Back to site
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-6 sm:px-10">
          <div className="w-full max-w-[380px]">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthShell;
