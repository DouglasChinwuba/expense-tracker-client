import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})

export class DashBoardComponent implements OnInit {
  
  user = this.storageService.getUser();
  getAccountUrl = "http://localhost:8081/account/" + this.user.username;
  balance = 0.00;
  income = 0.00;
  expense = 0.00;

  constructor(private http : HttpClient, private storageService : StorageService) { }

  ngOnInit(): void {
    this.http.get<any>(this.getAccountUrl).subscribe(
      res => {
        console.log(res);
      },err => {
        console.log(err);
      }
    )
  }
}
