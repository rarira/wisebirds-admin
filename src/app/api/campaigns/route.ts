import { getPaginatedDataRoute } from "@/lib/api-routes";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await getPaginatedDataRoute(req, "campaigns");
}
