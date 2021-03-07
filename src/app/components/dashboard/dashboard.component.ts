import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DashboardService, CountryInfo } from './dashboard.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

class Filter{
  constructor(
    public country: string,
    public date: NgbDateStruct,
  ){}
}

declare const Plotly;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  model = new Filter('Brazil', {year: 2021, month: 3, day: 4});
  subscriber: Subscription;
  public selected_country: string = 'Brazil'
  public date: string;
  public total_vaccination: number = 0;
  public total_percent: number = 0.0;
  public countries: string[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.fetchCountries();
    this.fetchCountryInfo(this.model.country, this.model.date);
  }

  public fetchData(){
    this.subscriber.unsubscribe();
    console.log(this.model.country, this.model.date)
    this.fetchCountryInfo(this.model.country, this.model.date);
  }

  public fetchCountries(){
    this.dashboardService.getCountries().subscribe((data: string[]) => {
      this.countries = data;
    });
  }

  public fetchCountryInfo(country:string, date:NgbDateStruct){
    this.subscriber = this.dashboardService.getCountryInformation(country, this.formatDate(date)).subscribe((data: CountryInfo) => {
      this.selected_country = data.country;
      this.total_vaccination = data.total_vaccinations;
      this.total_percent = data.total_vaccinations_per_hundred;
    })
  }

  formatDate(date:NgbDateStruct):string{
    return (date.year + "-" + date.month + "-" + date.day);
  }

}
