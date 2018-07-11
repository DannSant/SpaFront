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
    public _userService:UserService,
    public router:Router
  ) { }

  ngOnInit() {
  }

  logout(){
    this._userService.logout();
    this.router.navigate(["/home"]);
  }

}
