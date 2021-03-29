import { ActivatedRouteSnapshot, BaseRouteReuseStrategy } from "@angular/router";
export class RouteReuseService extends BaseRouteReuseStrategy {
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    const shouldReuseDefault = super.shouldReuseRoute(future, curr);
    console.log("default", shouldReuseDefault);
    console.log("current", curr.url.join("/"), "future", future.url.join("/"));

    console.log("match", curr.url[1] !== undefined && future.url[0]?.path === curr.url[0]?.path);
    if (curr.url[1] !== undefined && future.url[0]?.path === curr.url[0]?.path) return true;

    return shouldReuseDefault;
  }
}
