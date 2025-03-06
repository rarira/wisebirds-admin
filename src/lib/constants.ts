import { CampaignContent, TableHeader } from "./types";

export const ROLES = {
  admin: "어드민",
  manager: "매니저",
  viewer: "뷰어",
} as const;

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

export const PAGINATION_SIZE = 25;

export const CAMPAIGN_TOTAL_ELEMENTS = 143;

export const MAX_PAGE_TO_DISPLAY = 4;
