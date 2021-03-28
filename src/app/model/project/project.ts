import { User } from "../user/user";
import { Department } from "../department/department";
import { ProjectTypeEnum } from "./project-type";

export class Project {
  id?: number;
  name?: string;
  type?: ProjectTypeEnum;
  isDown?: boolean;
  users?: User[];
  department?: Department;
  creationDate?: Date;
  // Leader, roles, topics, lastPublication...
}
