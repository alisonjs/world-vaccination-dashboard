import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {DashboardService} from './dashboard.service';

declare const Plotly;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public country:string= "Brazil";
  public total_vaccination:number = 0;
  public total_percent:number = 0.0;
  public countries:string[] = [];

  @ViewChild('data-filter', {static:false})
  private dataFilter:ElementRef;

  constructor(private dashboardService:DashboardService) { }

  ngOnInit(): void {
    //buscar informações da base da API
    this.dashboardService.getCountries().subscribe((data:string[]) => {
      this.countries = data;
    });
  }
}
