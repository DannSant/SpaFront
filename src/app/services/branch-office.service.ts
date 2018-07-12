import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVICE_URL } from '../config/config';
import { UserService } from './user.service';

@Injectable()
export class BranchOfficeService {

  constructor(
    public http:HttpClient,
    public _userService:UserService
  ) { }

  loadBranchOffices(){
    let url = SERVICE_URL + "/branchOffice/all";
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.get(url,{headers});
  }

}
