import { faker } from "@faker-js/faker";
import {
  CAMPAIGN_OBJECTIVES,
  INITIAL_RESOURCE_TOTAL_ELEMENTS,
} from "./constants";
import {
  CampaignContent,
  FilePathMap,
  IdData,
  Identifiable,
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

const ID_DATA_FILE_PATH = "/src/data/id_seq.json";

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
  // 사용자 데이터는 생성시 optimistic update가 잘 드러나기 위해 역순으로 생성합니다.
  return Array.from({ length }, (_, index) => {
    return {
      id: index + 1,
      name: `사용자${index + 1}`,
      email: `user${index + 1}@wisebirds.com`,
      last_login_at: faker.date.recent().toISOString(),
      password: "**********",
    };
  }).reverse();
}

export async function updateIdDataFile(
  resourceType: keyof ResourceContentTypeMap,
  lastId: number
) {
  try {
    const filePath = process.cwd() + ID_DATA_FILE_PATH;
    await fs.access(filePath);
    const idDataFile = await fs.readFile(filePath, "utf8");
    const idData = JSON.parse(idDataFile) as Partial<IdData>;
    idData[resourceType] = lastId;
    await fs.writeFile(filePath, JSON.stringify(idData, null, 2), "utf8");
  } catch (error) {
    console.error("Update id data error:", error);
    const newIdData = {} as Partial<IdData>;
    newIdData[resourceType] = lastId;

    await fs.writeFile(
      process.cwd() + ID_DATA_FILE_PATH,
      JSON.stringify(newIdData, null, 2),
      "utf8"
    );
  }
}

export async function getNextId(
  resourceType: keyof ResourceContentTypeMap
): Promise<number> {
  try {
    const filePath = process.cwd() + ID_DATA_FILE_PATH;
    await fs.access(filePath);
    const idDataFile = await fs.readFile(filePath, "utf8");
    const idData = JSON.parse(idDataFile) as Partial<IdData>;
    const nextId = (idData[resourceType] || 0) + 1;
    return nextId;
  } catch (error) {
    throw error;
  }
}

function removePasswordFromContent(content: Identifiable[]) {
  return content.map((content) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = content;
    return rest;
  });
}

export async function getDataFromJsonServer<
  T extends keyof ResourceContentTypeMap
>(resourceType: T): Promise<ResourceContentTypeMap[T]> {
  const filePath = FILE_PATHS[resourceType];
  let allContent: Identifiable[] = [];

  const initial_total_elements = INITIAL_RESOURCE_TOTAL_ELEMENTS[resourceType];

  try {
    await fs.access(process.cwd() + filePath);
    const file = await fs.readFile(process.cwd() + filePath, "utf8");
    allContent = removePasswordFromContent(
      JSON.parse(file)
    ) as ResourceContentTypeMap[T];
  } catch (error) {
    console.error("getDataFromJsonServer:", error);
    allContent =
      resourceType === "campaigns"
        ? createCampaignContent(initial_total_elements)
        : createUserContent(initial_total_elements);
    await fs.writeFile(
      process.cwd() + filePath,
      JSON.stringify(allContent),
      "utf8"
    );
    allContent = removePasswordFromContent(allContent);

    await updateIdDataFile(resourceType, allContent.length);
  }

  return allContent as ResourceContentTypeMap[T];
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
    throw new Error("업데이트에 실패하였습니다.");
  }
}

function maskingPassword(
  content: Omit<
    ResourceContentTypeMap[keyof ResourceContentTypeMap][number],
    "id"
  >
) {
  if ("password" in content) {
    return {
      ...content,
      password: "**********",
      last_login_at: new Date().toISOString(),
    };
  }
  return content;
}

export async function addDataToJsonServer(
  resourceType: keyof ResourceContentTypeMap,
  body: Omit<ResourceContentTypeMap[keyof ResourceContentTypeMap][number], "id">
): Promise<void> {
  const filePath = FILE_PATHS[resourceType];

  try {
    await fs.access(process.cwd() + filePath);
    const file = await fs.readFile(process.cwd() + filePath, "utf8");

    const allContent = JSON.parse(
      file
    ) as ResourceContentTypeMap[keyof ResourceContentTypeMap];
    const newContent = {
      id: await getNextId(resourceType),
      ...maskingPassword(body),
    } as ResourceContentTypeMap[keyof ResourceContentTypeMap][number];

    if (resourceType === "users") {
      (allContent as UserContent[]).unshift(newContent as UserContent);
    } else {
      (allContent as CampaignContent[]).push(newContent as CampaignContent);
    }

    await fs.writeFile(
      process.cwd() + filePath,
      JSON.stringify(allContent, null, 2),
      "utf8"
    );

    await updateIdDataFile(resourceType, newContent.id);
  } catch (error) {
    console.error("Add error:", error);
    throw new Error("데이터 베이스가 존재하지 않습니다.");
  }
}

export async function checkEmailExits(email: string): Promise<boolean> {
  try {
    const filePath = process.cwd() + USERS_FILE_PATH;
    await fs.access(filePath);
    const file = await fs.readFile(filePath, "utf8");
    const allContent = JSON.parse(file) as UserContent[];
    return allContent.some((content) => content.email === email);
  } catch (error) {
    console.error("Check email error:", error);
    throw new Error("메일 중복 체크에 실패하였습니다.");
  }
}
