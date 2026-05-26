import { AppType } from "@/app/api/[[...routes]]/route";
import { hc } from "hono/client";
export const client = hc<AppType>('http://localhost:3000/')