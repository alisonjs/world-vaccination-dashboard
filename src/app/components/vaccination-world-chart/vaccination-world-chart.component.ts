import { Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import { TotalInfo } from '../dashboard/dashboard.service';
declare const Plotly;
@Component({
  selector: 'app-vaccination-world-chart',
  templateUrl: './vaccination-world-chart.component.html',
  styleUrls: ['./vaccination-world-chart.component.css']
})
export class VaccinationWorldChartComponent implements OnInit {

  constructor() { }

  @Input() total_top:TotalInfo[];

  ngOnInit(): void {
  }

  @ViewChild('daily', {static: false})
  private daily: ElementRef;

  ngOnChanges(){
    if(typeof this.total_top !== 'undefined' && this.total_top.length){
      this.plotGraph();
    }
  }

  private plotGraph(){

    var trace1 = {
      x: this.total_top.map((item) => item.country),
      y: this.total_top.map((item) => item.total_vaccinations),
      name: 'Total de vacinação',
      type: 'bar'
    };
    
    
    const data = [trace1];
    const layout = { 
      title: 'Top 10',
    };
    const config = {responsive: true}
    Plotly.newPlot(this.daily.nativeElement, data, layout, config)
  }
}
