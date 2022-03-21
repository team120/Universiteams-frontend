import { Component } from "@angular/core";
import { LayoutManagerService } from "src/app/general-service/layout-manager/layout-manager.service";

@Component({
  selector: "app-sidenav-body",
  templateUrl: "./sidenav-body.component.html",
  styleUrls: ["./sidenav-body.component.scss"],
})
export class SidenavBodyComponent {
  isDesktopExtended = true;

  constructor(deviceDetector: LayoutManagerService) {
    deviceDetector.isDesktopExtendedMode().subscribe((result) => {
      this.isDesktopExtended = result;
    });
  }
}
