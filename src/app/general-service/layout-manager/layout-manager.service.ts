import { BehaviorSubject, observable, Observable } from "rxjs";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";
import { ApplicationRef, ChangeDetectorRef, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LayoutManagerService {
  private isDesktopExtendedModeObservable = new BehaviorSubject<boolean>(true);
  private isMobileObserver = new BehaviorSubject<boolean>(false);

  constructor(
    breakpointObserver: BreakpointObserver,
    applicationRef: ApplicationRef
  ) {
    breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobileObserver.next(result.matches);
      if (result.matches) {
        this.isDesktopExtendedModeObservable.next(true);
      }
      applicationRef.tick();
    });
  }

  isMobile(): Observable<boolean> {
    return this.isMobileObserver;
  }

  isDesktopExtendedMode(): Observable<boolean> {
    return this.isDesktopExtendedModeObservable;
  }

  toggleExtendedMode() {
    this.isDesktopExtendedModeObservable.next(
      !this.isDesktopExtendedModeObservable.value
    );
  }
}
