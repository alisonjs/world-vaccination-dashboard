import { Component, OnInit } from '@angular/core';
import { AuthenticatedUser, AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';


interface Alert {
  type: string;
  message: string;
}
interface UserForm {
  username: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: UserForm = {
    username: null,
    password: null
  }

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  alerts: Alert[];

  constructor(private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.navigate()
    }
  }

  public login() {

    this.alerts = [];

    if (!this.model.username) {
      this.alerts.push({ type: 'danger', message: 'User required' });
    }

    if (!this.model.password) {
      this.alerts.push({ type: 'danger', message: 'Password required' });
    }

    if (this.alerts.length) return;

    this.authService.login(this.model.username, this.model.password).subscribe((data: AuthenticatedUser) => {
      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUser(data.user);
      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.navigate();
    }, (error: any) => {
      this.isLoginFailed = true;
      this.alerts.push({ type: 'danger', message: "Wrong username or password" })
    });
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  private navigate(){
    this.router.navigateByUrl("/dataset")
  }
}
