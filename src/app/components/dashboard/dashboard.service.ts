import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiModule} from '../api/api.module';
import { Observable, of } from 'rxjs';
export interface CountryInfo{
  country:string,
  total_vaccinations:number,
  total_vaccinations_per_hundred:number,
  date:string,
  daily_vaccinations:number
}

export interface TotalInfo{
  country:string,
  total_vaccinations:number,
  date:Date,
}
export interface DailyInfo{
  country:string,
  date:Date,
  daily_vaccinations:number
}
export interface DateInfo{
  start_date:string,
  end_date:string,
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private api:ApiModule, private http:HttpClient) { }

  getCountries() : Observable<string[]> {
    return this.http.get<string[]>(this.api.baseUrl + '/dataset/countries');
  }

  getCountryInformation(country:string, date:string) : Observable<CountryInfo>{
    return this.http.get<CountryInfo>(this.api.baseUrl + `/dataset/country?country=${country}&date=${date}`);
  }

  getCountryDailyVaccinations(country:string, date:string) : Observable<DailyInfo[]>{
    return this.http.get<DailyInfo[]>(this.api.baseUrl + `/dataset/country/daily_vaccinations?country=${country}&date=${date}`);
  }

  getTotalVaccinations(date:string) : Observable<TotalInfo[]>{
    return this.http.get<TotalInfo[]>(this.api.baseUrl + `/dataset/countries/total_vaccinations?date=${date}`);
  }

  getTotalVaccinationsTop(limit:number, date:string) : Observable<TotalInfo[]>{
    return this.http.get<TotalInfo[]>(this.api.baseUrl + `/dataset/countries/total_vaccinations?limit=${limit}&date=${date}`);
  }

  getCountryDate(country:string) : Observable<DateInfo>{
    return this.http.get<DateInfo>(this.api.baseUrl + `/dataset/country/dates/?country=${country}`);
  }
}
