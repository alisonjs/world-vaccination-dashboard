import { Component, OnInit } from '@angular/core';
import { LoginModel, LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model:LoginModel={username:"", password:""};

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  public login(){
    this.loginService.doLogin(this.model).subscribe((data:any) => {
      console.log(data);
    },(error:any) => {
      console.log(error);
    });
  }
}
