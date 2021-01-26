import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { SidenavBodyComponent } from './sidenav-body/sidenav-body.component';

@NgModule({
  imports: [CommonModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule],
  exports: [FooterComponent, HeaderComponent, MatSidenavModule, MatButtonModule, SidenavBodyComponent],
  declarations: [FooterComponent, HeaderComponent, SidenavBodyComponent],
})
export class LayoutModule {}
