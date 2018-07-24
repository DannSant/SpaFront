import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { SERVICE_URL } from '../config/config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AlertService } from './alert.service';
import { ServiceDay } from '../models/service-day.model';

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

  createServiceDay(serviceDay:ServiceDay){
    let url = SERVICE_URL + "/serviceDay";
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.post(url,serviceDay,{headers}).catch((e)=>{      
      let errorMessage = e.error.error.message;     
      console.error(errorMessage);
      if(e.status==409){
        this._alert.showAlert("Error","Ha ocurrido un error al crear el dia de servicio, posiblemente el email "+serviceDay.day_desc.toUpperCase()+" esté ya registrado en la base de datos","error");
      }else {
        this._alert.showAlert("Error al crear masajista","Ha ocurrido un error al crear el masajista","error");
      }
      
      return Observable.throw(e);
    });
  }

  getServiceDay(id:string){
    let url = SERVICE_URL + "/serviceDay?id=" + id;
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.get(url,{headers}).catch((e)=>{      
      let errorMessage = e.error.error.message;
      console.error(errorMessage);
      this._alert.showAlert("Error","Ha ocurrido un error al recuperar el dia de servicio de la base de datos. Intenta recargar la pagina","error");
      return Observable.throw(e);
    });
  }

  modifyServiceDay(serviceDay:ServiceDay){
    let url = SERVICE_URL + "/serviceDay/" + serviceDay._id;
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.put(url,serviceDay,{headers}).catch((e)=>{     
      let errorMessage = e.error.error.message;
      console.error(errorMessage);
      if(e.status==409){
        this._alert.showAlert("Error","Ha ocurrido un error al guardar en la base de datos. El dia " + serviceDay.day_desc.toUpperCase() + " ya esta en uso","error");
      }else {
        this._alert.showAlert("Error","Ha ocurrido un error al guardar en la base de datos. Intenta recargar la pagina","error");
      }
      
      return Observable.throw(e);
    });
  }

  deleteServiceDay(serviceDay:ServiceDay){
    let url = SERVICE_URL + "/serviceDay/" + serviceDay._id;
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.delete(url,{headers}).catch((e)=>{      
      let errorMessage = e.error.error.message;
      this._alert.showAlert("Error","Ha ocurrido un error al borrar el dia de servicio en la base de datos. Intenta recargar la pagina","error");
      return Observable.throw(e);
    });
  }

}
