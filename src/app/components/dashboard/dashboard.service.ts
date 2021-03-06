import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiModule} from '../api/api.module';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private api:ApiModule, private http:HttpClient) { }

  getCountries() : Observable<string[]> {
    return this.http.get<string[]>(this.api.baseUrl + '/dataset/countries');
  }
}
