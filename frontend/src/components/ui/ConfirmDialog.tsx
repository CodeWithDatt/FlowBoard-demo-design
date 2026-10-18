"use client";

import { useEffect, useRef } from "react";
import { TriangleAlert } from "lucide-react";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  tone?: "default" | "danger";
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  tone = "default",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    confirmButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isLoading) onCancel();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, isLoading, onCancel]);

  if (!open) return null;

  const isDanger = tone === "danger";

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div
        className="animate-overlay-in absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={() => !isLoading && onCancel()}
      />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        className="animate-dialog-in relative w-full max-w-sm rounded-2xl border border-border bg-surface p-6 shadow-lg"
      >
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            isDanger ? "bg-danger/10 text-danger" : "bg-accent-tint text-accent"
          }`}
        >
          <TriangleAlert size={18} />
        </div>

        <h2 id="confirm-dialog-title" className="mt-4 text-[15px] font-semibold text-ink">
          {title}
        </h2>
        <p id="confirm-dialog-description" className="mt-1.5 text-[13px] leading-relaxed text-ink-2">
          {description}
        </p>

        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="h-9 rounded-lg px-3.5 text-[12.5px] font-medium text-ink-2 transition-colors hover:bg-surface-hover disabled:opacity-60"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            ref={confirmButtonRef}
            onClick={onConfirm}
            disabled={isLoading}
            className={`h-9 rounded-lg px-3.5 text-[12.5px] font-semibold transition-colors disabled:opacity-70 ${
              isDanger
                ? "bg-danger text-white hover:bg-danger/90"
                : "bg-accent text-accent-ink hover:bg-accent-hover"
            }`}
          >
            {isLoading ? "Please wait…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
