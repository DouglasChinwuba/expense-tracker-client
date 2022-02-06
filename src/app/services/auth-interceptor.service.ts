import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private storageService : StorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let tokenizedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.storageService.getToken()}`
        }
      });
      return next.handle(tokenizedRequest);
  }

}
