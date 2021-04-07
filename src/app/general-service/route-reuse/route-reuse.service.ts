import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from "@angular/router";

export class RouteReuseService extends RouteReuseStrategy {
  cachedRoutes = new Map<string, DetachedRouteHandle | null>();
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    console.log("Detach", route.data.reuse);

    return route.data.reuse;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    console.log("Store", route.data?.reuse);
    if (route.data?.reuse === true) {
      this.cachedRoutes.set(this.getUrlToStore(route), handle);
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    console.log("Attach", route.data.reuse === true);
    console.log(this.cachedRoutes);

    return !!this.cachedRoutes.get(this.getFullUrl(route));
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const cachedRoute = this.cachedRoutes.get(this.getFullUrl(route));
    console.log("Retrieve", cachedRoute);

    return cachedRoute === undefined ? null : cachedRoute;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    const shouldReuseDefault = curr.routeConfig === future.routeConfig;
    console.log("shouldReuse", shouldReuseDefault);

    return shouldReuseDefault;
  }

  private getFullUrl(route: ActivatedRouteSnapshot): string {
    return route.url.join("/");
  }

  private getUrlToStore(route: ActivatedRouteSnapshot): string {
    console.log("urlToStore", route.routeConfig?.path);

    if (route.routeConfig?.path) {
      return route.routeConfig?.path;
    }

    return this.getFullUrl(route);
  }
}
