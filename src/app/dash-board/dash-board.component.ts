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
  currentDate = new Date().toDateString();
  userAccount = {}; 
  transactions : any = [];

  constructor(private http : HttpClient, private storageService : StorageService) { }

  ngOnInit(): void {
    this.http.get<any>(this.getAccountUrl).subscribe(
      res => {
        this.userAccount = res;
        console.log(this.userAccount);
        this.populateTransactions(this.userAccount);
        console.log(this.transactions);
      },err => {
        console.log(err);
      }
    )
  }

  populateTransactions(userAccount: any){
    for(let transaction of userAccount.incomes){
      this.transactions.push(transaction);
    }
    for(let transaction of userAccount.expenses){
      this.transactions.push(transaction);
    }
    this.transactions.sort(function(a:any, b:any){
      let c: any = new Date(a.date);
      let d: any = new Date(b.date);
      return c-d;
    });
  }






}
