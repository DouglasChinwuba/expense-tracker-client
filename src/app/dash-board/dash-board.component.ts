import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})

export class DashBoardComponent implements OnInit {
  
  user = this.storageService.getUser();
  getAccountUrl = "http://localhost:8081/account/" + this.user.username;
 
  currentDate = new Date().toDateString();
  userAccount = {};
  math = Math; 

  constructor(private http : HttpClient, 
              private storageService : StorageService,
              public accountService : AccountService) { }

  ngOnInit(): void {
    this.http.get<any>(this.getAccountUrl).subscribe(
      res => {
        this.userAccount = res;
        // console.log(this.userAccount);
        this.populateTransactions(this.userAccount);
        this.populateTransDates();
        console.log(this.accountService.getAllDates())
      },err => {
        console.log(err);
      }
    )
  }

  populateTransactions(userAccount: any){
    for(let transaction of userAccount.incomes){
      this.accountService.getTransactions().push(transaction);
    }
    for(let transaction of userAccount.expenses){
      this.accountService.getTransactions().push(transaction);
    }
    this.accountService.getTransactions().sort(function(a:any, b:any){
      let c: any = new Date(a.date);
      let d: any = new Date(b.date);
      return c-d;
    });
  }

  populateTransDates(){
    for(let transaction of this.accountService.getTransactions()){
      this.accountService.getAllDates()[transaction.date] ??= [];
      this.accountService.getAllDates()[transaction.date].push(transaction);
    }
  }

  addTransaction(){
    
  }



}
