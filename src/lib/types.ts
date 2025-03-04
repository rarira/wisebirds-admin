type Company = {
  id: number;
  name: string;
};

export type UserProfile = {
  id: number;
  email: string;
  name: string;
  company: Company;
};
