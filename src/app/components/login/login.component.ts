import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model:any = {
    username:"",
    password:""
  }

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService:AuthService, 
    private tokenStorage:TokenStorageService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  public login(){
    this.authService.login(this.model.username, this.model.password).subscribe((data:any) => {
      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUser(this.model);
      this.isLoginFailed = false;
      this.isLoggedIn = true;
    },(error:any) => {
      this.errorMessage = error.error.message;
      this.isLoginFailed = true;
    });
  }
  
  reloadPage(): void {
    window.location.reload();
  }
}
