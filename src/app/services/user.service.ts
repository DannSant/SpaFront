import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import {SERVICE_URL} from '../config/config';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
@Injectable()
export class UserService {

  token:string="";
  loggedUser:User;
  email:string

  constructor(
    public http:HttpClient,
    public _alert:AlertService,
    public router:Router
  ) {
    this.cargarStorage();
    this.validateSession();

    
   }

   validateSession(){
    let url = SERVICE_URL + "/validateToken";
    let headers = new HttpHeaders({token:this.token})
    return this.http.post(url,{},{headers}).map((resp:any)=>{
     
      if(resp.ok){
        this.guardarStorage(resp.data._id,resp.token,resp.data);
       
      }else {
        this.token="";
        this.loggedUser=null;
        this._alert.showAlert("Sesion Expirada","Vuelva a iniciar sesion","error");
        this.logout(); 
      }
      return resp;
    }).catch((e)=>{      
      let errorMessage = e.error.error.message;
      console.error(errorMessage);
      this._alert.showAlert("Sesion Expirada","Vuelva a iniciar sesion","error");
      this.logout();
      return Observable.throw(e);
    });
   }

   isAuthenticated():boolean{
     if (this.loggedUser){
       return true;
     }else {
       return false;
     }
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
    }).catch((e)=>{      
      let errorMessage = e.error.error.message;
      this._alert.showAlert("Error al iniciar sesion",errorMessage,"error");
      return Observable.throw(e);
    });
  }

  logout(){
    this.token="";
    this.loggedUser=null;   
    this.router.navigate(['/login']);
  }

  crearUsuario(user:User){
    let url = SERVICE_URL + "/user";
   
    return this.http.post(url,user).catch((e)=>{      
      let errorMessage = e.error.error.message;
      this._alert.showAlert("Error al crear usuario",errorMessage,"error");
      return Observable.throw(e);
    });
  }

}
