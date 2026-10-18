"use client";

import type { MouseEvent as ReactMouseEvent } from "react";
import type { Workspace } from "@/types/workspace";

type DashboardSidebarProps = {
  isCollapsed: boolean;
  isDarkMode: boolean;
  workspaceMenuOpen: boolean;
  profileMenuOpen: boolean;

  onToggleWorkspaceMenu: (event: ReactMouseEvent<HTMLButtonElement>) => void;

  onToggleProfileMenu: (event: ReactMouseEvent<HTMLButtonElement>) => void;

  onSearch: () => void;
  onShare: () => void;
  onToggleTheme: () => void;
  onLogout: () => void;

  onAction: (message: string) => void;

  isLoggingOut: boolean;

  userName: string;
  userEmail: string;

  workspaceName: string;

  /* ============================================================
     WORKSPACE DATA
  ============================================================ */

  workspaces: Workspace[];
  selectedWorkspace: Workspace | null;
  workspaceLoading: boolean;

  onSelectWorkspace: (workspace: Workspace) => void;

  onCreateWorkspace: () => void;
};

export default function DashboardSidebar({
  isCollapsed,
  isDarkMode,
  workspaceMenuOpen,
  profileMenuOpen,
  onToggleWorkspaceMenu,
  onToggleProfileMenu,
  onSearch,
  onShare,
  onToggleTheme,
  onLogout,
  onAction,
  isLoggingOut,
  userName,
  userEmail,
  workspaceName,

  workspaces,
  selectedWorkspace,
  workspaceLoading,
  onSelectWorkspace,
  onCreateWorkspace,
}: DashboardSidebarProps) {
  return (
    <aside
      className={`${
        isCollapsed ? "w-[68px] sidebar-collapsed" : "w-[264px]"
      } transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] h-full min-h-0 overflow-visible bg-[#F6F5F2] dark:bg-[#0D0E11] border-r border-[#E4E1D8] dark:border-[#24272E] flex flex-col select-none relative z-20 shrink-0 shadow-[1px_0_4px_rgba(0,0,0,0.015)]`}
      id="flowboardSidebar"
    >
      {/* ============================================================
          WORKSPACE HEADER
      ============================================================ */}

      <div className="relative shrink-0 px-3 pt-3 pb-2.5 border-b border-[#E4E1D8]/60 dark:border-[#24272E]/70 space-y-2">
        <div className="flex items-center gap-1.5">
          {/* Workspace switcher */}

          <button
            className="flex-1 flex items-center justify-between p-1.5 rounded-lg hover:bg-[#EFECE6] dark:hover:bg-[#16181D] active:bg-[#E8E4DC] dark:active:bg-[#1E2127] border border-transparent hover:border-black/5 dark:hover:border-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 transition-all text-left group overflow-hidden"
            id="workspaceSwitcherBtn"
            onClick={onToggleWorkspaceMenu}
            type="button"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Workspace icon */}

              <div className="w-7 h-7 rounded-[6px] bg-gradient-to-b from-[#1E2127] to-[#111215] dark:from-[#2A2E38] dark:to-[#171920] border border-black/10 dark:border-white/10 flex items-center justify-center shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.12)] group-hover:scale-105 transition-transform">
                <svg
                  className="w-4 h-4 text-[#F3F2EE]"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3v18" />

                  <circle
                    cx="6"
                    cy="7"
                    fill="currentColor"
                    fillOpacity="0.3"
                    r="2.5"
                  />

                  <circle
                    cx="18"
                    cy="7"
                    fill="currentColor"
                    fillOpacity="0.3"
                    r="2.5"
                  />

                  <circle
                    cx="12"
                    cy="17"
                    fill="currentColor"
                    fillOpacity="0.3"
                    r="2.5"
                  />

                  <path d="M8.5 7h7" />
                  <path d="M6 9.5l4 5" />
                  <path d="M18 9.5l-4 5" />
                </svg>
              </div>

              {/* Workspace name */}

              <div className="sidebar-text-element flex flex-col min-w-0 leading-none">
                <span className="text-[13.5px] font-semibold text-[#15171B] dark:text-[#F3F2EE] tracking-[-0.01em] truncate">
                  {workspaceLoading ? "Loading..." : workspaceName}
                </span>

                <span className="text-[11px] text-[#666970] dark:text-[#A8ABB3] mt-1 tracking-tight truncate">
                  Personal workspace
                </span>
              </div>
            </div>

            {/* Dropdown arrow */}

            <div className="sidebar-text-element text-[#9699A0] dark:text-[#686B74] group-hover:text-[#15171B] dark:group-hover:text-[#F3F2EE] transition-colors shrink-0 ml-1">
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  workspaceMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </button>

          {/* Share button */}

          <button
            className="sidebar-text-element p-1.5 h-8 w-8 rounded-lg border border-[#E4E1D8] dark:border-[#24272E] bg-white dark:bg-[#16181D] hover:bg-[#EFECE6] dark:hover:bg-[#1E2127] text-[#666970] dark:text-[#A8ABB3] hover:text-[#15171B] dark:hover:text-[#F3F2EE] transition-all flex items-center justify-center shrink-0 shadow-xs focus:outline-none"
            id="shareBtnTop"
            onClick={onShare}
            title="Share Workspace"
            type="button"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="18" cy="5" r="3" />

              <circle cx="6" cy="12" r="3" />

              <circle cx="18" cy="19" r="3" />

              <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />

              <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
            </svg>
          </button>
        </div>

        {/* Search */}

        <button
          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border border-[#E4E1D8] dark:border-[#24272E] bg-white/70 dark:bg-[#16181D]/80 hover:bg-white dark:hover:bg-[#1E2127] hover:border-black/20 dark:hover:border-white/20 text-[#666970] dark:text-[#A8ABB3] hover:text-[#15171B] dark:hover:text-[#F3F2EE] shadow-xs group transition-all text-left relative"
          onClick={onSearch}
          type="button"
        >
          <div className="flex items-center gap-2 truncate">
            <svg
              className="w-3.5 h-3.5 text-[#9699A0] dark:text-[#686B74] group-hover:text-[#15171B] dark:group-hover:text-[#F3F2EE] transition-colors shrink-0"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />

              <path d="m21 21-4.3-4.3" />
            </svg>

            <span className="sidebar-text-element text-[12px] truncate">
              Quick search...
            </span>
          </div>

          <div className="sidebar-text-element flex items-center gap-0.5 text-[10px] font-mono text-[#9699A0] dark:text-[#686B74] bg-[#F1EFEA] dark:bg-[#0D0E11] border border-black/5 dark:border-white/10 px-1.5 py-0.5 rounded shadow-xs">
            <span>⌘</span>
            <span>K</span>
          </div>

          <div className="nav-tooltip absolute left-full ml-2 px-2 py-1 bg-[#15171B] dark:bg-[#F3F2EE] text-white dark:text-[#15171B] text-[11px] font-medium rounded-md shadow-lg pointer-events-none z-50 whitespace-nowrap">
            Search (⌘K)
          </div>
        </button>

        {/* ========================================================
            WORKSPACE MENU
        ======================================================== */}

        <div
          className={`absolute left-3 right-3 top-[56px] bg-white dark:bg-[#16181D] border border-[#E4E1D8] dark:border-[#24272E] rounded-xl shadow-xl z-50 p-1.5 text-xs animate-in fade-in zoom-in-95 duration-150 ${
            workspaceMenuOpen ? "" : "hidden"
          }`}
          id="workspaceMenu"
        >
          <div className="px-2 py-1.5 text-[10px] uppercase font-bold tracking-wider text-[#9699A0] dark:text-[#686B74]">
            Workspaces
          </div>

          {/* ======================================================
              REAL WORKSPACE LIST
          ====================================================== */}

          <div className="max-h-52 overflow-y-auto custom-scrollbar">
            {workspaceLoading ? (
              <div className="px-2.5 py-2 text-[#9699A0] dark:text-[#686B74]">
                Loading workspaces...
              </div>
            ) : workspaces.length === 0 ? (
              <div className="px-2.5 py-2 text-[#9699A0] dark:text-[#686B74]">
                No workspaces found.
              </div>
            ) : (
              workspaces.map((workspace) => {
                const isSelected = selectedWorkspace?._id === workspace._id;

                return (
                  <button
                    key={workspace._id}
                    type="button"
                    onClick={() => onSelectWorkspace(workspace)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
                      isSelected
                        ? "bg-[#F6F5F2] dark:bg-[#1E2127] text-[#15171B] dark:text-[#F3F2EE] font-medium"
                        : "hover:bg-[#F6F5F2] dark:hover:bg-[#1E2127] text-[#666970] dark:text-[#A8ABB3] hover:text-[#15171B] dark:hover:text-[#F3F2EE]"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          isSelected
                            ? "bg-emerald-500"
                            : "bg-transparent border border-black/20 dark:border-white/20"
                        }`}
                      />

                      <span className="truncate">{workspace.name}</span>
                    </div>

                    {isSelected && (
                      <svg
                        className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                );
              })
            )}
          </div>

          <div className="my-1 border-t border-[#E4E1D8] dark:border-[#24272E]" />

          {/* Share */}

          <button
            type="button"
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-[#F6F5F2] dark:hover:bg-[#1E2127] text-[#666970] dark:text-[#A8ABB3] hover:text-[#15171B] dark:hover:text-[#F3F2EE] transition-colors"
            onClick={onShare}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="18" cy="5" r="3" />

              <circle cx="6" cy="12" r="3" />

              <circle cx="18" cy="19" r="3" />

              <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />

              <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
            </svg>

            <span>Share Workspace...</span>
          </button>

          {/* Create workspace */}

          <button
            type="button"
            onClick={onCreateWorkspace}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-[#F6F5F2] dark:hover:bg-[#1E2127] text-[#666970] dark:text-[#A8ABB3] hover:text-[#15171B] dark:hover:text-[#F3F2EE] transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>

            <span>Create workspace</span>
          </button>

          {/* Workspace settings */}

          <button
            type="button"
            onClick={() =>
              onAction("Workspace settings are ready for configuration.")
            }
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-[#F6F5F2] dark:hover:bg-[#1E2127] text-[#666970] dark:text-[#A8ABB3] hover:text-[#15171B] dark:hover:text-[#F3F2EE] transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />

              <circle cx="12" cy="12" r="3" />
            </svg>

            <span>Workspace settings</span>
          </button>
        </div>
      </div>

      {/* ============================================================
          MAIN NAVIGATION
      ============================================================ */}

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden custom-scrollbar px-2.5 py-3 space-y-4">
        {/* ========================================================
            HOME
        ======================================================== */}

        <div>
          <div className="sidebar-text-element px-2 pb-1.5 text-[10.5px] font-semibold tracking-wider text-[#9699A0] dark:text-[#686B74] uppercase">
            HOME
          </div>

          <nav aria-label="Home Navigation" className="space-y-0.5">
            <a
              className="group relative flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13.5px] font-medium bg-[#E8E4DC] dark:bg-[#1E2127] text-[#15171B] dark:text-[#F3F2EE] transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500"
              href="#home"
            >
              <svg
                className="w-[17px] h-[17px] text-[#15171B] dark:text-[#F3F2EE] shrink-0"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />

                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>

              <span className="sidebar-text-element truncate">Home</span>

              <div className="nav-tooltip absolute left-full ml-2 px-2 py-1 bg-[#15171B] dark:bg-[#F3F2EE] text-white dark:text-[#15171B] text-[11px] font-medium rounded-md shadow-lg pointer-events-none z-50 whitespace-nowrap">
                Home
              </div>
            </a>

            <a
              className="group relative flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13.5px] text-[#666970] dark:text-[#A8ABB3] hover:text-[#15171B] dark:hover:text-[#F3F2EE] hover:bg-[#EFECE6] dark:hover:bg-[#16181D] transition-all"
              href="#recents"
            >
              <svg
                className="w-[17px] h-[17px] shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />

                <polyline points="12 6 12 12 16 14" />
              </svg>

              <span className="sidebar-text-element truncate">Recents</span>

              <div className="nav-tooltip absolute left-full ml-2 px-2 py-1 bg-[#15171B] dark:bg-[#F3F2EE] text-white dark:text-[#15171B] text-[11px] rounded-md shadow-lg pointer-events-none z-50 whitespace-nowrap">
                Recents
              </div>
            </a>

            <a
              className="group relative flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13.5px] text-[#666970] dark:text-[#A8ABB3] hover:text-[#15171B] dark:hover:text-[#F3F2EE] hover:bg-[#EFECE6] dark:hover:bg-[#16181D] transition-all"
              href="#favorites"
            >
              <svg
                className="w-[17px] h-[17px] shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>

              <span className="sidebar-text-element truncate">Favorites</span>

              <div className="nav-tooltip absolute left-full ml-2 px-2 py-1 bg-[#15171B] dark:bg-[#F3F2EE] text-white dark:text-[#15171B] text-[11px] rounded-md shadow-lg pointer-events-none z-50 whitespace-nowrap">
                Favorites
              </div>
            </a>
          </nav>
        </div>

        {/* ========================================================
            CREATE
        ======================================================== */}

        <div>
          <div className="sidebar-text-element px-2 pb-1.5 text-[10.5px] font-semibold tracking-wider text-[#9699A0] dark:text-[#686B74] uppercase">
            CREATE
          </div>

          <nav aria-label="Create Environments" className="space-y-0.5">
            <a
              className="group relative flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13.5px] text-[#666970] dark:text-[#A8ABB3] hover:text-[#15171B] dark:hover:text-[#F3F2EE] hover:bg-[#EFECE6] dark:hover:bg-[#16181D] transition-all"
              href="#draw"
            >
              <svg
                className="w-[17px] h-[17px] text-indigo-500 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>

              <span className="sidebar-text-element truncate">Draw</span>

              <div className="nav-tooltip absolute left-full ml-2 px-2 py-1 bg-[#15171B] dark:bg-[#F3F2EE] text-white dark:text-[#15171B] text-[11px] rounded-md shadow-lg pointer-events-none z-50 whitespace-nowrap">
                Draw
              </div>
            </a>

            <a
              className="group relative flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13.5px] text-[#666970] dark:text-[#A8ABB3] hover:text-[#15171B] dark:hover:text-[#F3F2EE] hover:bg-[#EFECE6] dark:hover:bg-[#16181D] transition-all"
              href="#write"
            >
              <svg
                className="w-[17px] h-[17px] text-blue-500 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2Z" />

                <polyline points="14 2 14 8 20 8" />

                <line x1="16" x2="8" y1="13" y2="13" />

                <line x1="16" x2="8" y1="17" y2="17" />

                <line x1="10" x2="8" y1="9" y2="9" />
              </svg>

              <span className="sidebar-text-element truncate">Write</span>

              <div className="nav-tooltip absolute left-full ml-2 px-2 py-1 bg-[#15171B] dark:bg-[#F3F2EE] text-white dark:text-[#15171B] text-[11px] rounded-md shadow-lg pointer-events-none z-50 whitespace-nowrap">
                Write
              </div>
            </a>

            <a
              className="group relative flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13.5px] text-[#666970] dark:text-[#A8ABB3] hover:text-[#15171B] dark:hover:text-[#F3F2EE] hover:bg-[#EFECE6] dark:hover:bg-[#16181D] transition-all"
              href="#design"
            >
              <svg
                className="w-[17px] h-[17px] text-rose-500/90 dark:text-rose-400 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect height="18" rx="2" width="18" x="3" y="3" />

                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>

              <span className="sidebar-text-element truncate">Design</span>

              <div className="nav-tooltip absolute left-full ml-2 px-2 py-1 bg-[#15171B] dark:bg-[#F3F2EE] text-white dark:text-[#15171B] text-[11px] rounded-md shadow-lg pointer-events-none z-50 whitespace-nowrap">
                Design
              </div>
            </a>

            <a
              className="group relative flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13.5px] text-[#666970] dark:text-[#A8ABB3] hover:text-[#15171B] dark:hover:text-[#F3F2EE] hover:bg-[#EFECE6] dark:hover:bg-[#16181D] transition-all"
              href="#plan"
            >
              <svg
                className="w-[17px] h-[17px] text-amber-500/90 dark:text-amber-400 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect height="18" rx="2" width="18" x="3" y="4" />

                <line x1="16" x2="16" y1="2" y2="6" />

                <line x1="8" x2="8" y1="2" y2="6" />

                <line x1="3" x2="21" y1="10" y2="10" />

                <path d="m9 16 2 2 4-4" />
              </svg>

              <span className="sidebar-text-element truncate">Plan</span>

              <div className="nav-tooltip absolute left-full ml-2 px-2 py-1 bg-[#15171B] dark:bg-[#F3F2EE] text-white dark:text-[#15171B] text-[11px] rounded-md shadow-lg pointer-events-none z-50 whitespace-nowrap">
                Plan
              </div>
            </a>

            <a
              className="group relative flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13.5px] text-[#666970] dark:text-[#A8ABB3] hover:text-[#15171B] dark:hover:text-[#F3F2EE] hover:bg-[#EFECE6] dark:hover:bg-[#16181D] transition-all"
              href="#connect"
            >
              <svg
                className="w-[17px] h-[17px] text-teal-500/90 dark:text-teal-400 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="18" cy="5" r="3" />

                <circle cx="6" cy="12" r="3" />

                <circle cx="18" cy="19" r="3" />

                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />

                <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
              </svg>

              <span className="sidebar-text-element truncate">Connect</span>

              <div className="nav-tooltip absolute left-full ml-2 px-2 py-1 bg-[#15171B] dark:bg-[#F3F2EE] text-white dark:text-[#15171B] text-[11px] rounded-md shadow-lg pointer-events-none z-50 whitespace-nowrap">
                Connect
              </div>
            </a>
          </nav>
        </div>

        {/* ========================================================
            ORGANIZE
        ======================================================== */}

        <div>
          <div className="sidebar-text-element px-2 pb-1.5 text-[10.5px] font-semibold tracking-wider text-[#9699A0] dark:text-[#686B74] uppercase">
            ORGANIZE
          </div>

          <nav aria-label="Organize Navigation" className="space-y-0.5">
            <a
              className="group relative flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13.5px] text-[#666970] dark:text-[#A8ABB3] hover:text-[#15171B] dark:hover:text-[#F3F2EE] hover:bg-[#EFECE6] dark:hover:bg-[#16181D] transition-all"
              href="#resources"
            >
              <svg
                className="w-[17px] h-[17px] shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
              </svg>

              <span className="sidebar-text-element truncate">Resources</span>

              <div className="nav-tooltip absolute left-full ml-2 px-2 py-1 bg-[#15171B] dark:bg-[#F3F2EE] text-white dark:text-[#15171B] text-[11px] rounded-md shadow-lg pointer-events-none z-50 whitespace-nowrap">
                Resources
              </div>
            </a>

            <a
              className="group relative flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13.5px] text-[#666970] dark:text-[#A8ABB3] hover:text-[#15171B] dark:hover:text-[#F3F2EE] hover:bg-[#EFECE6] dark:hover:bg-[#16181D] transition-all"
              href="#trash"
            >
              <svg
                className="w-[17px] h-[17px] shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>

              <span className="sidebar-text-element truncate">Trash</span>

              <div className="nav-tooltip absolute left-full ml-2 px-2 py-1 bg-[#15171B] dark:bg-[#F3F2EE] text-white dark:text-[#15171B] text-[11px] rounded-md shadow-lg pointer-events-none z-50 whitespace-nowrap">
                Trash
              </div>
            </a>
          </nav>
        </div>
      </div>

      {/* ============================================================
          BOTTOM AREA
      ============================================================ */}

      <div className="shrink-0 p-2.5 border-t border-[#E4E1D8]/60 dark:border-[#24272E]/70 space-y-1 bg-[#F6F5F2] dark:bg-[#0D0E11] relative">
        {/* Settings */}

        <a
          className="group relative flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13.5px] text-[#666970] dark:text-[#A8ABB3] hover:text-[#15171B] dark:hover:text-[#F3F2EE] hover:bg-[#EFECE6] dark:hover:bg-[#16181D] transition-all"
          href="#settings"
        >
          <svg
            className="w-[17px] h-[17px] shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />

            <circle cx="12" cy="12" r="3" />
          </svg>

          <span className="sidebar-text-element truncate">Settings</span>

          <div className="nav-tooltip absolute left-full ml-2 px-2 py-1 bg-[#15171B] dark:bg-[#F3F2EE] text-white dark:text-[#15171B] text-[11px] font-medium rounded-md shadow-lg pointer-events-none z-50 whitespace-nowrap">
            Settings
          </div>
        </a>

        {/* Profile */}

        <div className="relative">
          <button
            className="w-full flex items-center justify-between p-1.5 rounded-lg hover:bg-[#EFECE6] dark:hover:bg-[#16181D] active:bg-[#E8E4DC] dark:active:bg-[#1E2127] border border-transparent hover:border-black/5 dark:hover:border-white/5 focus:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500/40 transition-all text-left group"
            id="profileRowBtn"
            onClick={onToggleProfileMenu}
            type="button"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-600 to-indigo-600 p-[1px] shrink-0 shadow-xs">
                <div className="w-full h-full rounded-full bg-[#E8E4DC] dark:bg-[#24272E] flex items-center justify-center text-[11px] font-bold text-[#15171B] dark:text-[#F3F2EE] tracking-tight">
                  {userName
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((part) => part[0]?.toUpperCase())
                    .join("")}
                </div>
              </div>

              <div className="sidebar-text-element flex flex-col min-w-0 leading-none">
                <span className="text-[13px] font-semibold text-[#15171B] dark:text-[#F3F2EE] tracking-tight truncate">
                  {userName}
                </span>

                <span className="text-[11px] text-[#666970] dark:text-[#A8ABB3] mt-1 tracking-tight truncate">
                  {userEmail}
                </span>
              </div>
            </div>

            <div className="sidebar-text-element text-[#9699A0] dark:text-[#686B74] group-hover:text-[#15171B] dark:group-hover:text-[#F3F2EE] transition-colors shrink-0 ml-1">
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  profileMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </div>

            <div className="nav-tooltip absolute left-full ml-2 px-2 py-1 bg-[#15171B] dark:bg-[#F3F2EE] text-white dark:text-[#15171B] text-[11px] font-medium rounded-md shadow-lg pointer-events-none z-50 whitespace-nowrap">
              {userName} (Account)
            </div>
          </button>

          {/* Profile menu */}

          <div
            className={`absolute left-0 right-0 bottom-full mb-1.5 bg-white dark:bg-[#16181D] border border-[#E4E1D8] dark:border-[#24272E] rounded-xl shadow-xl z-50 p-1.5 text-xs animate-in fade-in zoom-in-95 duration-150 ${
              profileMenuOpen ? "" : "hidden"
            }`}
            id="profileMenu"
          >
            <div className="px-2 py-1.5 border-b border-[#E4E1D8] dark:border-[#24272E] mb-1">
              <div className="font-semibold text-[#15171B] dark:text-[#F3F2EE]">
                {userName}
              </div>

              <div className="text-[11px] text-[#666970] dark:text-[#A8ABB3] truncate">
                {userEmail}
              </div>
            </div>

            {/* Profile */}

            <button
              type="button"
              onClick={() =>
                onAction(
                  "Profile settings will be connected to your account settings.",
                )
              }
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-[#F6F5F2] dark:hover:bg-[#1E2127] text-[#666970] dark:text-[#A8ABB3] hover:text-[#15171B] dark:hover:text-[#F3F2EE] transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>

              <span>Profile</span>
            </button>

            {/* Share */}

            <button
              type="button"
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-[#F6F5F2] dark:hover:bg-[#1E2127] text-[#666970] dark:text-[#A8ABB3] hover:text-[#15171B] dark:hover:text-[#F3F2EE] transition-colors"
              onClick={onShare}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="18" cy="5" r="3" />

                <circle cx="6" cy="12" r="3" />

                <circle cx="18" cy="19" r="3" />

                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />

                <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
              </svg>

              <span>Share Access</span>
            </button>

            {/* Theme */}

            <button
              type="button"
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-[#F6F5F2] dark:hover:bg-[#1E2127] text-[#666970] dark:text-[#A8ABB3] hover:text-[#15171B] dark:hover:text-[#F3F2EE] transition-colors"
              onClick={onToggleTheme}
            >
              <svg
                className="w-3.5 h-3.5 hidden dark:block text-amber-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
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

              <svg
                className="w-3.5 h-3.5 block dark:hidden text-[#666970]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>

              <span id="menuThemeLabel">
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </button>

            <div className="my-1 border-t border-[#E4E1D8] dark:border-[#24272E]" />

            {/* Logout */}

            <button
              type="button"
              disabled={isLoggingOut}
              onClick={onLogout}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />

                <polyline points="16 17 21 12 16 7" />

                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>

              <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
