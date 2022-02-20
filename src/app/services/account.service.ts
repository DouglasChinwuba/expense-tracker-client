import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private balance = 0.00;
  private income = 0.00;
  private expense = 0.00;
  private transactions : any = [];
  private allDates : {[key: string] : Array<any> } = {};

  constructor() { }

  getBalance(){
    return this.balance;
  }

  getIncome(){
    return this.income;
  }

  getExpense(){
    return this.expense;
  }

  getTransactions(){
    return this.transactions;
  }

  getAllDates(){
    return this.allDates;
  }

  reset(){
    this.balance = 0.00;
    this.income = 0.00;
    this.expense = 0.00;
    this.transactions = [];
    this.allDates = {};
  }
}
