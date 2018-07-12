import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { SERVICE_URL } from '../config/config';

@Injectable()
export class ServiceDayService {

  constructor(
    public http:HttpClient,
    public _userService:UserService
  ) { }

  loadServiceDays(){
    let url = SERVICE_URL + "/serviceDay/all";
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.get(url,{headers});
  }

}
