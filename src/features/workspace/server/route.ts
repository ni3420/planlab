import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ID, Query } from "node-appwrite";
import { conf } from "@/conf/conf";
import { middleware, AppWriteVariablesType } from "@/appwrite/middleware";
import { workspaceSchema, updateWorkspaceSchema } from "../Schema";
import { MemberType } from "@/features/members/types";
import { genRateInvite } from "@/lib/utils";

const app = new Hono<{ Variables: AppWriteVariablesType }>()
  .get("/", middleware, async (c) => {
    try {
      const database = c.get("database");
      const user = c.get("user");

      const result = await database.listDocuments(
        conf.appwrite_database_id,
        conf.workspace_key,
        [
          Query.equal("userId", user.$id),
          Query.orderDesc("$createdAt")
        ]
      );

      return c.json({ 
        success: true, 
        workSPaces: {
          total: result.total,
          documents: result.documents
        }
      });
    } catch (error) {
      console.error(error);
      return c.json({ error: "Failed to fetch workspaces" }, 500);
    }
  })
  .post("/", middleware, zValidator("form", workspaceSchema), async (c) => {
    try {
      const { name, image } = c.req.valid("form");
      const database = c.get("database");
      const storage = c.get("storage");
      const user = c.get("user");

      let imageUrl: string | null = null;

      if (image) {
        const file = await storage.createFile(
          conf.appwrite_storage_id,
          ID.unique(),
          image
        );

        imageUrl = `${conf.appwrite_url}/storage/buckets/${conf.appwrite_storage_id}/files/${file.$id}/view?project=${conf.appwrite_project_id}`;
      }

      const workspace = await database.createDocument(
        conf.appwrite_database_id,
        conf.workspace_key,
        ID.unique(),
        {
          name,
          userId: user.$id,
          image: imageUrl,
          inviteCode: genRateInvite(6)
        }
      );

      await database.createDocument(
        conf.appwrite_database_id,
        conf.members_collection,
        ID.unique(),
        {
          userId: user.$id,
          workspaceId: workspace.$id,
          role: MemberType.ADMIN,
        }
      );

      return c.json({ success: true, workspace });
    } catch (error) {
      console.error(error);
      return c.json({ error: "Failed to create workspace" }, 500);
    }
  })
  .get("/:workspaceId", middleware, async (c) => {
    try {
      const database = c.get("database");
      const user = c.get("user");
      const { workspaceId } = c.req.param();

      const workspace = await database.getDocument(
        conf.appwrite_database_id,
        conf.workspace_key,
        workspaceId
      );

      if (!workspace || workspace.userId !== user.$id) {
        return c.json({ error: "Workspace not found or unauthorized" }, 404);
      }

      return c.json({ success: true, workspace });
    } catch (error) {
      console.error(error);
      return c.json({ error: "Failed to fetch workspace" }, 500);
    }
  })
  .patch("/:workspaceId", middleware, zValidator("form", updateWorkspaceSchema), async (c) => {
    try {
      const database = c.get("database");
      const storage = c.get("storage");
      const user = c.get("user");
      const { workspaceId } = c.req.param();
      const { name, image } = c.req.valid("form");

      const existingWorkspace = await database.getDocument(
        conf.appwrite_database_id,
        conf.workspace_key,
        workspaceId
      );

      if (!existingWorkspace || existingWorkspace.userId !== user.$id) {
        return c.json({ error: "Unauthorized or workspace not found" }, 401);
      }

      let imageUrl = existingWorkspace.imageUrl || existingWorkspace.image;

      if (image && image instanceof File) {
        const file = await storage.createFile(
          conf.appwrite_storage_id,
          ID.unique(),
          image
        );

        imageUrl = `${conf.appwrite_url}/storage/buckets/${conf.appwrite_storage_id}/files/${file.$id}/view?project=${conf.appwrite_project_id}`;
      } else if (image === null) {
        imageUrl = null;
      }

      const workspace = await database.updateDocument(
        conf.appwrite_database_id,
        conf.workspace_key,
        workspaceId,
        {
          name,
          image: imageUrl,
        }
      );

      return c.json({ success: true, workspace });
    } catch (error) {
      console.error(error);
      return c.json({ error: "Failed to update workspace" }, 500);
    }
  });

export default app;