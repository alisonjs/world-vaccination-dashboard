import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { TotalInfo } from '../dashboard/dashboard.service';
declare const Plotly;
@Component({
  selector: 'app-vaccination-worldmap-chart',
  templateUrl: './vaccination-worldmap-chart.component.html',
  styleUrls: ['./vaccination-worldmap-chart.component.css']
})
export class VaccinationWorldmapChartComponent implements OnInit {

  constructor() { }
  @Input() total: TotalInfo[] = []

  ngOnInit(): void {
  }

  @ViewChild('world', { static: false })
  private world: ElementRef;

  ngOnChanges(){
    if(typeof this.total !== 'undefined' && this.total.length){
      this.plotGraph()
    }
  }

  private plotGraph() {
    let locations = this.total.map((item) => item.country)
    const data = [{
      type: 'choropleth',
      locationmode: 'country names',
      locations: locations,
      z: this.total.map((item) => item.total_vaccinations),
      text: locations,
      autocolorscale: true
    }];

    const layout = {
      title: 'Total de vacinação no mundo',
      geo: {
        projection: {
          type: 'robinson'
        }
      }
    };

    const config = {responsive: true, showLink: false}

    Plotly.newPlot(this.world.nativeElement, data, layout, config);
  }

}
