import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import {SERVICE_URL} from '../config/config';
import 'rxjs/Rx';
@Injectable()
export class UserService {

  token:string="";
  loggedUser:User;
  email:string

  constructor(
    public http:HttpClient
  ) {
    if(localStorage.getItem("email")){
      this.email = localStorage.getItem("email");
    }
   }

  login(email:string,password:string,remember:boolean){
    let url = SERVICE_URL + "/login";
    if(remember){
      localStorage.setItem("email",email);
      this.email=email;
    }
    return this.http.post(url,{email,password}).map((resp:any)=>{
      if(resp.ok){
        this.token=resp.token;
        this.loggedUser=resp.data;
      }else {
        this.token="";
        this.loggedUser=null;
      }
      return resp;
    })
  }

  crearUsuario(user:User){
    let url = SERVICE_URL + "/user";
   
    return this.http.post(url,user);
  }

}
