import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav: MatSidenav | undefined;
  showHeader = false;
  showSidenav = false;
  showFooter = false;
  isMobile = false

  constructor(private router: Router, private activatedRoute: ActivatedRoute, breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.Handset
    ]).subscribe(result => {
      if (result.matches){
        this.isMobile = true
      }
    })
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader = this.activatedRoute.firstChild?.snapshot.data.showHeader !== false;
        this.showSidenav = this.activatedRoute.firstChild?.snapshot.data.showNavbar !== false;
        this.showFooter = this.activatedRoute.firstChild?.snapshot.data.showFooter !== false;
      }
    });
  }

  onToggleSidebar() {
    if (this.sidenav !== undefined) {
      this.sidenav.toggle();
    }
  }
}
