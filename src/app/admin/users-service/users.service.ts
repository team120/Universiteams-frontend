import { User } from "../../model/user/user";

import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private readonly baseUrl = "http://localhost:3000";

  constructor(private httpClient: HttpClient) {}

  getUsers(token: string): Observable<User[]> {
    const url = `${this.baseUrl}/users`;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token,
      }),
    };
    return this.httpClient.get<User[]>(url, httpOptions);
  }

  getUser(id: Number): Observable<User> {
    const url = `${this.baseUrl}/users/${id}`;
    return this.httpClient.get<User>(url);
  }
}
