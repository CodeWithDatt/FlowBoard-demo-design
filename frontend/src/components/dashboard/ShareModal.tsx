"use client";

type ShareModalProps = {
  shareOpen: boolean;
  copied: boolean;
  inviteSuccess: boolean;

  workspaceName: string;
  workspaceSlug: string;

  onClose: () => void;
  onCopy: () => void;
  onInvite: () => void;
};

export default function ShareModal({
  shareOpen,
  copied,
  inviteSuccess,
  workspaceName,
  workspaceSlug,
  onClose,
  onCopy,
  onInvite,
}: ShareModalProps) {
  // ============================================================
  // APP URL
  // ============================================================

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000");

  const safeAppUrl = appUrl.replace(/\/$/, "");

  // ============================================================
  // WORKSPACE SLUG
  // ============================================================

  const safeWorkspaceSlug = workspaceSlug || "my-workspace";

  // ============================================================
  // SHARE LINK
  // ============================================================

  const shareLink = `${safeAppUrl}/ws/${encodeURIComponent(safeWorkspaceSlug)}`;

  return (
    <div
      id="shareModalOverlay"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs transition-opacity duration-150 dark:bg-black/70 ${
        shareOpen ? "opacity-100" : "pointer-events-none hidden opacity-0"
      }`}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={`w-full max-w-md space-y-4 rounded-xl border border-[#E4E1D8] bg-white p-5 shadow-2xl dark:border-[#24272E] dark:bg-[#16181D] ${
          shareOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        } transition-all duration-150`}
      >
        {/* ========================================================
            HEADER
        ======================================================== */}

        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-2">
            {/* Share Icon */}

            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400">
              <svg
                className="h-4 w-4"
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
            </div>

            {/* Heading */}

            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-[#15171B] dark:text-[#F3F2EE]">
                Share "{workspaceName}"
              </h3>

              <p className="text-xs text-[#666970] dark:text-[#A8ABB3]">
                Invite teammates or share secure link
              </p>
            </div>
          </div>

          {/* Close */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close share dialog"
            className="rounded-md p-1 text-[#9699A0] transition-colors hover:text-[#15171B] dark:hover:text-[#F3F2EE]"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* ========================================================
            INVITE COLLABORATORS
        ======================================================== */}

        <div className="space-y-1.5">
          <label
            htmlFor="shareEmailInput"
            className="text-xs font-medium text-[#15171B] dark:text-[#F3F2EE]"
          >
            Invite Collaborators
          </label>

          <div className="flex gap-2">
            <input
              id="shareEmailInput"
              type="email"
              placeholder="teammate@company.com"
              className="min-w-0 flex-1 rounded-lg border border-[#E4E1D8] bg-[#F6F5F2] px-3 py-1.5 text-xs text-[#15171B] placeholder-[#9699A0] focus:border-indigo-500 focus:outline-none dark:border-[#24272E] dark:bg-[#0D0E11] dark:text-[#F3F2EE]"
            />

            <button
              type="button"
              onClick={onInvite}
              className="rounded-lg bg-[#15171B] px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 dark:bg-[#F3F2EE] dark:text-[#0D0E11]"
            >
              Invite
            </button>
          </div>

          {/* Invitation success */}

          <div
            id="inviteSuccessNote"
            className={`mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 ${
              inviteSuccess ? "block" : "hidden"
            }`}
          >
            Invitation sent!
          </div>
        </div>

        {/* ========================================================
            WORKSPACE LINK
        ======================================================== */}

        <div className="space-y-2 rounded-lg border border-[#E4E1D8] bg-[#FAF9F5] p-3 dark:border-[#24272E] dark:bg-[#0D0E11]">
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="font-medium text-[#15171B] dark:text-[#F3F2EE]">
              Workspace Link
            </span>

            <span className="text-right text-[11px] text-[#666970] dark:text-[#A8ABB3]">
              Anyone with link can view
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Share URL */}

            <input
              id="shareLinkInput"
              type="text"
              readOnly
              value={shareLink}
              onFocus={(event) => event.currentTarget.select()}
              className="min-w-0 flex-1 select-all rounded border border-[#E4E1D8] bg-white px-2.5 py-1.5 font-mono text-xs text-[#666970] focus:border-indigo-500 focus:outline-none dark:border-[#24272E] dark:bg-[#16181D] dark:text-[#A8ABB3]"
            />

            {/* Copy */}

            <button
              id="copyLinkBtn"
              type="button"
              onClick={onCopy}
              className="shrink-0 rounded border border-[#E4E1D8] bg-white px-3 py-1.5 text-xs font-medium text-[#15171B] transition-colors hover:bg-[#EFECE6] dark:border-[#24272E] dark:bg-[#16181D] dark:text-[#F3F2EE] dark:hover:bg-[#1E2127]"
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>

          {/* Workspace slug information */}

          <div className="flex items-center justify-between gap-3 text-[10px] text-[#9699A0] dark:text-[#686B74]">
            <span>Workspace</span>

            <span className="max-w-[240px] truncate font-mono">
              {safeWorkspaceSlug}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
