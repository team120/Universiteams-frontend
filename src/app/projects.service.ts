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
    dateFrom?: Date;
    isDown?: boolean;
    universityId?: number;
    departmentId?: number;
  }): Observable<Project[]> {
    const url = `${this.baseUrl}/projects`
      .concat(params ? "?" : "")
      .concat(params?.generalSearchTerm ? `generalSearch=${params.generalSearchTerm}&` : "")
      .concat(params?.dateFrom ? `dateFrom${params.dateFrom}&` : "");
    console.log(url);
    return this.httpClient.get<Project[]>(url);
  }
}
