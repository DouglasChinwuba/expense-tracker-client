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
      
    if(this.isHeaderNeeded(req.url) || this.storageService.getToken() != null){
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.storageService.getToken()}`
        }
      });
    }
    
      return next.handle(req);
  }


  isHeaderNeeded(url : string){
    if(url === "http://localhost:8081/auth/signup/" || url === "http://localhost:8081/auth/signin"){
      return false;
    }else{
      return true;
    }
  }

}
