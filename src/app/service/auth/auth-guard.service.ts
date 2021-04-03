import { AuthService } from "./auth.service";
import { LoginComponent } from "../../login/login.component"

import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.authService.isAuthenticated()) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.closeOnNavigation = true;
      dialogConfig.panelClass = "no-padding-dialog";
      dialogConfig.data = {
        redirectRoute: route.routeConfig?.path,
      };
      this.dialog.open(LoginComponent, dialogConfig);
      return false;
    }
    return true;
  }
}
