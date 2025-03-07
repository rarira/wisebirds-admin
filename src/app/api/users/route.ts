import { getPaginatedDataRoute } from "@/lib/api-routes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return await getPaginatedDataRoute(req, "users");
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    return NextResponse.json({ result: true, id: body.id }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "사용자 추가 실패" }, { status: 500 });
  }
}
