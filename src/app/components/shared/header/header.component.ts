import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  @Input() title: string = "";
  @Input() is_hidden: boolean = true;
  @Input() is_hidden_logout: boolean = true;

  ngOnInit(): void {
  }

  public logout(): void {
    console.log("Sair")
    this.tokenStorage.signOut();
    this.router.navigateByUrl("/login");
  }
}
