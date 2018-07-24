import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-catalog',
  templateUrl: './user-catalog.component.html',
  styles: []
})
export class UserCatalogComponent implements OnInit {
  users:User[]=[];
  constructor(
    public _userService:UserService
  ) { }

  ngOnInit() {

    this._userService.loadAllUsers().subscribe((resp:any)=>{    
      if(resp.ok){
        this.users=resp.data;
      }
    })
  }

}
