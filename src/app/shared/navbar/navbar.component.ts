import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor(
    public _userService:UserService
  ) { }

  ngOnInit() {
    this._userService.validateSession().subscribe();
  }

  logout(){
    this._userService.logout();
    
  }

}
