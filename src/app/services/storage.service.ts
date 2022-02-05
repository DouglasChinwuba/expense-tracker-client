import { Injectable } from '@angular/core';


const TOKEN_KEY : string = 'auth-token';

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
}
