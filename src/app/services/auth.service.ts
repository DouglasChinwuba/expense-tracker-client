import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = "http://localhost:8080/auth/signup/";
  private loginUrl = "http://localhost:8080/auth/signin";

  constructor(private http: HttpClient) { }

  login(user: any){
    return this.http.post<any>(this.loginUrl, user);
  }

  register(user: any){
    return this.http.post<any>(this.registerUrl, user);
  }
}
