import { faker } from "@faker-js/faker";
import {
  CAMPAIGN_OBJECTIVES,
  INITIAL_RESOURCE_TOTAL_ELEMENTS,
} from "./constants";
import {
  CampaignContent,
  FilePathMap,
  ResourceContentTypeMap,
  UserContent,
} from "./types";
import { promises as fs } from "fs";

const CAMPAIGNS_FILE_PATH = "/src/data/campaigns.json";
const USERS_FILE_PATH = "/src/data/users.json";

const FILE_PATHS: FilePathMap = {
  campaigns: CAMPAIGNS_FILE_PATH,
  users: USERS_FILE_PATH,
};

function createCampaignContent(length: number): CampaignContent[] {
  return Array.from({ length }, (_, index) => {
    return {
      id: index + 1,
      name: `캠페인${index + 1}`,
      campaign_objective: faker.helpers.arrayElement(
        Object.keys(CAMPAIGN_OBJECTIVES) as (keyof typeof CAMPAIGN_OBJECTIVES)[]
      ),
      enabled: faker.datatype.boolean(),
      impressions: faker.number.int(999999),
      clicks: faker.number.int(9999),
      ctr: faker.number.float({ fractionDigits: 4 }),
      video_views: faker.number.int(999),
      vtr: faker.number.float({ fractionDigits: 4 }),
    };
  });
}

function createUserContent(length: number): UserContent[] {
  return Array.from({ length }, (_, index) => {
    return {
      id: index + 1,
      name: `사용자${index + 1}`,
      email: `user${index + 1}@wisebirds.com`,
      last_login_at: faker.date.recent().toISOString(),
    };
  });
}

export async function getDataFromJsonServer<
  T extends keyof ResourceContentTypeMap
>(resourceType: T): Promise<ResourceContentTypeMap[T]> {
  const filePath = FILE_PATHS[resourceType];
  let allContent: ResourceContentTypeMap[T] = [] as ResourceContentTypeMap[T];

  const initial_total_elements = INITIAL_RESOURCE_TOTAL_ELEMENTS[resourceType];

  try {
    await fs.access(process.cwd() + filePath);
    const file = await fs.readFile(process.cwd() + filePath, "utf8");
    allContent = JSON.parse(file) as ResourceContentTypeMap[T];
  } catch (error) {
    console.error("file error", error);
    allContent = (
      resourceType === "campaigns"
        ? createCampaignContent(initial_total_elements)
        : createUserContent(initial_total_elements)
    ) as ResourceContentTypeMap[T];
    await fs.writeFile(
      process.cwd() + filePath,
      JSON.stringify(allContent),
      "utf8"
    );
  }

  return allContent;
}
export async function updateDataFromJsonServer<
  T extends keyof ResourceContentTypeMap
>(
  resourceType: T,
  id: number,
  body: Partial<ResourceContentTypeMap[T]>
): Promise<void> {
  const filePath = FILE_PATHS[resourceType];

  try {
    await fs.access(process.cwd() + filePath);
    const file = await fs.readFile(process.cwd() + filePath, "utf8");

    const allContent = JSON.parse(file) as ResourceContentTypeMap[T];
    const updatedContent = allContent.map((content) =>
      content.id === id ? { ...content, ...body } : content
    );

    await fs.writeFile(
      process.cwd() + filePath,
      JSON.stringify(updatedContent, null, 2),
      "utf8"
    );
  } catch (error) {
    console.error("Update error:", error);
  }
}
