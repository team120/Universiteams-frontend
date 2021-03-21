import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { DeviceDetectorService } from "./device-detector.service";

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
    deviceDetectorService: DeviceDetectorService
  ) {
    deviceDetectorService.isMobile().subscribe((result) => {
      this.isMobile = result.matches;
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader = this.activatedRoute.firstChild?.snapshot.data.showHeader !== false;
        this.showSidenav = this.activatedRoute.firstChild?.snapshot.data.showNavbar !== false;
      }
    });
  }

  onToggleSidebar() {
    if (this.sidenav !== undefined) {
      this.sidenav.toggle();
    }
  }
}
