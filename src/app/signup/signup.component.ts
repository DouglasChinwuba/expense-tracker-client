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

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    this.auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/login'])
        },
        err => console.log(err)
      )
  }

}
