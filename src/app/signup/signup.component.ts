import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerUserData:any = {};
  signupSuccessful: any;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signupSuccessful = false;
  }

  registerUser(){
    this.auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          this.signupSuccessful = true;
          // this.router.navigate(['/login'])
        },
        err => console.log(err)
      )
  }
}
