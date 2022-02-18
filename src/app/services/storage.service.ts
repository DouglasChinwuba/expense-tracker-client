import { Injectable } from '@angular/core';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth_user'; 

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveToken(token : string){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken(){
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  deleteToken(){
    window.sessionStorage.removeItem(TOKEN_KEY);
  }

  saveUser(user: any){
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(){
    return JSON.parse(sessionStorage.getItem(USER_KEY) || '{}');
  }

  deleteUser(){
    window.sessionStorage.removeItem(USER_KEY);
  }
  
}
