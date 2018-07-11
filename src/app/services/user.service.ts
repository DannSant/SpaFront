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
    this.cargarStorage();
   }

   cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem("token");      
      this.loggedUser = JSON.parse(localStorage.getItem("user"));
    }else {
      this.token = "";
      this.loggedUser=null;
    }

    if(localStorage.getItem("email")){
      this.email = localStorage.getItem("email");
    }
    
  }

  guardarStorage(id:string,token:string,user:User){
   localStorage.setItem("id",id);
   localStorage.setItem("token",token);
   localStorage.setItem("user",JSON.stringify(user));
   this.loggedUser=user;
   this.token=token;
  }

  login(email:string,password:string,remember:boolean){
    let url = SERVICE_URL + "/login";
    if(remember){
      localStorage.setItem("email",email);
      this.email=email;
    }
    return this.http.post(url,{email,password}).map((resp:any)=>{
     
      if(resp.ok){
        this.guardarStorage(resp.data._id,resp.token,resp.data);
      }else {
        this.token="";
        this.loggedUser=null;
      }
      return resp;
    })
  }

  logout(){
    this.token="";
    this.loggedUser=null;
  }

  crearUsuario(user:User){
    let url = SERVICE_URL + "/user";
   
    return this.http.post(url,user);
  }

}
