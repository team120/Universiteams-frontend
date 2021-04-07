import { LoginInputDto } from "../../model/auth/input/login.input.dto";

import { AuthService } from "../auth-service/auth.service";
import { LocalStorageService } from "../../general-service/local-storage/local-storage.service";

import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconRegistry } from '@angular/material/icon';

const googleLogoURL =
  "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})

export class LoginComponent {
  loginForm = new FormGroup({
    mail: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });

  registerForm = new FormGroup({
    mail: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });

  redirectRoute = "";

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: LocalStorageService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {

    this.redirectRoute = data.redirectRoute;
    this.matIconRegistry.addSvgIcon(
      "logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
  }

  get loginMail() {
    return this.loginForm.get("mail");
  }

  get loginPassword() {
    return this.loginForm.get("password");
  }

  get registerMail() {
    return this.registerForm.get("mail");
  }

  get registerPassword() {
    return this.registerForm.get("password");
  }

  onLoginSubmit() {
    const loginData: LoginInputDto = {
      mail: this.loginMail?.value,
      password: this.loginPassword?.value,
    };
    this.authService.login(loginData).subscribe((loggedUsr) => {
      this.storageService.updateTokenInStorage(loggedUsr);
      this.dialogRef.close();
      this.router.navigate([this.redirectRoute]);
    });
  }

  onRegisterSubmit() {
    const loginData: LoginInputDto = {
      mail: this.registerMail?.value,
      password: this.registerPassword?.value,
    };
    // verify if already exists
    this.router.navigate([this.redirectRoute]);
  }
}
