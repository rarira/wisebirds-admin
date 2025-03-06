import {
  CAMPAIGN_OBJECTIVES,
  CAMPAIGN_TOTAL_ELEMENTS,
  PAGINATION_SIZE,
} from "@/lib/constants";
import { CampaignApiResponse, CampaignContent } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { NextRequest } from "next/server";
import { faker } from "@faker-js/faker";
import { NextResponse } from "next/server";

function createCampaignContent(page: number, size: number): CampaignContent[] {
  const isLastPage =
    page + 1 === Math.ceil(CAMPAIGN_TOTAL_ELEMENTS / PAGINATION_SIZE);

  return Array.from(
    { length: isLastPage ? CAMPAIGN_TOTAL_ELEMENTS % PAGINATION_SIZE : size },
    (_, index) => {
      const id = page * size + index + 1;
      return {
        id,
        name: `캠페인${id}`,
        campaign_objective: faker.helpers.arrayElement(
          Object.keys(
            CAMPAIGN_OBJECTIVES
          ) as (keyof typeof CAMPAIGN_OBJECTIVES)[]
        ),
        enabled: faker.datatype.boolean(),
        impressions: faker.number.int(999999),
        clicks: faker.number.int(9999),
        ctr: faker.number.float({ fractionDigits: 4 }),
        video_views: faker.number.int(999),
        vtr: faker.number.float({ fractionDigits: 4 }),
      };
    }
  );
}

export async function GET(req: NextRequest) {
  //TODO: 백엔드 구현 필요
  //   const res = await fetch("https://data.mongodb-api.com/...", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "API-Key": process.env.DATA_API_KEY,
  //     },
  //   });
  //   const data = await res.json();
  //   return Response.json(data);

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

  const content = createCampaignContent(+page, +size);

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

  await sleep(1000);

  return NextResponse.json(response);
}
