import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService : AuthService, private accountService : AccountService) { }

  ngOnInit(): void {
  }

  logoutUser(){
    this.authService.logoutUser();
    this.accountService.reset();
  }
}
