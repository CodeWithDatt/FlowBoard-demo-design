export interface Workspace {
  _id: string;
  name: string;
  slug: string;
  ownerId: string;
  description: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspacesResponse {
  success: boolean;
  workspaces: Workspace[];
}
