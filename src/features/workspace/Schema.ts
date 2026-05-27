import {z} from "zod"

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const workspaceSchema = z.object({
name:z.string().min(4,"Required"),
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ).optional()
})

export const updateWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Workspace name must be at least 1 character long")
    .optional(),
  image: z
    .union([
      z.instanceof(File),
      z.string().url("Invalid image URL"),
    ])
    .optional()
    .nullable(),
});

