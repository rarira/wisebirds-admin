import { NextRequest, NextResponse } from "next/server";
import { PAGINATION_SIZE } from "./constants";
import { getDataFromJsonServer } from "./json-server";
import { ResourceApiResponseMap, ResourceContentTypeMap } from "./types";

export async function getPaginatedDataRoute(
  req: NextRequest,
  resourceType: keyof ResourceContentTypeMap
) {
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

  // NOTE: JSON으로 backend 임시 구현
  const allContent = await getDataFromJsonServer(resourceType);

  const total_elements = allContent.length;
  const total_pages = Math.ceil(total_elements / PAGINATION_SIZE);

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

  const content = allContent.slice(+page * +size, (+page + 1) * +size);
  const response: ResourceApiResponseMap[typeof resourceType] = {
    total_elements,
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
