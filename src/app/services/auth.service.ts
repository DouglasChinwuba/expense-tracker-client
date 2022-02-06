import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = "http://localhost:8080/auth/signup/";
  private loginUrl = "http://localhost:8080/auth/signin";

  constructor(private http: HttpClient, private storageService: StorageService) { }

  login(user: any){
    return this.http.post<any>(this.loginUrl, user)
                .pipe(catchError(this.errorHandler));
  }

  register(user: any){
    return this.http.post<any>(this.registerUrl, user);
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }
  
  loggedIn(){
    return this.storageService.getToken() ? true : false;
  }
}
