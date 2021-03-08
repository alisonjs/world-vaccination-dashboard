import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiModule } from '../api/api.module';
export interface LoginModel {
  username:string,
  password:string
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private api:ApiModule, private http:HttpClient) { }

  doLogin( login:LoginModel ) : Observable<any>{
    return this.http.post<any>(this.api.baseUrl + '/users/login',login);
  }
}
