import { inject } from '@angular/core';
import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { from, Observable, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { FireAuthService } from '../services/fire-auth.service';

export const firebaseAuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const o = from(inject(FireAuthService).getToken());
  return o.pipe(
    map((token: string | undefined) => {
      if (token == undefined) return req;
      return req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }),
    switchMap((reqT: HttpRequest<unknown>) => next(reqT))
  );
}
