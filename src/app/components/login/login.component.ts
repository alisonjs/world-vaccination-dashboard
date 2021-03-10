import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';


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
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
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

    this.authService.login(this.model.username, this.model.password).subscribe((data: any) => {
      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUser(data.user);
      this.isLoginFailed = false;
      this.isLoggedIn = true;
    }, (error: any) => {
      this.errorMessage = error.error.message;
      this.isLoginFailed = true;
      this.alerts.push({ type: 'danger', message: this.errorMessage })
    });
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  reloadPage(): void {
    window.location.reload();
  }
}
