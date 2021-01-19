import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginInputDto } from "./model/auth/input/login.input.dto";
import { LoggedUserDto } from "./model/auth/output/login.output.dto";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly baseUrl = "http://localhost:3000/auth";

  constructor(private httpClient: HttpClient) {}

  login(user: LoginInputDto): Observable<LoggedUserDto> {
    const url = `${this.baseUrl}/login`;
    return this.httpClient.post<LoggedUserDto>(url, user);
  }
}
