import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { AuthGuardService } from "./auth-guard.service";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
  {
    path: "users",
    component: UsersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      showNavbar: false,
      showHeader: false,
    },
  },
  {
    path: "register",
    component: RegisterComponent,
    data: {
      showNavbar: false,
      showHeader: false,
    },
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "account-settings",
    component: AccountSettingsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
