import { CAMPAIGN_TOTAL_ELEMENTS, PAGINATION_SIZE } from "@/lib/constants";
import { getDataFromJsonServer } from "@/lib/json-server";
import { CampaignApiResponse } from "@/lib/types";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const currentDir = process.cwd();
  console.log("currentDir", currentDir);

  const page = req.nextUrl.searchParams.get("page");
  const size = req.nextUrl.searchParams.get("size");

  if (!page || !size) {
    return NextResponse.json(
      {
        message: "page와 size 파라미터가 필요합니다.",
      },
      {
        status: 400,
      }
    );
  }
  const total_pages = Math.ceil(CAMPAIGN_TOTAL_ELEMENTS / PAGINATION_SIZE);

  if (+page >= total_pages || +page < 0) {
    return NextResponse.json(
      {
        message: "해당 페이지가 존재하지 않습니다.",
      },
      {
        status: 400,
      }
    );
  }

  // NOTE: JSON으로 backend 임시 구현

  const allContent = await getDataFromJsonServer("campaigns");
  const content = allContent.slice(+page * +size, (+page + 1) * +size);

  const response: CampaignApiResponse = {
    total_elements: CAMPAIGN_TOTAL_ELEMENTS,
    total_pages,
    last: +page + 1 === total_pages,
    number: +page,
    size: PAGINATION_SIZE,
    sort: {
      sort_field: "id",
      sort_order: "ASC",
    },
    number_of_elements: content.length,
    first: +page === 0,
    empty: content.length === 0,
    content,
  };

  return NextResponse.json(response);
}
