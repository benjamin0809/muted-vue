export interface IRole {
  id: number;
  name: string;
  permission: string[];
  orgId: string;
  date: string;
}

export interface IUser {
  id: number;
  name: string;
  address: string;
  role: string;
  avatar: string;
  email: string;
  date: string;
}
