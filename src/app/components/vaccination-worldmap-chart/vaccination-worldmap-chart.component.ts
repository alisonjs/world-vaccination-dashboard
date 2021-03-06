import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare const Plotly;
@Component({
  selector: 'app-vaccination-worldmap-chart',
  templateUrl: './vaccination-worldmap-chart.component.html',
  styleUrls: ['./vaccination-worldmap-chart.component.css']
})
export class VaccinationWorldmapChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('world', { static: false })
  private world: ElementRef;

  ngAfterViewInit(){
    this.plotGraph()
  }

  private plotGraph() {
    Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2010_alcohol_consumption_by_country.csv', function (err, rows) {
      function unpack(rows, key) {
        return rows.map(function (row) { return row[key]; });
      }

      

    });

    const data = [{
      type: 'choropleth',
      locationmode: 'country names',
      locations: ['Brazil', 'Canada', 'China'],
      z: [100, 200, 150],
      text: ['Brasil', 'Canada', 'China'],
      autocolorscale: true
    }];

    const layout = {
      title: 'Pure alcohol consumption<br>among adults (age 15+) in 2010',
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
