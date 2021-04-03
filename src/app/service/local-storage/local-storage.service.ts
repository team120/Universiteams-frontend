import { Injectable } from "@angular/core";
import { LoggedUserDto } from "./model/auth/output/login.output.dto";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  updateTokenInStorage(loggedUser: LoggedUserDto) {
    localStorage.setItem("userToken", loggedUser.accessToken ?? "No Token");
  }

  getTokenInStorage() {
    return localStorage.getItem("userToken");
  }
}
