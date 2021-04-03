import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { University } from "./model/university/university";

@Injectable({
  providedIn: "root",
})
export class UniversitiesService {
  private readonly baseUrl = "http://localhost:3000";

  constructor(private httpClient: HttpClient) {}

  getUniversities(): Observable<University[]> {
    const url = `${this.baseUrl}/universities`;
    return this.httpClient.get<University[]>(url);
  }
}
