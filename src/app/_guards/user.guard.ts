import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from 'src/app/_services/token-storage.service'

@Injectable({
  providedIn: 'root'
})


export class UserGuard implements CanActivate {

  constructor(private tokenStorage:TokenStorageService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.tokenStorage.getToken() ? true : this.router.parseUrl('/login');
  }
  
}
