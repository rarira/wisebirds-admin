import { CampaignContent, DataType, TableHeader } from "./types";

export const Roles = {
  admin: "어드민",
  manager: "매니저",
  viewer: "뷰어",
} as const;

export const CampaignObjectives = {
  WEBSITE_CONVERSIONS: "웹사이트 전환",
  WEBSITE_TRAFFIC: "웹사이트 트래픽",
  BRAND: "브랜드 인지도 및 도달 범위",
  SALES: "판매",
  APP_INSTALLATION: "앱설치",
  LEAD: "리드",
  VIDEO_VIEWS: "동영상 조회",
} as const;

const CampaignTableColumns: Record<
  keyof Omit<CampaignContent, "id">,
  Omit<TableHeader, "name">
> = {
  enabled: { label: "상태", type: "boolean", width: 1 },
  name: { label: "캠페인명", type: "text", width: 6 },
  campaign_objective: {
    label: "캠페인 목적",
    type: "constant",
    values: CampaignObjectives,
    width: 4,
  },
  impressions: { label: "노출수", type: "integer", width: 3 },
  clicks: { label: "클릭수", type: "integer", width: 2 },
  ctr: { label: "CTR", type: "float", width: 1 },
  video_views: { label: "동영상 조회수", type: "integer", width: 1 },
  vtr: { label: "VTR", type: "float", width: 1 },
} as const;

export const CampaignTableHeaders: TableHeader[] = Object.entries(
  CampaignTableColumns
).map(([key, value]) => ({
  name: key,
  label: value.label,
  type: value.type,
  width: value.width,
  values: value.values,
}));

export const CampaignTableData: CampaignContent[] = [
  {
    id: 1,
    name: "캠페인1",
    enabled: true,
    campaign_objective: "WEBSITE_TRAFFIC",
    impressions: 384057,
    clicks: 1974,
    ctr: 0.8752,
    video_views: 948,
    vtr: 0.95123,
  },
  {
    id: 2,
    name: "캠페인2",
    enabled: true,
    campaign_objective: "LEAD",
    impressions: 705575,
    clicks: 6726,
    ctr: 0.8733,
    video_views: 40,
    vtr: 0.135,
  },
  {
    id: 3,
    name: "캠페인3",
    enabled: true,
    campaign_objective: "LEAD",
    impressions: 538086,
    clicks: 1171,
    ctr: 0.3833,
    video_views: 512,
    vtr: 0.2512,
  },
];
