import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FireAuthService} from '../services/fire-auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthInterceptor implements HttpInterceptor {

  constructor(private fireAuthService: FireAuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userString = localStorage.getItem('fire.user');
    const user = JSON.parse(userString ? userString : 'null');
    const token = user?.stsTokenManager?.accessToken;
    // const token = this.fireAuthService.getToken().then((token)=>{    });

    if (!token) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(req1);
  }
}
