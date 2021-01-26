import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  imports: [CommonModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule],
  exports: [FooterComponent, HeaderComponent, SidebarComponent, MatSidenavModule, MatButtonModule],
  declarations: [FooterComponent, HeaderComponent, SidebarComponent],
})
export class LayoutModule {}
