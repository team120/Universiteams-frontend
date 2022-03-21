import { SortAttribute } from "../../model/general/general.model";
import { Project } from "../../model/project/project";

import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ProjectsService {
  private readonly baseUrl = "http://localhost:3000";
  sortAttributesList: SortAttribute[] = [
    { displayName: "Nombre", attribute: "name" },
    { displayName: "Tipo", attribute: "type" },
    { displayName: "Fecha Creación", attribute: "creationDate" },
  ];

  constructor(private httpClient: HttpClient) {}

  getProjects(params?: {
    generalSearchTerm?: string;
    universityId?: number;
    departmentId?: number;
    type?: string;
    dateFrom?: Date;
    isDown?: boolean;
    sortBy?: string;
    inAscendingOrder?: boolean;
  }): Observable<Project[]> {
    const url = `${this.baseUrl}/projects`
      .concat(params ? "?" : "")
      .concat(params?.generalSearchTerm ? `generalSearch=${params.generalSearchTerm}&` : "")
      .concat(params?.universityId ? `universityId=${params.universityId}&` : "")
      .concat(params?.departmentId ? `departmentId=${params.departmentId}&` : "")
      .concat(params?.type ? `type=${params.type}&` : "")
      .concat(params?.dateFrom ? `dateFrom=${params.dateFrom}&` : "")
      .concat(params?.isDown ? `isDown=${params.isDown}&` : "")
      .concat(
        params?.sortBy
          ? `sortBy=${params.sortBy}&inAscendingOrder=${params?.inAscendingOrder ?? true}&`
          : ""
      );

    console.log(url);
    return this.httpClient.get<Project[]>(url);
  }

  getOneProject(id: number) {
    const url = `${this.baseUrl}/projects/${id}`;
    return this.httpClient.get<Project>(url);
  }

  getSortAttributes() {
    return this.sortAttributesList;
  }
}
