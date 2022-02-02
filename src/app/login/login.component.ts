import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData:any = {}
  
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  loginUser(){
    this.auth.login(this.loginUserData)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }


}
