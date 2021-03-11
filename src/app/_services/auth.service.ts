import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface AuthenticatedUser{
  token:string,
  epire_in:number,
  provider:string,
  user:any
}

const AUTH_API = environment.api.baseUrl + 'auth/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<AuthenticatedUser> {
    return this.http.post<AuthenticatedUser>(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

}
