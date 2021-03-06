import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare const Plotly;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('data-filter', {static:false})
  private dataFilter:ElementRef;

  constructor() { }

  ngOnInit(): void {
    //buscar informações da base da API
  }
}
