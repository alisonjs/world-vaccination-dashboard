import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
declare const Plotly;
@Component({
  selector: 'app-vaccination-world-chart',
  templateUrl: './vaccination-world-chart.component.html',
  styleUrls: ['./vaccination-world-chart.component.css']
})
export class VaccinationWorldChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('daily', {static: false})
  private daily: ElementRef;

  ngAfterViewInit(){
    this.plotGraph();
  }

  private plotGraph(){
    const trace1 = {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      type: 'scatter',
      name: 'Brasil'
    };
    
    const trace2 = {
      x: [1, 2, 3, 4],
      y: [16, 5, 11, 9],
      type: 'scatter',
      name: 'Mundo',
      mode: 'markers'
    };
    
    const data = [trace1, trace2];
    const layout = { 
      title: 'Total de pessoas vacinadas no dia.',
    };
    const config = {responsive: true}
    Plotly.newPlot(this.daily.nativeElement, data, layout, config)
  }
}
