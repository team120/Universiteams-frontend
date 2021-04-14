import { LayoutManagerService } from "./general-service/layout-manager/layout-manager.service";

import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { MatSidenav } from "@angular/material/sidenav";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(MatSidenav) sidenav: MatSidenav | undefined;
  showHeader = false;
  showSidenav = false;
  private readonly onDestroy = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private layoutManager: LayoutManagerService
  ) {}

  isMobile = this.layoutManager.isMobile();

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
    this.isMobile.pipe(takeUntil(this.onDestroy)).subscribe((result) => {
      result && this.sidenav && this.sidenav.toggle();
      !result && this.layoutManager.toggleExtendedMode();
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
