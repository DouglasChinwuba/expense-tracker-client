import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerUserData:any = {};
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  registerUser(){
    this.auth.register(this.registerUserData)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  }

}
