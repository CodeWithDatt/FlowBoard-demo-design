"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getWorkspaces } from "@/services/workspaceService";
import type { Workspace } from "@/types/workspace";

export default function WorkspacePage() {
  const params = useParams();
  const router = useRouter();

  const slug = typeof params.slug === "string" ? params.slug : "";

  const [workspace, setWorkspace] = useState<Workspace | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadWorkspace = async () => {
      if (!slug) {
        if (active) {
          setError("Workspace not found.");
          setLoading(false);
        }

        return;
      }

      try {
        setLoading(true);
        setError(null);

        const workspaces = await getWorkspaces();

        if (!active) {
          return;
        }

        const matchedWorkspace = workspaces.find((item) => item.slug === slug);

        if (!matchedWorkspace) {
          setWorkspace(null);
          setError("Workspace not found.");
          setLoading(false);
          return;
        }

        setWorkspace(matchedWorkspace);
      } catch (error) {
        console.error("Failed to load workspace:", error);

        if (!active) {
          return;
        }

        if (error instanceof Error && error.message.includes("401")) {
          router.replace(`/login?redirect=/ws/${encodeURIComponent(slug)}`);

          return;
        }

        setError(
          error instanceof Error ? error.message : "Unable to load workspace.",
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadWorkspace();

    return () => {
      active = false;
    };
  }, [slug, router]);

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#EBE9E1] text-[#15171B] dark:bg-[#08090B] dark:text-[#F3F2EE]">
        <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100" />

          <span>Loading workspace...</span>
        </div>
      </main>
    );
  }

  // ============================================================
  // ERROR / NOT FOUND
  // ============================================================

  if (error || !workspace) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#EBE9E1] px-6 text-[#15171B] dark:bg-[#08090B] dark:text-[#F3F2EE]">
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            !
          </div>

          <h1 className="mt-5 text-xl font-semibold tracking-tight">
            Workspace not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            This workspace does not exist or you do not have access to it.
          </p>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="mt-6 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-zinc-100 dark:text-zinc-900"
          >
            Back to dashboard
          </button>
        </div>
      </main>
    );
  }

  // ============================================================
  // WORKSPACE
  // ============================================================

  return (
    <main className="min-h-dvh bg-[#EBE9E1] px-6 py-10 text-[#15171B] dark:bg-[#08090B] dark:text-[#F3F2EE]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-500">
              FlowBoard Workspace
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {workspace.name}
            </h1>

            {workspace.description && (
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                {workspace.description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            Dashboard
          </button>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Workspace slug
          </p>

          <p className="mt-2 break-all font-mono text-sm text-zinc-900 dark:text-zinc-100">
            {workspace.slug}
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            {
              title: "Draw",
              description: "Freeform canvas",
            },
            {
              title: "Write",
              description: "Docs & specs",
            },
            {
              title: "Design",
              description: "UI kits & frames",
            },
            {
              title: "Plan",
              description: "Roadmaps & sprints",
            },
            {
              title: "Connect",
              description: "Flows & graphs",
            },
          ].map((environment) => (
            <div
              key={environment.title}
              className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <h2 className="text-sm font-semibold">{environment.title}</h2>

              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {environment.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
