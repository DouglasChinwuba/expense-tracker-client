import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  saveTransactionUrl = "http://localhost:8081/save/" + this.user.username; 
  deleteTransactionUrl = "http://localhost:8081/delete/";
  currentDate = new Date().toDateString();
  currentTransaction : any = {};
  userAccount : any = {};
  math = Math;
  transactionTypeHasError = true;
  
  @ViewChild('transactionContainer') transactionContainer!: ElementRef<HTMLTableSectionElement>;

  constructor(private http : HttpClient, 
              private storageService : StorageService,
              public accountService : AccountService){}


  ngOnInit(): void {
    this.http.get<any>(this.getAccountUrl).subscribe(
      res => {
        this.userAccount = res;
        console.log(this.userAccount);
        this.populateTransDates();
        this.updateAccountStatus();
      }, err => {
        console.log(err);
      }
    )
  }

  /**
   * Populates accountService allDates map of key:date and value:[] of transactions 
   * with userAccount transactions
   */
  populateTransDates(){
    if (this.userAccount.transactions.length === 0) return ; 
    for(let transaction of this.userAccount.transactions){
      let formattedDate = this.getDateString(transaction.date);
      this.accountService.getAllDates()[formattedDate] ??= [];
      this.accountService.getAllDates()[formattedDate].push(transaction);
    }
  }

  /**
   * Convert dateISO to dateString
   * @param {string} dateISO 
   * @returns {string} dateString 
   */
  getDateString(dateISO: string){
    let dateString = new Date(dateISO).toDateString();
    return dateString;
  }

  /**
   * Adds new transaction to allDates map and userAccount on add transaction button clicked
   */
  addTransaction(){
    let date = new Date().toISOString();
    this.currentTransaction.date = date.substring(0,date.length - 1);
    this.currentTransaction.id = 0;
    this.http.put(this.saveTransactionUrl, this.currentTransaction).subscribe(
      res => {
        let savedTransaction : any = res;
        this.addTransactionToUserAccount(savedTransaction);
        let formattedDate = this.getDateString(savedTransaction.date);
        this.accountService.getAllDates()[formattedDate] ??= [];
        this.accountService.getAllDates()[formattedDate].push(savedTransaction);
        this.updateAccountStatus();
        console.log(this.accountService.getAllDates());
      },err => {
        console.log(err);
      }
    );
  }

  addTransactionToUserAccount(transaction: any){
    this.userAccount.transactions.push(transaction);
    console.log(this.userAccount);
  }

  /**
   * Updates accounts balance, income and expense status
   */
  updateAccountStatus(){
    let allTransactions : Array<any> = Object.values(this.accountService.getAllDates());

    let totalIncome : number = allTransactions.reduce((a,b) => a.concat(b), [])
                                              .filter((trans:any) => trans.type === 'Income')
                                              .map((trans:any) => trans.amount)
                                              .reduce((previousValue:any,currentValue:any) => previousValue + currentValue, 0);


    let totalExpense : number = allTransactions.reduce((a,b) => a.concat(b), [])
                                               .filter((trans:any) => trans.type === 'Expense')
                                               .map((trans:any) => trans.amount)
                                               .reduce((previousValue:any, currentValue:any) => previousValue + currentValue, 0);

    this.accountService.setIncome(totalIncome);
    this.accountService.setExpense(totalExpense);
    this.accountService.setBalance(totalIncome - totalExpense); 
  }

  /**
   * resets transaction form 
   * @param {NgForm} form 
   */
  resetForm(form: NgForm){
    this.currentTransaction = {};
    form.reset();
  }

  validateTransactionType(value : string){
    if(value === 'default'){
      this.transactionTypeHasError = true;
    }else{
      this.transactionTypeHasError = false;
    }
  }

  originalOrder = (a: KeyValue<string, Array<any>>, b: KeyValue<string,Array<any>>): number => {
    return 0;
  }

  /**
   * Highlight transaction row and shows delete button on mouseover 
   */
  showDeleteButton(){
    this.transactionContainer.nativeElement.addEventListener("mouseover", function(e:any){
      const transactionRow = e.target.closest("tr");
      transactionRow.style.backgroundColor = "#DC3545";
      if(transactionRow.querySelector(".btn-delete")){
        transactionRow.querySelector(".btn-delete").classList.remove("hidden")
      }
    }); 
  }

  /**
   * Unhighlight transaction row and hides delete button on mouseout 
   */
  clearDeleteButton(){
    this.transactionContainer.nativeElement.addEventListener("mouseout", function(e:any){
      const transactionRow = e.target.closest("tr");
      transactionRow.style.backgroundColor = "#FFFFFF";
      if(transactionRow.querySelector(".btn-delete")){
        transactionRow.querySelector(".btn-delete").classList.add("hidden")
      }
    }); 
  }

  /**
   * Delete transaction row when delete button is clicked 
   */
  deleteTransaction(){
    let self = this;
    this.transactionContainer.nativeElement.addEventListener("click", function(e:any){
      if(e.target.classList.contains("btn-delete") || e.target.classList.contains("btn-delete-td")){
        const tr = e.target.closest("tr");
        self.removeTransFromMap(parseInt(tr.dataset.id), tr.dataset.date);
        self.http.delete(self.deleteTransactionUrl+tr.dataset.id).subscribe(
          res => {
            console.log(res);
            self.updateAccountStatus();
          },err => {
            console.log(err);
          }
        );
      }
    });
  }

  /**
   * Delete transaction from map of date and transaction 
   */
  removeTransFromMap(id:Number, date:string){
    this.accountService.getAllDates()[date] = this.accountService.getAllDates()[date]
                                                  .filter(trans => trans.id != id);

    if(this.accountService.getAllDates()[date].length === 0){
      delete this.accountService.getAllDates()[date];
    } 
  }
}
