import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare const Plotly;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('daily', {static: false})
  private daily: ElementRef;

  constructor() { }

  ngOnInit(): void {
    //buscar informações da base da API
  }
  
  ngAfterViewInit(){
    this.plotGraph();
  }

  

  plotGraph(){

    Plotly.newPlot( 
      this.daily.nativeElement, [{
        x: [1, 2, 3, 4, 5],
        y: [1, 2, 4, 8, 16] }], {
          margin: { t: 0 } } );
        }
}
