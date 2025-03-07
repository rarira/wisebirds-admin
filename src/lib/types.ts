import { CAMPAIGN_OBJECTIVES } from "./constants";

export interface Identifiable
  extends Record<string, string | number | boolean> {
  id: number;
}

export type DataType = "text" | "constant" | "integer" | "float" | "boolean";

type Company = {
  id: number;
  name: string;
};

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  company: Company;
}

export type TableHeader = {
  name: string;
  label: string;
  type: DataType;
  width: number;
  values?: Record<string, string>;
};

export type InferDataType<T extends unknown[]> = T extends (infer U)[]
  ? U
  : never;

export type CampaignContent = Identifiable & {
  enabled: boolean;
  campaign_objective: keyof typeof CAMPAIGN_OBJECTIVES;
  impressions: number;
  clicks: number;
  ctr: number;
  video_views: number;
  vtr: number;
};

export type UserContent = Identifiable & {
  email: string;
  name: string;
  last_login_at: string;
};

type SortInfo = {
  sort_field: string;
  sort_order: "ASC" | "DESC";
};
export type PageInfo = {
  total_elements: number;
  total_pages: number;
  last: boolean;
  number: number;
  size: number;
  sort: SortInfo;
  number_of_elements: number;
  first: boolean;
  empty: boolean;
};

export type CampaignApiResponse = PageInfo & {
  content: CampaignContent[];
};

export type UserApiResponse = PageInfo & {
  content: UserContent[];
};
