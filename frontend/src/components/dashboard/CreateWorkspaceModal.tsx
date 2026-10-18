"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

type CreateWorkspaceModalProps = {
  open: boolean;
  isCreating: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => Promise<void>;
};

export default function CreateWorkspaceModal({
  open,
  isCreating,
  onClose,
  onCreate,
}: CreateWorkspaceModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      setName("");
      setDescription("");
      return;
    }

    const timer = window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 50);

    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isCreating) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, isCreating, onClose]);

  if (!open) {
    return null;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName || isCreating) {
      return;
    }

    await onCreate(trimmedName, trimmedDescription);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isCreating) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-workspace-title"
        className="w-full max-w-[460px] overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-200/80 px-6 py-5 dark:border-zinc-800">
          <div>
            <h2
              id="create-workspace-title"
              className="text-[16px] font-semibold tracking-[-0.01em] text-zinc-950 dark:text-zinc-100"
            >
              Create workspace
            </h2>

            <p className="mt-1 text-[13px] leading-5 text-zinc-500 dark:text-zinc-400">
              Create a separate space for your projects and ideas.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isCreating}
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:pointer-events-none disabled:opacity-50 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
          >
            <X size={17} strokeWidth={1.8} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-6 py-6">
            <div>
              <label
                htmlFor="workspace-name"
                className="mb-2 block text-[12px] font-medium text-zinc-700 dark:text-zinc-300"
              >
                Workspace name
              </label>

              <input
                ref={nameInputRef}
                id="workspace-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Product Design"
                maxLength={100}
                disabled={isCreating}
                autoComplete="off"
                className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-[13px] text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/5 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 dark:focus:ring-white/5"
              />

              <div className="mt-1.5 flex justify-end">
                <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                  {name.length}/100
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="workspace-description"
                className="mb-2 block text-[12px] font-medium text-zinc-700 dark:text-zinc-300"
              >
                Description
                <span className="ml-1 font-normal text-zinc-400">
                  (optional)
                </span>
              </label>

              <textarea
                id="workspace-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="What will you use this workspace for?"
                maxLength={500}
                rows={3}
                disabled={isCreating}
                className="w-full resize-none rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-[13px] leading-5 text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/5 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 dark:focus:ring-white/5"
              />

              <div className="mt-1.5 flex justify-end">
                <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                  {description.length}/500
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 border-t border-zinc-200/80 bg-zinc-50/70 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900/30">
            <button
              type="button"
              onClick={onClose}
              disabled={isCreating}
              className="h-9 rounded-lg px-4 text-[12px] font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:pointer-events-none disabled:opacity-50 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!name.trim() || isCreating}
              className="h-9 rounded-lg bg-zinc-900 px-4 text-[12px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900"
            >
              {isCreating ? "Creating..." : "Create workspace"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
