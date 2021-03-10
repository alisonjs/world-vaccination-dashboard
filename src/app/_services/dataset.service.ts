import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = environment.api.baseUrl + 'dataset/'

export interface CountryInfo {
  country: string,
  total_vaccinations: number,
  total_vaccinations_per_hundred: number,
  date: string,
  daily_vaccinations: number
}

export interface TotalInfo {
  country: string,
  total_vaccinations: number,
  date: Date,
}
export interface DailyInfo {
  country: string,
  date: Date,
  daily_vaccinations: number
}
export interface DateInfo {
  start_date: string,
  end_date: string,
}


@Injectable({
  providedIn: 'root'
})
export class DatasetService {

  constructor(private http: HttpClient) { }

  getCountries(): Observable<string[]> {
    return this.http.get<string[]>(API_URL + 'countries');
  }

  getCountryInformation(country: string, date: string): Observable<CountryInfo> {
    return this.http.get<CountryInfo>(API_URL + `country?country=${country}&date=${date}`);
  }

  getCountryDailyVaccinations(country: string, date: string): Observable<DailyInfo[]> {
    return this.http.get<DailyInfo[]>(API_URL + `country/daily_vaccinations?country=${country}&date=${date}`);
  }

  getTotalVaccinations(date: string): Observable<TotalInfo[]> {
    return this.http.get<TotalInfo[]>(API_URL + `countries/total_vaccinations?date=${date}`);
  }

  getTotalVaccinationsTop(limit: number, date: string): Observable<TotalInfo[]> {
    return this.http.get<TotalInfo[]>(API_URL + `countries/total_vaccinations?limit=${limit}&date=${date}`);
  }

  getCountryDate(country: string): Observable<DateInfo> {
    return this.http.get<DateInfo>(API_URL + `country/dates/?country=${country}`);
  }
}
