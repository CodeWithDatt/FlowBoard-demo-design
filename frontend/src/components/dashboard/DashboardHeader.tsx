"use client";

type DashboardHeaderProps = {
  isCollapsed: boolean;
  isDarkMode: boolean;
  isMinimalNav: boolean;
  onToggleMinimalNav: () => void;
  onSearch: () => void;
  onShare: () => void;
  onToggleCollapse: () => void;
  onToggleTheme: () => void;
};

export default function DashboardHeader({
  isCollapsed,
  isDarkMode,
  isMinimalNav,
  onToggleMinimalNav,
  onSearch,
  onShare,
  onToggleCollapse,
  onToggleTheme,
}: DashboardHeaderProps) {
  return (
    <header
      id="globalAppHeader"
      className="z-30 flex h-12 shrink-0 items-center justify-between border-b border-[#D8D5CC] bg-[#F1EFEA] px-4 text-xs transition-all duration-300 dark:border-[#1E2127] dark:bg-[#111317]"
    >
      {/* ======================================================
          BRAND
      ====================================================== */}

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-[#15171B] dark:text-[#F3F2EE]">
          {/* Minimal navigation toggle */}

          <button
            type="button"
            onClick={onToggleMinimalNav}
            title={
              isMinimalNav
                ? "Show FlowBoard brand"
                : "Show logo-only navigation"
            }
            aria-label={
              isMinimalNav
                ? "Show FlowBoard brand"
                : "Show logo-only navigation"
            }
            className="flex h-5 w-5 items-center justify-center rounded-[5px] bg-accent text-[11px] font-bold !text-white shadow-sm transition-transform hover:scale-105 active:scale-95"
          >
            F
          </button>

          <span
            id="brandText"
            className={`transition-all duration-200 ${
              isMinimalNav ? "hidden" : "inline"
            }`}
          >
            FlowBoard
          </span>
        </div>
      </div>

      {/* ======================================================
          HEADER ACTIONS
      ====================================================== */}

      <div className="flex items-center gap-2 sm:gap-3">
        {/* ====================================================
            SEARCH
        ==================================================== */}

        <button
          type="button"
          onClick={onSearch}
          aria-label="Search FlowBoard"
          className="hidden items-center gap-2 rounded-lg border border-black/10 bg-white/50 px-2.5 py-1 text-[#666970] transition-all hover:bg-white hover:text-[#15171B] dark:border-white/10 dark:bg-white/5 dark:text-[#A8ABB3] dark:hover:bg-[#1E2127] dark:hover:text-[#F3F2EE] sm:flex"
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
            <circle cx="11" cy="11" r="8" />

            <path d="m21 21-4.3-4.3" />
          </svg>

          <span>Search</span>

          <kbd className="rounded bg-black/5 px-1 font-mono text-[10px] text-[#9699A0] dark:bg-white/10 dark:text-[#686B74]">
            ⌘K
          </kbd>
        </button>

        {/* ====================================================
            SHARE
        ==================================================== */}

        <button
          type="button"
          onClick={onShare}
          aria-label="Share workspace"
          className="flex items-center gap-1.5 rounded-lg border border-black/10 bg-white/50 px-2.5 py-1 font-medium text-[#15171B] shadow-xs transition-all hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-[#F3F2EE] dark:hover:bg-[#1E2127]"
        >
          <svg
            className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400"
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

          <span>Share</span>
        </button>

        {/* ====================================================
            DIVIDER
        ==================================================== */}

        <div className="hidden h-4 w-px bg-black/10 dark:bg-white/10 sm:block" />

        {/* ====================================================
            SIDEBAR + THEME CONTROLS
        ==================================================== */}

        <div className="flex items-center gap-1 rounded-lg border border-black/5 bg-black/5 p-1 dark:border-white/5 dark:bg-white/5">
          {/* Sidebar toggle */}

          <button
            id="toggleCollapseBtn"
            type="button"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium text-[#15171B] transition-colors hover:bg-white dark:text-[#F3F2EE] dark:hover:bg-[#1E2127]"
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
              <rect x="3" y="3" width="18" height="18" rx="2" />

              <path d="M9 3v18" />

              <path d="m14 9-3 3 3 3" />
            </svg>

            <span id="collapseBtnText">
              {isCollapsed ? "Expand" : "Collapse"}
            </span>
          </button>

          {/* Theme toggle */}

          <button
            id="toggleThemeBtn"
            type="button"
            onClick={onToggleTheme}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            className="flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium text-[#15171B] transition-colors hover:bg-white dark:text-[#F3F2EE] dark:hover:bg-[#1E2127]"
          >
            {/* Sun */}

            <svg
              id="themeIconSun"
              className="hidden h-3.5 w-3.5 text-amber-400 dark:block"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />

              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>

            {/* Moon */}

            <svg
              id="themeIconMoon"
              className="block h-3.5 w-3.5 text-[#666970] dark:hidden"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>

            <span id="themeBtnText">
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
