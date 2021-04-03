import { BreakpointObserver, Breakpoints, BreakpointState } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DeviceDetectorService {
  private breakpointStateObservable!: Observable<BreakpointState>;
  constructor(breakpointObserver: BreakpointObserver) {
    this.breakpointStateObservable = breakpointObserver.observe([Breakpoints.Handset]);
  }

  isMobile() {
    return this.breakpointStateObservable;
  }
}
