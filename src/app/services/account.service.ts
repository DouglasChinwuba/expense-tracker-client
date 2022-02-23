import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private balance : number = 0.00;
  private income : number = 0.00;
  private expense : number = 0.00;
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
}
