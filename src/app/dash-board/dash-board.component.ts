import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})

export class DashBoardComponent implements OnInit {

  private getAccountUrl = "http://localhost:8081/account";

  user = 
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>(this.getAccountUrl, this.user);
  }

}
