import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';

@Injectable()
export class LoggedGuard implements CanActivate {

  constructor(
    public _userService:UserService
  ){}

  canActivate():  boolean {    

    return this._userService.isAuthenticated();
  }
}
