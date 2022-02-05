import { Component, OnInit } from '@angular/core';
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


  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  loginUser(){
    this.auth.login(this.loginUserData)
    .subscribe(
      res => {
        console.log(res);
        this.isLoggedIn = true;
        this.isLoggedIn = true;
      },
      err => {
        console.log(err);
        this.isLoginFailed = true;
      }
    )
  }


}
