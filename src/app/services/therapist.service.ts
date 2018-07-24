import { Injectable } from '@angular/core';
import { SERVICE_URL } from '../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertService } from './alert.service';
import { UserService } from './user.service';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { Therapist } from '../models/therapist.model';

@Injectable()
export class TherapistService {

  constructor(
    public http:HttpClient,
    public _alert:AlertService,
    public _userService:UserService
  ) { }

  createTherapist(therapist:Therapist){
    let url = SERVICE_URL + "/therapist";
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.post(url,therapist,{headers}).catch((e)=>{      
      let errorMessage = e.error.error.message;     
      console.error(errorMessage);
      if(e.status==409){
        this._alert.showAlert("Error","Ha ocurrido un error al crear el masajista, posiblemente el email "+therapist.name.toUpperCase()+" esté ya registrado en la base de datos","error");
      }else {
        this._alert.showAlert("Error al crear masajista","Ha ocurrido un error al crear el masajista","error");
      }
      
      return Observable.throw(e);
    });
  }

  loadAllTherapists(){
    let url = SERVICE_URL + "/therapist/all";
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.get(url,{headers}).catch((e)=>{      
      let errorMessage = e.error.error.message;      
      console.error(errorMessage);
      this._alert.showAlert("Error","Ha ocurrido un error al recuperar los masajistas de la base de datos. Intenta recargar la pagina","error");
      return Observable.throw(e);
    });
  }

  getTherapist(id:string){
    let url = SERVICE_URL + "/therapist?id=" + id;
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.get(url,{headers}).catch((e)=>{      
      let errorMessage = e.error.error.message;
      console.error(errorMessage);
      this._alert.showAlert("Error","Ha ocurrido un error al recuperar al masajista de la base de datos. Intenta recargar la pagina","error");
      return Observable.throw(e);
    });
  }

  modifyTherapist(therapist:Therapist){
    let url = SERVICE_URL + "/therapist/" + therapist._id;
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.put(url,therapist,{headers}).catch((e)=>{      
      let errorMessage = e.error.error.message;
      this._alert.showAlert("Error","Ha ocurrido un error al guardar en la base de datos. Intenta recargar la pagina","error");
      return Observable.throw(e);
    });
  }

  deleteTherapist(therapist:Therapist){
    let url = SERVICE_URL + "/therapist/delete/" + therapist._id;
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.post(url,therapist,{headers}).catch((e)=>{      
      let errorMessage = e.error.error.message;
      this._alert.showAlert("Error","Ha ocurrido un error al borrar al masajista en la base de datos. Intenta recargar la pagina","error");
      return Observable.throw(e);
    });
  }



}
