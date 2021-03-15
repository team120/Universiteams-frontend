import { User } from "../user/user";

export enum ProjectType {
  Informal = 1,
  Formal = 2,
}

export class Project {
  name?: string;
  type?: ProjectType;
  isDown?: boolean;
  users?: User[];
  // University Name and Department?
  // Start date
}
