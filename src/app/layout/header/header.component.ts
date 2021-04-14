import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { LayoutManagerService } from "src/app/general-service/layout-manager/layout-manager.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter();

  constructor(private layoutManager: LayoutManagerService) {}
  isMobile = this.layoutManager.isMobile();

  onClickToggleSidebarButton() {
    this.toggleSidebar.emit();
  }
}
