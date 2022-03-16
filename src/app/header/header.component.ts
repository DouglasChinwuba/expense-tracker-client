import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user = this.storageService.getUser();
  getAccountUrl = "http://localhost:8081/setting/" + this.user.username;

  constructor(public authService : AuthService, 
              public accountService : AccountService,
              private storageService : StorageService,
              private http : HttpClient) { }

  ngOnInit(): void {
  }

  logoutUser(){
    this.authService.logoutUser();
    this.accountService.reset();
  }

  setNotification(event: any){
    // console.log(event.target.checked);
    this.http.put(this.getAccountUrl + "/" + event.target.checked, null).subscribe(
      res => {
        console.log(res);
      }, err => {
        console.log(err);
      }
    );
  }

}
