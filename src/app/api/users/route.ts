import { getPaginatedDataRoute } from "@/lib/api-routes";
import { userAddFormSchema } from "@/lib/forms";
import { addDataToJsonServer } from "@/lib/json-server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return await getPaginatedDataRoute(req, "users");
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const result = userAddFormSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { message: "유효하지 않은 입력 값입니다." },
      { status: 400 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { repeat_password, ...user } = result.data;

  try {
    await addDataToJsonServer("users", user);
    return NextResponse.json({ result: true, id: body.id }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "사용자 추가 실패" }, { status: 500 });
  }
}
