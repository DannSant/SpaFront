import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { SERVICE_URL } from '../config/config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AlertService } from './alert.service';

@Injectable()
export class ServiceDayService {

  constructor(
    public http:HttpClient,
    public _userService:UserService,
    public _alert:AlertService,
    public router:Router
  ) { }

  loadServiceDays(){
    let url = SERVICE_URL + "/serviceDay/all";
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.get(url,{headers}).catch((e)=>{      
      let errorMessage = e.error.error.message;
      let status=e.status;
      if(status==401){
        this._alert.showAlertWithCallback("Error de autenticacion","Tu sesion ha expirado, favor de iniciar nuevamente sesion","error",()=>{
          this._userService.logout();
        });
      }else {
        this._alert.showAlert("Error al cargar datos",errorMessage,"error");
      }
      
      return Observable.throw(e);
    });
  }

}
