"use client";

import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";

import { useRouter } from "next/navigation";

import { authApi } from "@/services/api";

import { createWorkspace, getWorkspaces } from "@/services/workspaceService";

import type { Workspace } from "@/types/workspace";

import { useTheme } from "@/providers/ThemeProvider";
import { useToast } from "@/providers/ToastProvider";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardMain from "@/components/dashboard/DashboardMain";
import SearchPalette from "@/components/dashboard/SearchPalette";
import ShareModal from "@/components/dashboard/ShareModal";
import CreateWorkspaceModal from "@/components/dashboard/CreateWorkspaceModal";

type CurrentUser = {
  id: string;
  name: string;
  email: string;
};

const SELECTED_WORKSPACE_STORAGE_KEY = "flowboard_selected_workspace_id";

export default function Dashboard() {
  const router = useRouter();

  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();

  // ============================================================
  // AUTHENTICATION
  // ============================================================

  const [user, setUser] = useState<CurrentUser | null>(null);

  const [authChecking, setAuthChecking] = useState(true);

  // ============================================================
  // WORKSPACES
  // ============================================================

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(
    null,
  );

  const [workspaceLoading, setWorkspaceLoading] = useState(true);

  // ============================================================
  // CREATE WORKSPACE
  // ============================================================

  const [createWorkspaceOpen, setCreateWorkspaceOpen] = useState(false);

  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);

  // ============================================================
  // SIDEBAR / NAVIGATION
  // ============================================================

  const [isCollapsed, setIsCollapsed] = useState(false);

  const [isMinimalNav, setIsMinimalNav] = useState(false);

  // ============================================================
  // MENUS
  // ============================================================

  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);

  const [shareOpen, setShareOpen] = useState(false);

  // ============================================================
  // SHARE
  // ============================================================

  const [copied, setCopied] = useState(false);

  const [inviteSuccess, setInviteSuccess] = useState(false);

  // ============================================================
  // LOGOUT
  // ============================================================

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isDarkMode = theme === "dark";

  // ============================================================
  // LOAD CURRENT USER
  // ============================================================

  useEffect(() => {
    let active = true;

    const loadCurrentUser = async () => {
      try {
        setAuthChecking(true);

        const response = await authApi.me();

        if (!response.user) {
          throw new Error("Authentication required");
        }

        if (active) {
          setUser(response.user as CurrentUser);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);

        if (active) {
          setUser(null);

          router.replace("/login?redirect=/dashboard");
        }
      } finally {
        if (active) {
          setAuthChecking(false);
        }
      }
    };

    loadCurrentUser();

    return () => {
      active = false;
    };
  }, [router]);

  // ============================================================
  // LOAD ALL WORKSPACES
  // ============================================================

  useEffect(() => {
    if (!user) {
      return;
    }

    let active = true;

    const loadWorkspaces = async () => {
      try {
        setWorkspaceLoading(true);

        const result = await getWorkspaces();

        if (!active) {
          return;
        }

        const availableWorkspaces = Array.isArray(result) ? result : [];

        setWorkspaces(availableWorkspaces);

        if (availableWorkspaces.length === 0) {
          setSelectedWorkspace(null);

          if (typeof window !== "undefined") {
            window.localStorage.removeItem(SELECTED_WORKSPACE_STORAGE_KEY);
          }

          return;
        }

        // --------------------------------------------------------
        // Try to restore the previously selected workspace.
        // --------------------------------------------------------

        let savedWorkspaceId: string | null = null;

        if (typeof window !== "undefined") {
          savedWorkspaceId = window.localStorage.getItem(
            SELECTED_WORKSPACE_STORAGE_KEY,
          );
        }

        const savedWorkspace = savedWorkspaceId
          ? availableWorkspaces.find(
              (workspace) => workspace._id === savedWorkspaceId,
            )
          : undefined;

        // --------------------------------------------------------
        // Use saved workspace if it still exists.
        // Otherwise use the first available workspace.
        // --------------------------------------------------------

        const workspaceToSelect = savedWorkspace || availableWorkspaces[0];

        setSelectedWorkspace(workspaceToSelect);

        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            SELECTED_WORKSPACE_STORAGE_KEY,
            workspaceToSelect._id,
          );
        }
      } catch (error) {
        console.error("Failed to load workspaces:", error);

        if (active) {
          setWorkspaces([]);
          setSelectedWorkspace(null);

          showToast("Unable to load your workspaces.", "danger");
        }
      } finally {
        if (active) {
          setWorkspaceLoading(false);
        }
      }
    };

    loadWorkspaces();

    return () => {
      active = false;
    };
  }, [user, showToast]);

  // ============================================================
  // SELECT WORKSPACE
  // ============================================================

  const handleWorkspaceSelect = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);

    setWorkspaceMenuOpen(false);
    setProfileMenuOpen(false);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        SELECTED_WORKSPACE_STORAGE_KEY,
        workspace._id,
      );
    }

    showToast(`Opening ${workspace.name}...`, "success");

    router.push(`/ws/${encodeURIComponent(workspace.slug)}`);
  };

  // ============================================================
  // CREATE WORKSPACE
  // ============================================================

  const openCreateWorkspaceModal = () => {
    setWorkspaceMenuOpen(false);
    setProfileMenuOpen(false);

    setCreateWorkspaceOpen(true);
  };

  const closeCreateWorkspaceModal = () => {
    if (isCreatingWorkspace) {
      return;
    }

    setCreateWorkspaceOpen(false);
  };

  const handleCreateWorkspace = async (name: string, description: string) => {
    if (isCreatingWorkspace) {
      return;
    }

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) {
      showToast("Workspace name is required.", "danger");

      return;
    }

    try {
      setIsCreatingWorkspace(true);

      const newWorkspace = await createWorkspace({
        name: trimmedName,
        description: trimmedDescription,
      });

      // Add the newly created workspace
      // to the existing list.
      setWorkspaces((currentWorkspaces) => [
        ...currentWorkspaces,
        newWorkspace,
      ]);

      // Automatically select the new workspace.
      setSelectedWorkspace(newWorkspace);

      // Remember the newly selected workspace.
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          SELECTED_WORKSPACE_STORAGE_KEY,
          newWorkspace._id,
        );
      }

      // Close the modal.
      setCreateWorkspaceOpen(false);

      showToast(`${newWorkspace.name} created successfully.`, "success");
    } catch (error) {
      console.error("Failed to create workspace:", error);

      const message =
        error instanceof Error ? error.message : "Unable to create workspace.";

      showToast(message, "danger");
    } finally {
      setIsCreatingWorkspace(false);
    }
  };

  // ============================================================
  // KEYBOARD + OUTSIDE CLICK
  // ============================================================

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // --------------------------------------------------------
      // Command/Ctrl + K
      // --------------------------------------------------------

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();

        setSearchOpen((current) => !current);

        setWorkspaceMenuOpen(false);
        setProfileMenuOpen(false);

        return;
      }

      // --------------------------------------------------------
      // Escape
      // --------------------------------------------------------

      if (event.key === "Escape") {
        setSearchOpen(false);
        setShareOpen(false);
        setWorkspaceMenuOpen(false);
        setProfileMenuOpen(false);

        if (!isCreatingWorkspace) {
          setCreateWorkspaceOpen(false);
        }
      }
    };

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as Element | null;

      // Workspace menu
      if (
        !target?.closest("#workspaceMenu") &&
        !target?.closest("#workspaceSwitcherBtn")
      ) {
        setWorkspaceMenuOpen(false);
      }

      // Profile menu
      if (
        !target?.closest("#profileMenu") &&
        !target?.closest("#profileRowBtn")
      ) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isCreatingWorkspace]);

  // ============================================================
  // CLOSE MENUS
  // ============================================================

  const closeAllMenus = () => {
    setWorkspaceMenuOpen(false);
    setProfileMenuOpen(false);
  };

  // ============================================================
  // SIDEBAR
  // ============================================================

  const toggleSidebarCollapse = () => {
    setIsCollapsed((current) => !current);

    closeAllMenus();
  };

  const toggleMinimalNav = () => {
    setIsMinimalNav((current) => !current);
  };

  // ============================================================
  // WORKSPACE MENU
  // ============================================================

  const toggleWorkspaceMenu = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (isCollapsed) {
      return;
    }

    setProfileMenuOpen(false);

    setWorkspaceMenuOpen((current) => !current);
  };

  // ============================================================
  // PROFILE MENU
  // ============================================================

  const toggleProfileMenu = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (isCollapsed) {
      return;
    }

    setWorkspaceMenuOpen(false);

    setProfileMenuOpen((current) => !current);
  };

  // ============================================================
  // SEARCH
  // ============================================================

  const openSearchModal = () => {
    setSearchOpen(true);

    closeAllMenus();

    window.setTimeout(() => {
      document.getElementById("searchPaletteInput")?.focus();
    }, 50);
  };

  const closeSearchModal = () => {
    setSearchOpen(false);
  };

  const filterSearchItems = (query: string) => {
    const normalizedQuery = query.toLowerCase().trim();

    const items = document.querySelectorAll<HTMLElement>(".search-item");

    items.forEach((item) => {
      const text = item.textContent?.toLowerCase() ?? "";

      item.classList.toggle(
        "hidden",
        Boolean(normalizedQuery) && !text.includes(normalizedQuery),
      );
    });
  };

  // ============================================================
  // SHARE
  // ============================================================

  const openShareModal = () => {
    if (!selectedWorkspace) {
      showToast("Select a workspace before sharing.", "danger");

      return;
    }

    setShareOpen(true);

    closeAllMenus();
  };

  const closeShareModal = () => {
    setShareOpen(false);
    setCopied(false);
    setInviteSuccess(false);
  };

  const copyShareLink = async () => {
    const input = document.getElementById(
      "shareLinkInput",
    ) as HTMLInputElement | null;

    if (!input) {
      return;
    }

    input.select();

    try {
      await navigator.clipboard.writeText(input.value);
    } catch (error) {
      console.error("Clipboard copy failed:", error);

      try {
        document.execCommand("copy");
      } catch {
        // Clipboard unavailable.
      }
    }

    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // ============================================================
  // INVITE
  // ============================================================

  const inviteCollaborator = () => {
    const emailInput = document.getElementById(
      "shareEmailInput",
    ) as HTMLInputElement | null;

    if (!emailInput) {
      return;
    }

    const email = emailInput.value.trim();

    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!valid) {
      showToast("Enter a valid collaborator email address.", "danger");

      return;
    }

    emailInput.value = "";

    setInviteSuccess(true);

    window.setTimeout(() => {
      setInviteSuccess(false);
    }, 3000);
  };

  // ============================================================
  // NEW DOCUMENT
  // ============================================================

  const handleNewDocument = () => {
    window.location.hash = "write";

    showToast("Write environment selected. Document creation will open here.");
  };

  // ============================================================
  // TEMPLATE
  // ============================================================

  const handleTemplateUse = (name: string) => {
    showToast(`${name} template selected.`, "success");
  };

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(SELECTED_WORKSPACE_STORAGE_KEY);
      }

      router.replace("/");
    }
  };

  // ============================================================
  // AUTH LOADING
  // ============================================================

  if (authChecking || !user) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background text-ink">
        <div className="flex items-center gap-3 text-sm text-ink-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-accent" />

          <span>Loading your workspace...</span>
        </div>
      </div>
    );
  }

  // ============================================================
  // SELECTED WORKSPACE VALUES
  // ============================================================

  const currentWorkspaceName = workspaceLoading
    ? "Loading..."
    : selectedWorkspace?.name || "My Workspace";

  const currentWorkspaceSlug = selectedWorkspace?.slug || "";

  // ============================================================
  // DASHBOARD
  // ============================================================

  return (
    <div className="h-dvh min-h-0 overflow-hidden bg-[#EBE9E1] text-[#15171B] antialiased selection:bg-indigo-500/20 selection:text-indigo-600 dark:bg-[#08090B] dark:text-[#F3F2EE] dark:selection:bg-indigo-500/30 dark:selection:text-indigo-300 font-sans">
      <div className="flex h-full min-h-0 flex-col overflow-hidden">
        {/* ======================================================
            HEADER
        ====================================================== */}

        <DashboardHeader
          isCollapsed={isCollapsed}
          isDarkMode={isDarkMode}
          isMinimalNav={isMinimalNav}
          onToggleMinimalNav={toggleMinimalNav}
          onSearch={openSearchModal}
          onShare={openShareModal}
          onToggleCollapse={toggleSidebarCollapse}
          onToggleTheme={toggleTheme}
        />

        {/* ======================================================
            MAIN DASHBOARD AREA
        ====================================================== */}

        <div className="relative flex min-h-0 flex-1 overflow-hidden">
          {/* ====================================================
              SIDEBAR
          ==================================================== */}

          <DashboardSidebar
            isCollapsed={isCollapsed}
            isDarkMode={isDarkMode}
            workspaceMenuOpen={workspaceMenuOpen}
            profileMenuOpen={profileMenuOpen}
            onToggleWorkspaceMenu={toggleWorkspaceMenu}
            onToggleProfileMenu={toggleProfileMenu}
            onSearch={openSearchModal}
            onShare={openShareModal}
            onToggleTheme={toggleTheme}
            onLogout={handleLogout}
            onAction={showToast}
            isLoggingOut={isLoggingOut}
            userName={user.name}
            userEmail={user.email}
            workspaces={workspaces}
            selectedWorkspace={selectedWorkspace}
            workspaceLoading={workspaceLoading}
            onSelectWorkspace={handleWorkspaceSelect}
            onCreateWorkspace={openCreateWorkspaceModal}
            workspaceName={currentWorkspaceName}
          />

          {/* ====================================================
              MAIN CONTENT
          ==================================================== */}

          <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
            <DashboardMain
              onSearch={openSearchModal}
              onShare={openShareModal}
              onNewDocument={handleNewDocument}
              onTemplateUse={handleTemplateUse}
              userName={user.name}
            />
          </div>
        </div>

        {/* ======================================================
            SEARCH PALETTE
        ====================================================== */}

        <SearchPalette
          searchOpen={searchOpen}
          onClose={closeSearchModal}
          onFilter={filterSearchItems}
        />

        {/* ======================================================
            SHARE MODAL
        ====================================================== */}

        <ShareModal
          shareOpen={shareOpen}
          copied={copied}
          inviteSuccess={inviteSuccess}
          workspaceName={currentWorkspaceName}
          workspaceSlug={currentWorkspaceSlug}
          onClose={closeShareModal}
          onCopy={copyShareLink}
          onInvite={inviteCollaborator}
        />

        {/* ======================================================
            CREATE WORKSPACE MODAL
        ====================================================== */}

        <CreateWorkspaceModal
          open={createWorkspaceOpen}
          isCreating={isCreatingWorkspace}
          onClose={closeCreateWorkspaceModal}
          onCreate={handleCreateWorkspace}
        />
      </div>
    </div>
  );
}
