import { Models } from "node-appwrite";

export interface Workspace {
  $id: string;
  name: string;
  userId: string;
  image?: string;
  $createdAt: string;
  $updatedAt: string;
  $collectionId: string;
  $databaseId: string;
  $permissions: string[];
}

export interface WorkSpacesResponse {
  success: boolean;
  workSPaces: {
    documents: Workspace[];
    total: number;
  };
}

export interface SingleWorkspaceResponse {
  success: boolean;
  workspace: Workspace;
}

export interface ErrorResponse {
  error: string;
}

export interface Workspace {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $sequence: string;
  $permissions: string[];
  name: string;
  userId: string;
  inviteCode: string;
  // image?: string | null;
}
