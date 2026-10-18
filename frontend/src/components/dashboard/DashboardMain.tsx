"use client";

type DashboardMainProps = {
  onSearch: () => void;
  onShare: () => void;
  onNewDocument: () => void;
  onTemplateUse: (name: string) => void;
  userName: string;
};

export default function DashboardMain({
  onSearch,
  onShare,
  onNewDocument,
  onTemplateUse,
  userName,
}: DashboardMainProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-[#FAF9F5] p-6 dark:bg-[#121418] lg:p-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col space-y-8">
        {/* ======================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col gap-4 border-b border-[#E4E1D8]/70 pb-6 dark:border-[#24272E]/70 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#15171B] dark:text-[#F3F2EE]">
              Workspace Overview
            </h1>

            <p className="mt-1 text-sm text-[#666970] dark:text-[#A8ABB3]">
              Welcome back, {userName}. Jump back into your creative boards and
              environments.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2.5">
            {/* Quick Find */}

            <button
              type="button"
              onClick={onSearch}
              className="flex items-center gap-1.5 rounded-lg border border-[#E4E1D8] bg-white px-3 py-1.5 text-xs font-medium text-[#15171B] shadow-xs transition-all hover:bg-[#EFECE6] dark:border-[#24272E] dark:bg-[#16181D] dark:text-[#F3F2EE] dark:hover:bg-[#1E2127]"
            >
              <svg
                className="h-3.5 w-3.5 text-indigo-500"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />

                <path d="m21 21-4.3-4.3" />
              </svg>

              <span>Quick Find (⌘K)</span>
            </button>

            {/* New Document */}

            <button
              type="button"
              onClick={onNewDocument}
              className="flex items-center gap-1.5 rounded-lg bg-[#15171B] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-opacity hover:opacity-90 dark:bg-[#F3F2EE] dark:text-[#0D0E11]"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>

              <span>New Document</span>
            </button>
          </div>
        </div>

        {/* ======================================================
            CREATIVE ENVIRONMENTS
        ====================================================== */}

        <section className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#9699A0] dark:text-[#686B74]">
            Creative Environments
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {/* DRAW */}

            <a
              href="#draw"
              className="group block rounded-xl border border-[#E4E1D8] bg-white p-3.5 shadow-xs transition-all hover:border-violet-500/50 hover:bg-[#F6F5F2] dark:border-[#24272E] dark:bg-[#16181D] dark:hover:bg-[#1E2127]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500/90 transition-transform group-hover:scale-105 dark:text-violet-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 19l7-7 3 3-7 7-3-3z" />
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                </svg>
              </div>

              <div className="mt-2.5 text-sm font-semibold text-[#15171B] dark:text-[#F3F2EE]">
                Draw
              </div>

              <div className="mt-0.5 text-[11px] text-[#666970] dark:text-[#A8ABB3]">
                Freeform canvas
              </div>
            </a>

            {/* WRITE */}

            <a
              href="#write"
              className="group block rounded-xl border border-[#E4E1D8] bg-white p-3.5 shadow-xs transition-all hover:border-blue-500/50 hover:bg-[#F6F5F2] dark:border-[#24272E] dark:bg-[#16181D] dark:hover:bg-[#1E2127]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500/90 transition-transform group-hover:scale-105 dark:text-blue-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                </svg>
              </div>

              <div className="mt-2.5 text-sm font-semibold text-[#15171B] dark:text-[#F3F2EE]">
                Write
              </div>

              <div className="mt-0.5 text-[11px] text-[#666970] dark:text-[#A8ABB3]">
                Docs &amp; Specs
              </div>
            </a>

            {/* DESIGN */}

            <a
              href="#design"
              className="group block rounded-xl border border-[#E4E1D8] bg-white p-3.5 shadow-xs transition-all hover:border-rose-500/50 hover:bg-[#F6F5F2] dark:border-[#24272E] dark:bg-[#16181D] dark:hover:bg-[#1E2127]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500/90 transition-transform group-hover:scale-105 dark:text-rose-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />

                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>

              <div className="mt-2.5 text-sm font-semibold text-[#15171B] dark:text-[#F3F2EE]">
                Design
              </div>

              <div className="mt-0.5 text-[11px] text-[#666970] dark:text-[#A8ABB3]">
                UI kits &amp; Frames
              </div>
            </a>

            {/* PLAN */}

            <a
              href="#plan"
              className="group block rounded-xl border border-[#E4E1D8] bg-white p-3.5 shadow-xs transition-all hover:border-amber-500/50 hover:bg-[#F6F5F2] dark:border-[#24272E] dark:bg-[#16181D] dark:hover:bg-[#1E2127]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500/90 transition-transform group-hover:scale-105 dark:text-amber-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />

                  <line x1="16" x2="16" y1="2" y2="6" />

                  <line x1="8" x2="8" y1="2" y2="6" />
                </svg>
              </div>

              <div className="mt-2.5 text-sm font-semibold text-[#15171B] dark:text-[#F3F2EE]">
                Plan
              </div>

              <div className="mt-0.5 text-[11px] text-[#666970] dark:text-[#A8ABB3]">
                Roadmap &amp; Sprints
              </div>
            </a>

            {/* CONNECT */}

            <a
              href="#connect"
              className="group block rounded-xl border border-[#E4E1D8] bg-white p-3.5 shadow-xs transition-all hover:border-teal-500/50 hover:bg-[#F6F5F2] dark:border-[#24272E] dark:bg-[#16181D] dark:hover:bg-[#1E2127]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/10 text-teal-500/90 transition-transform group-hover:scale-105 dark:text-teal-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle cx="18" cy="5" r="3" />

                  <circle cx="6" cy="12" r="3" />

                  <circle cx="18" cy="19" r="3" />
                </svg>
              </div>

              <div className="mt-2.5 text-sm font-semibold text-[#15171B] dark:text-[#F3F2EE]">
                Connect
              </div>

              <div className="mt-0.5 text-[11px] text-[#666970] dark:text-[#A8ABB3]">
                Flows &amp; Graphs
              </div>
            </a>
          </div>
        </section>

        {/* ======================================================
            RECENT DOCUMENTS
        ====================================================== */}

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold uppercase tracking-wider text-[#9699A0] dark:text-[#686B74]">
              Recent Documents
            </div>

            <span className="text-xs text-[#666970] dark:text-[#A8ABB3]">
              4 active boards
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Document 1 */}

            <RecentDocument
              title="Design System Architecture"
              meta="Draw Canvas · Edited 12m ago by you"
              icon="draw"
              onShare={onShare}
            />

            {/* Document 2 */}

            <RecentDocument
              title="Product Requirements (PRD v2.4)"
              meta="Write Doc · Edited 1h ago"
              icon="write"
              onShare={onShare}
            />

            {/* Document 3 */}

            <RecentDocument
              title="Navigation Shell & Sidebar Spec"
              meta="Design Frame · Edited 3h ago"
              icon="design"
              onShare={onShare}
            />

            {/* Document 4 */}

            <RecentDocument
              title="Sprint Flow Integration Graph"
              meta="Connect Flow · Edited yesterday"
              icon="connect"
              onShare={onShare}
            />
          </div>
        </section>

        {/* ======================================================
            STARTER TEMPLATES
        ====================================================== */}

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9699A0] dark:text-[#686B74]">
                Starter Templates
              </span>

              <span className="text-xs text-[#9699A0] dark:text-[#686B74]">
                · Curated workflows &amp; starting points
              </span>
            </div>

            <button
              type="button"
              onClick={() => onTemplateUse("Browse All Templates")}
              className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              <span>Browse all</span>

              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {/* Product Design Sprint */}

            <TemplateCard
              title="Product Design Sprint"
              category="Design"
              description="Wireframe kit with user flow maps, UI components, and exportable spec frames."
              footer="5 artboards · UI Kit"
              icon="design"
              onUse={() => onTemplateUse("Product Design Sprint")}
            />

            {/* Weekly Team Sync */}

            <TemplateCard
              title="Weekly Team Sync & Roadmap"
              category="Plan"
              description="Structured Kanban board with sprint milestones, priority tags, and blocker logs."
              footer="Sprint view · 3 columns"
              icon="plan"
              onUse={() => onTemplateUse("Weekly Team Sync & Roadmap")}
            />

            {/* System Architecture */}

            <TemplateCard
              title="Interactive System Architecture"
              category="Architecture"
              description="Microservice topology diagrams, API gateways, database schemas, and service flows."
              footer="Cloud & DB blocks"
              icon="draw"
              onUse={() => onTemplateUse("Interactive System Architecture")}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Product Requirements */}

            <TemplateCard
              title="Product Requirements (PRD)"
              category="Docs"
              description="Standardized RFC & PRD layout covering problem statement, user stories, and acceptance criteria."
              footer="RFC format · Ready"
              icon="write"
              onUse={() => onTemplateUse("Product Requirements (PRD)")}
            />

            {/* User Research */}

            <TemplateCard
              title="User Research & Insights Matrix"
              category="Research"
              description="Connect interview notes, affinity clusters, pain point mapping, and customer journey graphs."
              footer="Affinity board · Tagged"
              icon="connect"
              onUse={() => onTemplateUse("User Research & Insights Matrix")}
            />
          </div>
        </section>

        {/* ======================================================
            FOOTER
        ====================================================== */}

        <footer className="mt-10 flex items-center justify-between border-t border-[#E4E1D8]/60 pt-8 text-xs text-[#9699A0] dark:border-[#24272E]/60 dark:text-[#686B74]">
          <span>FlowBoard Workspace · Sober, compact, focused.</span>

          <span>
            Press{" "}
            <kbd className="rounded border border-black/5 bg-black/5 px-1 py-0.5 font-mono dark:border-white/5 dark:bg-white/5">
              ⌘K
            </kbd>{" "}
            to jump anywhere
          </span>
        </footer>
      </div>
    </main>
  );
}

/* ================================================================
   RECENT DOCUMENT
================================================================ */

type RecentDocumentProps = {
  title: string;
  meta: string;
  icon: "draw" | "write" | "design" | "connect";
  onShare: () => void;
};

function RecentDocument({ title, meta, icon, onShare }: RecentDocumentProps) {
  const iconStyles = {
    draw: "bg-violet-500/10 text-violet-500",
    write: "bg-blue-500/10 text-blue-500",
    design: "bg-rose-500/10 text-rose-500",
    connect: "bg-teal-500/10 text-teal-500",
  };

  return (
    <div className="group flex items-start justify-between gap-3 rounded-xl border border-[#E4E1D8] bg-white p-4 transition-shadow hover:shadow-md dark:border-[#24272E] dark:bg-[#16181D]">
      <div className="flex min-w-0 items-start gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconStyles[icon]}`}
        >
          <DocumentIcon icon={icon} />
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-[#15171B] transition-colors group-hover:text-indigo-600 dark:text-[#F3F2EE] dark:group-hover:text-indigo-400">
            {title}
          </h3>

          <p className="mt-0.5 text-xs text-[#666970] dark:text-[#A8ABB3]">
            {meta}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onShare}
        aria-label={`Share ${title}`}
        className="shrink-0 rounded p-1 text-[#9699A0] transition-colors hover:text-[#15171B] dark:hover:text-[#F3F2EE]"
      >
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="18" cy="5" r="3" />

          <circle cx="6" cy="12" r="3" />

          <circle cx="18" cy="19" r="3" />

          <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />

          <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
        </svg>
      </button>
    </div>
  );
}

/* ================================================================
   TEMPLATE CARD
================================================================ */

type TemplateCardProps = {
  title: string;
  category: string;
  description: string;
  footer: string;
  icon: "draw" | "write" | "design" | "plan" | "connect";
  onUse: () => void;
};

function TemplateCard({
  title,
  category,
  description,
  footer,
  icon,
  onUse,
}: TemplateCardProps) {
  const categoryStyles = {
    draw: {
      icon: "bg-violet-500/10 text-violet-500",
      badge: "bg-violet-500/10 text-violet-500",
    },
    write: {
      icon: "bg-blue-500/10 text-blue-500",
      badge: "bg-blue-500/10 text-blue-500",
    },
    design: {
      icon: "bg-rose-500/10 text-rose-500",
      badge: "bg-rose-500/10 text-rose-500",
    },
    plan: {
      icon: "bg-amber-500/10 text-amber-500",
      badge: "bg-amber-500/10 text-amber-500",
    },
    connect: {
      icon: "bg-teal-500/10 text-teal-500",
      badge: "bg-teal-500/10 text-teal-500",
    },
  };

  const styles = categoryStyles[icon];

  return (
    <div className="group flex flex-col justify-between rounded-xl border border-[#E4E1D8] bg-white p-4 transition-shadow hover:shadow-md dark:border-[#24272E] dark:bg-[#16181D]">
      <div>
        <div className="flex items-center justify-between">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-lg ${styles.icon}`}
          >
            <TemplateIcon icon={icon} />
          </div>

          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${styles.badge}`}
          >
            {category}
          </span>
        </div>

        <h4 className="mt-3 text-sm font-semibold text-[#15171B] transition-colors group-hover:text-indigo-600 dark:text-[#F3F2EE] dark:group-hover:text-indigo-400">
          {title}
        </h4>

        <p className="mt-1 text-xs leading-relaxed text-[#666970] dark:text-[#A8ABB3]">
          {description}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[#E4E1D8]/60 pt-3 text-xs text-[#9699A0] dark:border-[#24272E]/60 dark:text-[#686B74]">
        <span>{footer}</span>

        <button
          type="button"
          onClick={onUse}
          className="flex items-center gap-1 font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Use template
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}

/* ================================================================
   DOCUMENT ICON
================================================================ */

function DocumentIcon({
  icon,
}: {
  icon: "draw" | "write" | "design" | "connect";
}) {
  if (icon === "draw") {
    return (
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      </svg>
    );
  }

  if (icon === "write") {
    return (
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <path d="M14 2v6h6" />
      </svg>
    );
  }

  if (icon === "design") {
    return (
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />

        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    );
  }

  return (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="18" cy="5" r="3" />

      <circle cx="6" cy="12" r="3" />

      <circle cx="18" cy="19" r="3" />
    </svg>
  );
}

/* ================================================================
   TEMPLATE ICON
================================================================ */

function TemplateIcon({
  icon,
}: {
  icon: "draw" | "write" | "design" | "plan" | "connect";
}) {
  if (icon === "draw") {
    return (
      <svg
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      </svg>
    );
  }

  if (icon === "write") {
    return (
      <svg
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <path d="M14 2v6h6" />
      </svg>
    );
  }

  if (icon === "design") {
    return (
      <svg
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />

        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    );
  }

  if (icon === "plan") {
    return (
      <svg
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />

        <line x1="16" x2="16" y1="2" y2="6" />

        <line x1="8" x2="8" y1="2" y2="6" />
      </svg>
    );
  }

  return (
    <svg
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="18" cy="5" r="3" />

      <circle cx="6" cy="12" r="3" />

      <circle cx="18" cy="19" r="3" />
    </svg>
  );
}
