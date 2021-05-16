import { LoginInputDto } from "../../model/auth/input/login.input.dto";
import { LoggedUserDto } from "../../model/auth/output/login.output.dto";

import { LocalStorageService } from "../../general-service/local-storage/local-storage.service";

import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly baseUrl = "http://localhost:3000/auth";
  private jwtHelper: JwtHelperService;

  constructor(private httpClient: HttpClient, private storageService: LocalStorageService) {
    this.jwtHelper = new JwtHelperService();
  }

  login(user: LoginInputDto): Observable<LoggedUserDto> {
    const url = `${this.baseUrl}/login`;
    return this.httpClient.post<LoggedUserDto>(url, user);
  }

  isAuthenticated() {
    const token = this.storageService.getTokenInStorage();
    if (token == null) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }
}
