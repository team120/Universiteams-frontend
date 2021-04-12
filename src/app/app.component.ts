import { LayoutManagerService } from "./general-service/layout-manager/layout-manager.service";

import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { MatSidenav } from "@angular/material/sidenav";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav: MatSidenav | undefined;
  showHeader = false;
  showSidenav = false;
  isMobile = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private deviceDetectorService: LayoutManagerService
  ) {
    deviceDetectorService.isMobile().subscribe((result) => {
      this.isMobile = result;
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader =
          this.activatedRoute.firstChild?.snapshot.data.showHeader !== false;
        this.showSidenav =
          this.activatedRoute.firstChild?.snapshot.data.showNavbar !== false;
      }
    });
  }

  onToggleSidebar() {
    this.isMobile && this.sidenav && this.sidenav.toggle();
    !this.isMobile && this.deviceDetectorService.toggleExtendedMode();
  }
}
