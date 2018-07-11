import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Service } from '../models/service.model';
import {SERVICE_URL} from '../config/config';
import 'rxjs/Rx';
import { UserService } from './user.service';
@Injectable()
export class ServicesService {

  constructor(
    public http:HttpClient,
    public _userService:UserService
  ) { }

  listarServicios(pageFrom:number,limit=99){
    let url = SERVICE_URL + "/service/all?from=" + pageFrom + "&limit="+limit;
    let headers = new HttpHeaders({
      token:this._userService.token
    })
    return this.http.get(url,{headers})
  }

}
