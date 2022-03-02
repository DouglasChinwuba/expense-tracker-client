import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  user = this.storageService.getUser();

  saveAccountUrl = "http://localhost:8081/save";
  getAccountUrl = "http://localhost:8081/account/" + this.user.username;  

  private balance : number = 0.00;
  private income : number = 0.00;
  private expense : number = 0.00;
  private allDates : {[key: string] : Array<any> } = {};

  constructor(private storageService: StorageService, private http:HttpClient) { }

  getBalance(){
    return this.balance;
  }

  getIncome(){
    return this.income;
  }

  getExpense(){
    return this.expense;
  }

  setBalance(balance : number){
    this.balance = balance;
  }

  setIncome(income : number){
    this.income = income;
  }

  setExpense(expense : number){
    this.expense = expense;
  }

  getAllDates(){
    return this.allDates;
  }

  reset(){
    this.balance = 0.00;
    this.income = 0.00;
    this.expense = 0.00;
    this.allDates = {};
  }

  getUserAccount(){
    this.http.get<any>(this.getAccountUrl).subscribe(
      res => {
        return res;
      },err => {
        console.log(err);
      }
    )
  }

  saveUserAccount(account: any){
    this.http.put(this.saveAccountUrl, account).subscribe(
      res => {
        console.log(res);
      },err => {
        console.log(err);
      }
    )
  }
}
