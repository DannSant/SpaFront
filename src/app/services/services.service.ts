import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Service } from '../models/service.model';
import {SERVICE_URL} from '../config/config';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { UserService } from './user.service';
import { AlertService } from './alert.service';

@Injectable()
export class ServicesService {

  constructor(
    public http:HttpClient,
    public _userService:UserService,
    public _alert:AlertService
  ) { }

  listarServicios(pageFrom:number,limit=99){
    let url = SERVICE_URL + "/service/all?from=" + pageFrom + "&limit="+limit;
    let headers = new HttpHeaders({
      token:this._userService.token
    })
    return this.http.get(url,{headers})
  }

  createService(service:Service){
    let url = SERVICE_URL + "/service";
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.post(url,service,{headers}).catch((e)=>{      
      let errorMessage = e.error.error.message;     
      console.error(errorMessage);
      
      this._alert.showAlert("Error al crear servicio","Ha ocurrido un error al crear el servicio","error");
      
      
      return Observable.throw(e);
    });
  }

  getService(id:string){
    let url = SERVICE_URL + "/service?id=" + id;
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.get(url,{headers}).catch((e)=>{      
      let errorMessage = e.error.error.message;
      console.error(errorMessage);
      this._alert.showAlert("Error","Ha ocurrido un error al recuperar al servicio de la base de datos. Intenta recargar la pagina","error");
      return Observable.throw(e);
    });
  }

  modifyService(service:Service){
    let url = SERVICE_URL + "/service/" + service._id;
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.put(url,service,{headers}).catch((e)=>{      
      let errorMessage = e.error.error.message;
      this._alert.showAlert("Error","Ha ocurrido un error al guardar en la base de datos. Intenta recargar la pagina","error");
      return Observable.throw(e);
    });
  }

  deleteService(service:Service){
    let url = SERVICE_URL + "/service/delete/" + service._id;
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.post(url,service,{headers}).catch((e)=>{      
      let errorMessage = e.error.error.message;
      this._alert.showAlert("Error","Ha ocurrido un error al borrar el servicio en la base de datos. Intenta recargar la pagina","error");
      return Observable.throw(e);
    });
  }

}
