import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { LocalStorageService } from "../local-storage.service";
import { LoginInputDto } from "../model/auth/input/login.input.dto";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private storageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.login({ mail: "user1@example.com", password: "password1" });
  }

  login(loginData: LoginInputDto) {
    this.authService.login(loginData).subscribe((loggedUsr) => {
      this.storageService.updateTokenInStorage(loggedUsr);
      this.router.navigate(["users"]);
    });
  }
}
