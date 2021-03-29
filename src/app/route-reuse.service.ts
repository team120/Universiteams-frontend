import {
  RouteReuseStrategy,
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouterModule,
  Routes,
  UrlSegment,
} from "@angular/router";
export class RouteReuseService implements RouteReuseStrategy {
  private handlers: { [key: string]: DetachedRouteHandle } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return false;
    }
    let shouldReuse = false;
    console.log("checking if this route should be re used or not’, route");
    if (route.routeConfig.data) {
      route.routeConfig.data.reuse ? (shouldReuse = true) : (shouldReuse = false);
    }
    return shouldReuse;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    console.log("storing handler");
    const routeUrl = this.getUrl(route);
    if (handle && routeUrl) {
      this.handlers[routeUrl] = handle;
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    console.log("checking if it should be re attached");
    const routeUrl = this.getUrl(route);
    return routeUrl !== undefined && !!this.handlers[routeUrl];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return null;
    }

    const routeUrl = this.getUrl(route);
    if (routeUrl === undefined) return null;

    return this.handlers[routeUrl];
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    let reUseUrl = false;
    if (future.routeConfig) {
      if (future.routeConfig.data) {
        reUseUrl = future.routeConfig.data.reuse;
      }
    }
    const defaultReuse = future.routeConfig === curr.routeConfig;
    return reUseUrl || defaultReuse;
  }

  getUrl(route: ActivatedRouteSnapshot): string | undefined {
    if (route.routeConfig) {
      const url = route.routeConfig.path;
      console.log("returning url", url);
      return url;
    }
    return undefined;
  }
}
