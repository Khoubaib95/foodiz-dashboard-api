import { IUser } from '@/modules/user/interface/users.interface';

export type TInteraction = {
  total: number;
  users: string[] | IUser[];
};
export type TReview = {
  _id: string;
  date: number;
  stars: number;
  by: string | IUser;
  content: string;
};

export type TReviews = { total: number; list: TReview[] };
export type TPPUsersRoleContent = { userId: string; givenBy: string };
export type TPPUsersRole = {
  admin: TPPUsersRoleContent[];
  editor: TPPUsersRoleContent[];
  moderator: TPPUsersRoleContent[];
};

export type TUpdateOne = {
  n: number;
  nModified: number;
  ok: number;
};
export type TDeleteOne = {
  n?: number;
  ok?: number;
  deletedCount?: number;
};
