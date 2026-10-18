import type { Workspace, WorkspacesResponse } from "@/types/workspace";

const RAW_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getApiBaseUrl = (): string => {
  const baseUrl = RAW_API_URL.replace(/\/+$/, "");

  // If /api is already present, keep it.
  if (baseUrl.endsWith("/api")) {
    return baseUrl;
  }

  // Otherwise add /api.
  return `${baseUrl}/api`;
};

// ============================================================
// GET ALL WORKSPACES
// ============================================================

export const getWorkspaces = async (): Promise<Workspace[]> => {
  const apiBaseUrl = getApiBaseUrl();

  const url = `${apiBaseUrl}/workspaces`;

  console.log("[FlowBoard] Workspace API URL:", url);

  let response: Response;

  try {
    response = await fetch(url, {
      method: "GET",

      credentials: "include",

      headers: {
        Accept: "application/json",
      },

      cache: "no-store",
    });
  } catch (error) {
    console.error("[FlowBoard] Failed to connect to backend:", error);

    throw new Error("Unable to connect to the FlowBoard backend.");
  }

  const contentType = response.headers.get("content-type") || "";

  console.log("[FlowBoard] Workspace API response:", {
    status: response.status,
    statusText: response.statusText,
    contentType,
    url: response.url,
  });

  /*
   * The backend should always return JSON.
   * If we receive HTML/text, the request probably
   * went to the wrong server or wrong API path.
   */
  if (!contentType.toLowerCase().includes("application/json")) {
    const responseText = await response.text();

    console.error("[FlowBoard] Unexpected workspace response:", {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      contentType,
      responsePreview: responseText.slice(0, 500),
    });

    throw new Error(
      `Workspace API returned a non-JSON response (${response.status}).`,
    );
  }

  const data = (await response.json()) as WorkspacesResponse;

  if (!response.ok) {
    console.error("[FlowBoard] Workspace API error:", data);

    throw new Error(
      `Workspace API request failed with status ${response.status}.`,
    );
  }

  if (!data.success) {
    throw new Error("Failed to load workspaces.");
  }

  return data.workspaces || [];
};

// ============================================================
// CREATE WORKSPACE
// ============================================================

export type CreateWorkspaceInput = {
  name: string;
  description?: string;
};

export type CreateWorkspaceResponse = {
  success: boolean;
  message?: string;
  workspace: Workspace;
};

export const createWorkspace = async (
  input: CreateWorkspaceInput,
): Promise<Workspace> => {
  const apiBaseUrl = getApiBaseUrl();

  const url = `${apiBaseUrl}/workspaces`;

  console.log("[FlowBoard] Creating workspace:", {
    url,
    name: input.name,
  });

  let response: Response;

  try {
    response = await fetch(url, {
      method: "POST",

      credentials: "include",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify({
        name: input.name,
        description: input.description || "",
      }),
    });
  } catch (error) {
    console.error(
      "[FlowBoard] Failed to connect while creating workspace:",
      error,
    );

    throw new Error("Unable to connect to the FlowBoard backend.");
  }

  const contentType = response.headers.get("content-type") || "";

  console.log("[FlowBoard] Create workspace API response:", {
    status: response.status,
    statusText: response.statusText,
    contentType,
    url: response.url,
  });

  /*
   * The backend should always return JSON.
   */
  if (!contentType.toLowerCase().includes("application/json")) {
    const responseText = await response.text();

    console.error("[FlowBoard] Unexpected create workspace response:", {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      contentType,
      responsePreview: responseText.slice(0, 500),
    });

    throw new Error(
      `Workspace API returned a non-JSON response (${response.status}).`,
    );
  }

  const data = (await response.json()) as CreateWorkspaceResponse;

  if (!response.ok) {
    console.error("[FlowBoard] Create workspace API error:", data);

    throw new Error(
      data.message || `Failed to create workspace (${response.status}).`,
    );
  }

  if (!data.success || !data.workspace) {
    throw new Error("Workspace was not created.");
  }

  console.log("[FlowBoard] Workspace created successfully:", data.workspace);

  return data.workspace;
};
