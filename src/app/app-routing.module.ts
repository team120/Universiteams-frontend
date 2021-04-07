import { AuthGuardService } from "./auth/auth-guard/auth-guard.service"
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./auth/login/login.component";
import { ProjectDetailComponent } from "./project/project-detail/project-detail.component";
import { ProjectsListComponent } from "./project/projects-list/projects-list.component";
import { UsersComponent } from "./admin/users/users.component";

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "users",
    component: UsersComponent,
    canActivate: [AuthGuardService],
  },
  { path: "projects/:id", component: ProjectDetailComponent },
  {
    path: "projects",
    component: ProjectsListComponent,
    data: {
      reuse: true,
    },
  },
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: "account-settings",
    component: AccountSettingsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
