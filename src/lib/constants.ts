import {
  CampaignContent,
  ResourceContentTypeMap,
  TableHeader,
  UserContent,
} from "./types";

export const ROLES = {
  admin: "어드민",
  manager: "매니저",
  viewer: "뷰어",
} as const;

export const PAGINATION_SIZE = 25;

export const MAX_PAGE_TO_DISPLAY = 4;

export const CAMPAIGN_OBJECTIVES = {
  WEBSITE_CONVERSIONS: "웹사이트 전환",
  WEBSITE_TRAFFIC: "웹사이트 트래픽",
  BRAND: "브랜드 인지도 및 도달 범위",
  SALES: "판매",
  APP_INSTALLATION: "앱설치",
  LEAD: "리드",
  VIDEO_VIEWS: "동영상 조회",
} as const;

const CAMPAIGN_TABLE_COLUMNS: Record<
  keyof Omit<CampaignContent, "id">,
  Omit<TableHeader, "name">
> = {
  enabled: { label: "상태", type: "boolean", width: 2 },
  name: { label: "캠페인명", type: "text", width: 8 },
  campaign_objective: {
    label: "캠페인 목적",
    type: "constant",
    values: CAMPAIGN_OBJECTIVES,
    width: 5,
  },
  impressions: { label: "노출수", type: "integer", width: 5 },
  clicks: { label: "클릭수", type: "integer", width: 4 },
  ctr: { label: "CTR", type: "float", width: 3 },
  video_views: { label: "동영상 조회수", type: "integer", width: 3 },
  vtr: { label: "VTR", type: "float", width: 3 },
} as const;

export const CAMPAIGN_TABLE_HEADERS: TableHeader[] = Object.entries(
  CAMPAIGN_TABLE_COLUMNS
).map(([key, value]) => ({
  name: key,
  label: value.label,
  type: value.type,
  width: value.width,
  values: value.values,
}));

export const USER_TABLE_COLUMNS: Record<
  keyof Omit<UserContent, "id">,
  Omit<TableHeader, "name">
> = {
  email: { label: "이메일", type: "text", width: 5 },
  name: { label: "이름", type: "text", width: 5 },
  last_login_at: { label: "마지막 로그인", type: "date", width: 5 },
  edit: { label: "수정", type: "edit-button", width: 2 },
} as const;

export const USER_TABLE_HEADERS: TableHeader[] = Object.entries(
  USER_TABLE_COLUMNS
).map(([key, value]) => ({
  name: key,
  label: value.label,
  type: value.type,
  width: value.width,
  values: value.values,
}));

export const USER_TOTAL_ELEMENTS = 143;

export const INITIAL_RESOURCE_TOTAL_ELEMENTS: Record<
  keyof ResourceContentTypeMap,
  number
> = {
  campaigns: 143,
  users: 210,
};

export const PORTAL_HOSTS = {
  USERS: Symbol("users_portal"),
} as const;
