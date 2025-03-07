import { faker } from "@faker-js/faker";
import { CAMPAIGN_OBJECTIVES, CAMPAIGN_TOTAL_ELEMENTS } from "./constants";
import { CampaignContent, UserContent } from "./types";
import { promises as fs } from "fs";

const CAMPAIGNS_FILE_PATH = "src/data/campaigns.json";
const USERS_FILE_PATH = "src/data/users.json";

type ResourceType = "campaigns" | "users";
type ResourceContent = CampaignContent | UserContent;

type FilePathMap = {
  campaigns: string;
  users: string;
};

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
      name: faker.person.fullName(),
      email: faker.internet.email(),
      last_login_at: faker.date.recent().toISOString(),
    };
  });
}

export async function getDataFromJsonServer<T extends ResourceContent>(
  resourceType: ResourceType
): Promise<T[]> {
  const filePath = FILE_PATHS[resourceType];
  let allContent: T[] = [];

  try {
    await fs.access(process.cwd() + "/" + filePath);
    const file = await fs.readFile(process.cwd() + "/" + filePath, "utf8");
    allContent = JSON.parse(file);
  } catch (error) {
    console.error("File error:", error);
    allContent =
      resourceType === "campaigns"
        ? (createCampaignContent(CAMPAIGN_TOTAL_ELEMENTS) as T[])
        : (createUserContent(10) as T[]);

    await fs.writeFile(filePath, JSON.stringify(allContent, null, 2), "utf8");
  }

  return allContent;
}

export async function updateDataFromJsonServer<T extends ResourceContent>(
  resourceType: ResourceType,
  id: number,
  body: Partial<T>
): Promise<void> {
  const filePath = FILE_PATHS[resourceType];

  try {
    await fs.access(process.cwd() + "/" + filePath);
    const file = await fs.readFile(process.cwd() + "/" + filePath, "utf8");
    const allContent = JSON.parse(file) as T[];
    const updatedContent = allContent.map((content: T) =>
      content.id === id ? { ...content, ...body } : content
    );
    await fs.writeFile(
      filePath,
      JSON.stringify(updatedContent, null, 2),
      "utf8"
    );
  } catch (error) {
    console.error("Update error:", error);
  }
}
