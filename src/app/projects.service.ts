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

  getProjects(): Observable<Project[]> {
    const url = `${this.baseUrl}/projects`;
    return this.httpClient.get<Project[]>(url);
  }
}
