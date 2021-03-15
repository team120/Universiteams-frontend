import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Project } from "./model/project/project";

@Injectable({
  providedIn: "root",
})
export class ProjectsService {
  private readonly baseUrl = "http://localhost:3000";

  constructor(private httpClient: HttpClient) {}

  getProjects(params?: {
    generalSearchTerm?: string;
    universityId?: number;
    departmentId?: number;
    type?: string;
    dateFrom?: Date;
    isDown?: boolean;
  }): Observable<Project[]> {
    const url = `${this.baseUrl}/projects`
      .concat(params ? "?" : "")
      .concat(params?.generalSearchTerm ? `generalSearch=${params.generalSearchTerm}&` : "")
      .concat(params?.universityId ? `universityId=${params.universityId}&` : "")
      .concat(params?.departmentId ? `departmentId=${params.departmentId}&` : "")
      .concat(params?.type ? `type=${params.type}&` : "")
      .concat(params?.dateFrom ? `dateFrom=${params.dateFrom}&` : "")
      .concat(params?.isDown ? `isDown=${params.isDown}&` : "");

    console.log(url);
    return this.httpClient.get<Project[]>(url);
  }
}
