import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = "http://localhost:8080/auth/signup/";
  private loginUrl = "http://localhost:8080/auth/signin";

  constructor(private http: HttpClient, 
              private storageService: StorageService,
              private router : Router) { }

  loginUser(user: any){
    return this.http.post<any>(this.loginUrl, user)
                .pipe(catchError(this.errorHandler));
  }

  registerUser(user: any){
    return this.http.post<any>(this.registerUrl, user);
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }
  
  isLoggedIn(){
    return this.storageService.getToken() ? true : false;
  }

  logoutUser(){
    this.storageService.deleteToken();
    this.router.navigate(['/login']);
  }
}
