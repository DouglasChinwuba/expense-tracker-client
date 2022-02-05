import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  loginUserData : any = {} ;
  isLoggedIn : boolean = false;
  isLoginFailed : boolean = false;


  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    this.auth.login(this.loginUserData)
    .subscribe(
      res => {
        console.log(res);
        this.isLoggedIn = true;
        this.router.navigate(['/dashBoard']);

      },
      err => {
        console.log(err);
        this.isLoginFailed = true;
      }
    )
  }


}
