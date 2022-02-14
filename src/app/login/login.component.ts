import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : any = {};
  loginUserData : any = {} ;
  isLoggedIn : boolean = false;
  isLoginFailed : boolean = false;


  constructor(private authService: AuthService, private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
  }

  loginUser(){
    this.authService.loginUser(this.loginUserData)
    .subscribe(
      res => {
        console.log(res);
        this.isLoggedIn = true;
        this.storageService.saveToken(res.token);
        this.user.id = res.id;
        this.user.username = res.username;
        this.user.email = res.email;
        this.user.roles = res.roles;
        this.storageService.saveUser(this.user);
        this.router.navigate(['/dashBoard']);
      },
      err => {
        console.log(err);
        this.isLoginFailed = true;
      }
    )
  }


}
