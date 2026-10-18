"use client";

import { useEffect, useRef } from "react";

type SearchPaletteProps = {
  searchOpen: boolean;
  onClose: () => void;
  onFilter: (query: string) => void;
};

export default function SearchPalette({
  searchOpen,
  onClose,
  onFilter,
}: SearchPaletteProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // ============================================================
  // FOCUS INPUT WHEN OPENED
  // ============================================================

  useEffect(() => {
    if (!searchOpen) {
      return;
    }

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    return () => {
      window.clearTimeout(timer);
    };
  }, [searchOpen]);

  // ============================================================
  // KEYBOARD NAVIGATION
  // ============================================================

  useEffect(() => {
    if (!searchOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchOpen, onClose]);

  // ============================================================
  // DON'T RENDER ACTIVE MODAL WHEN CLOSED
  // ============================================================

  return (
    <div
      id="searchModalOverlay"
      className={`fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-20 backdrop-blur-xs dark:bg-black/70 ${
        searchOpen ? "opacity-100" : "pointer-events-none hidden opacity-0"
      }`}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      aria-hidden={!searchOpen}
    >
      {/* ========================================================
          SEARCH PALETTE
      ======================================================== */}

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search FlowBoard"
        className={`w-full max-w-lg overflow-hidden rounded-xl border border-[#E4E1D8] bg-white shadow-2xl transition-all duration-150 dark:border-[#24272E] dark:bg-[#16181D] ${
          searchOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* ======================================================
            SEARCH INPUT
        ====================================================== */}

        <div className="flex items-center gap-2.5 border-b border-[#E4E1D8] p-3 dark:border-[#24272E]">
          {/* Search icon */}

          <svg
            className="h-4 w-4 shrink-0 text-[#9699A0] dark:text-[#686B74]"
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

          {/* Input */}

          <input
            ref={inputRef}
            id="searchPaletteInput"
            type="text"
            placeholder="Search boards, notes, drawings, or jump to..."
            autoComplete="off"
            spellCheck={false}
            onChange={(event) => onFilter(event.currentTarget.value)}
            className="flex-1 bg-transparent text-sm text-[#15171B] outline-none placeholder:text-[#9699A0] dark:text-[#F3F2EE] dark:placeholder:text-[#686B74]"
          />

          {/* Escape shortcut */}

          <kbd className="shrink-0 rounded border border-black/5 bg-black/5 px-1.5 py-0.5 font-mono text-[10px] text-[#666970] dark:border-white/5 dark:bg-white/10 dark:text-[#A8ABB3]">
            ESC
          </kbd>
        </div>

        {/* ======================================================
            SEARCH RESULTS
        ====================================================== */}

        <div
          id="searchResultsContainer"
          className="max-h-72 space-y-1 overflow-x-hidden overflow-y-auto p-2 text-xs"
        >
          {/* Section title */}

          <div className="px-2 py-1 text-[10px] font-semibold uppercase text-[#9699A0] dark:text-[#686B74]">
            Quick Jump
          </div>

          {/* ====================================================
              HOME
          ==================================================== */}

          <a
            href="#home"
            className="search-item flex items-center justify-between rounded-lg px-2.5 py-2 text-[#15171B] transition-colors hover:bg-[#F6F5F2] dark:text-[#F3F2EE] dark:hover:bg-[#1E2127]"
            onClick={onClose}
          >
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-[#666970] dark:text-[#A8ABB3]"
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

              <span className="font-medium">Home</span>
            </div>

            <span className="text-[11px] text-[#9699A0] dark:text-[#686B74]">
              Workspace root
            </span>
          </a>

          {/* ====================================================
              DRAW
          ==================================================== */}

          <a
            href="#draw"
            className="search-item flex items-center justify-between rounded-lg px-2.5 py-2 text-[#15171B] transition-colors hover:bg-[#F6F5F2] dark:text-[#F3F2EE] dark:hover:bg-[#1E2127]"
            onClick={onClose}
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-violet-500" />

              <span className="font-medium">Draw - Canvas Board</span>
            </div>

            <span className="text-[11px] text-[#9699A0] dark:text-[#686B74]">
              Drawing env
            </span>
          </a>

          {/* ====================================================
              WRITE
          ==================================================== */}

          <a
            href="#write"
            className="search-item flex items-center justify-between rounded-lg px-2.5 py-2 text-[#15171B] transition-colors hover:bg-[#F6F5F2] dark:text-[#F3F2EE] dark:hover:bg-[#1E2127]"
            onClick={onClose}
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />

              <span className="font-medium">
                Write - Documentation &amp; Specs
              </span>
            </div>

            <span className="text-[11px] text-[#9699A0] dark:text-[#686B74]">
              Writing env
            </span>
          </a>

          {/* ====================================================
              DESIGN
          ==================================================== */}

          <a
            href="#design"
            className="search-item flex items-center justify-between rounded-lg px-2.5 py-2 text-[#15171B] transition-colors hover:bg-[#F6F5F2] dark:text-[#F3F2EE] dark:hover:bg-[#1E2127]"
            onClick={onClose}
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-rose-500" />

              <span className="font-medium">Design - FlowBoard UI Kit</span>
            </div>

            <span className="text-[11px] text-[#9699A0] dark:text-[#686B74]">
              Design env
            </span>
          </a>

          {/* ====================================================
              CONNECT
          ==================================================== */}

          <a
            href="#connect"
            className="search-item flex items-center justify-between rounded-lg px-2.5 py-2 text-[#15171B] transition-colors hover:bg-[#F6F5F2] dark:text-[#F3F2EE] dark:hover:bg-[#1E2127]"
            onClick={onClose}
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-teal-500" />

              <span className="font-medium">
                Connect - Integrations &amp; Graphs
              </span>
            </div>

            <span className="text-[11px] text-[#9699A0] dark:text-[#686B74]">
              Connect env
            </span>
          </a>
        </div>

        {/* ======================================================
            FOOTER
        ====================================================== */}

        <div className="flex items-center justify-between border-t border-[#E4E1D8] bg-[#FAF9F5] p-2.5 text-[11px] text-[#9699A0] dark:border-[#24272E] dark:bg-[#0D0E11] dark:text-[#686B74]">
          <span>Navigate with arrows</span>

          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
}
