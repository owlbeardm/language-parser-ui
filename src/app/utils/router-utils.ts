import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';

export function findParam(name: string, route: ActivatedRouteSnapshot): string | null {
  const value = route.params[name];
  if (value) {
    return value;
  } else if (route.parent) {
    return findParam(name, route.parent);
  }
  return null;
}
