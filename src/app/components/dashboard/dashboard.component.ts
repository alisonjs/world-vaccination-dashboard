import { Component, OnInit } from '@angular/core';
import { DatasetService, CountryInfo, DailyInfo, DateInfo, TotalInfo } from 'src/app/_services/dataset.service';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

class Filter {
  constructor(
    public country: string,
    public date: NgbDateStruct,
  ) { }
}

class PickerDate {
  constructor(
    public start_date: NgbDateStruct,
    public end_date: NgbDateStruct,
  ) { }
}

declare const Plotly;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pickerDate = new PickerDate({ year: 2021, month: 3, day: 4 }, { year: 2021, month: 4, day: 3 })
  model = new Filter('Brazil', { year: 2021, month: 3, day: 4 });
  public selected_country: string = 'Brazil'
  public selected_date: string = '2021-3-4';
  public total_vaccination: number = 0;
  public total_percent: number = 0.0;
  public countries: string[] = [];
  public daily_vaccinations: DailyInfo[] = [];
  public total_vaccinations: TotalInfo[] = [];
  public total_vaccinations_top: TotalInfo[] = [];

  constructor(private datasetService: DatasetService, private formatter: NgbDateParserFormatter) { }

  ngOnInit(): void {
    this.fetchCountries();
    this.fetchData();
  }

  public fetchData() {
    this.fetchCountryInfo(this.model.country, this.model.date);
    this.fetchDailyVaccinations(this.model.country, this.model.date);
    this.fetchTotalVaccinations(this.model.date);
    this.fetchTotalVaccinationsTop(10,this.model.date);
  }

  public fetchCountries() {
    this.datasetService.getCountries().subscribe((data: string[]) => {
      this.countries = data;
    });
  }

  public fetchCountryInfo(country: string, date: NgbDateStruct) {
    this.datasetService.getCountryInformation(country, this.formatter.format(date)).subscribe((data: CountryInfo) => {
      this.selected_country = data.country;
      let currDate = new Date(data.date)
      this.selected_date = this.formatter.format({ year: currDate.getFullYear(), month: currDate.getMonth(), day: currDate.getDay() })
      this.total_vaccination = data.total_vaccinations;
      this.total_percent = data.total_vaccinations_per_hundred;
    })
  }

  public fetchDailyVaccinations(country: string, date: NgbDateStruct) {
    this.datasetService.getCountryDailyVaccinations(country, this.formatter.format(date)).subscribe((data: DailyInfo[]) => {
      this.daily_vaccinations = data;
    });
  }

  public fetchTotalVaccinations(date: NgbDateStruct) {
    this.datasetService.getTotalVaccinations(this.formatter.format(date)).subscribe((data: TotalInfo[]) => {
      this.total_vaccinations = data;
    });
  }

  public fetchTotalVaccinationsTop(limit:number, date: NgbDateStruct) {
    this.datasetService.getTotalVaccinationsTop(limit, this.formatter.format(date)).subscribe((data: TotalInfo[]) => {
      this.total_vaccinations_top = data;
    });
  }

  public fetchDates(country: string) {
    this.datasetService.getCountryDate(country).subscribe((data: DateInfo) => {
      this.pickerDate.start_date = this.formatter.parse(data.start_date);
      this.pickerDate.end_date = this.formatter.parse(data.end_date);
      this.model.date = this.formatter.parse(data.end_date);
    });
  }

}
