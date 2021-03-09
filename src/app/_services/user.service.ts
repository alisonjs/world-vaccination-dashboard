import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(API_URL, { responseType: 'text' });
  }

  getOne(id:number): Observable<any> {
    return this.http.get(API_URL + id, { responseType: 'text' });
  }

  save(username: string, email: string, password: string, role:string): Observable<any> {
    return this.http.post(API_URL, {
      username,
      email,
      password,
      role
    });
  }

}
