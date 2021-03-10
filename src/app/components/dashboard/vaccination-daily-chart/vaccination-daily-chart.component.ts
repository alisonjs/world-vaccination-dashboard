import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DailyInfo } from 'src/app/_services/dataset.service';
declare const Plotly;

@Component({
  selector: 'app-vaccination-daily-chart',
  templateUrl: './vaccination-daily-chart.component.html',
  styleUrls: ['./vaccination-daily-chart.component.css']
})
export class VaccinationDailyChartComponent implements OnInit {

  constructor() { }
  @Input() country: string;
  @Input() dailies: DailyInfo[];

  ngOnInit(): void {
    
  }

  @ViewChild('daily', {static: false})
  private daily: ElementRef;

  ngOnChanges(){
    if(typeof this.dailies !== 'undefined' && this.dailies.length){
      this.plotGraph()
    }
  }

  private plotGraph(){
    console.log("dailies:", this.dailies)
    console.log("x:", this.dailies.map(item => item.date))
    console.log("y:", this.dailies.map(item => item.daily_vaccinations))
    const trace1 = {
      x: this.dailies.map(item => item.date),
      y: this.dailies.map(item => item.daily_vaccinations ? item.daily_vaccinations : 0),
      type: 'scatter',
      name: this.country
    };

    const data = [trace1];
    const layout = { 
      title: 'Vacinação diária',
    };
    const config = {responsive: true}
    Plotly.newPlot(this.daily.nativeElement, data, layout, config)
  }
}
