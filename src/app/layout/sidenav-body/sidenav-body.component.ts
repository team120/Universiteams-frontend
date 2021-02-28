import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-sidenav-body",
  templateUrl: "./sidenav-body.component.html",
  styleUrls: ["./sidenav-body.component.scss"],
})
export class SidenavBodyComponent {
  @Output() toggleSidebar = new EventEmitter();

  onClickToggleSidebarButton(){
    this.toggleSidebar.emit()
  }
}
