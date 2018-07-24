import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVICE_URL } from '../config/config';
import { UserService } from './user.service';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BranchOffice } from '../models/branch-office.model';
import { AlertService } from './alert.service';

@Injectable()
export class BranchOfficeService {

  constructor(
    public http:HttpClient,
    public _userService:UserService,
    public _alert:AlertService
  ) { }

  loadBranchOffices(){
    let url = SERVICE_URL + "/branchOffice/all";
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.get(url,{headers}).catch((e)=>{      
      let errorMessage = e.error.error.message;      
      console.error(errorMessage);
      this._alert.showAlert("Error","Ha ocurrido un error al recuperar las sucursales de la base de datos. Intenta recargar la pagina","error");
      return Observable.throw(e);
    });
  }

  createBranchOffice(branchOffice:BranchOffice){
    let url = SERVICE_URL + "/branchOffice";
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.post(url,branchOffice,{headers}).catch((e)=>{      
      let errorMessage = e.error.error.message;     
      console.error(errorMessage);
      
      this._alert.showAlert("Error","Ha ocurrido un error al crear la sucursal","error");
      
      
      return Observable.throw(e);
    });
  }

  getBranchOffice(id:string){
    let url = SERVICE_URL + "/branchOffice?id=" + id;
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.get(url,{headers}).catch((e)=>{      
      let errorMessage = e.error.error.message;
      console.error(errorMessage);
      this._alert.showAlert("Error","Ha ocurrido un error al recuperar la sucursal de la base de datos. Intenta recargar la pagina","error");
      return Observable.throw(e);
    });
  }

  modifyBranchOffice(branchOffice:BranchOffice){
    let url = SERVICE_URL + "/branchOffice/" + branchOffice._id;
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.put(url,branchOffice,{headers}).catch((e)=>{      
      let errorMessage = e.error.error.message;
      this._alert.showAlert("Error","Ha ocurrido un error al guardar en la base de datos. Intenta recargar la pagina","error");
      return Observable.throw(e);
    });
  }

  deleteTherapist(branchOffice:BranchOffice){
    let url = SERVICE_URL + "/branchOffice/delete/" + branchOffice._id;
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.post(url,branchOffice,{headers}).catch((e)=>{      
      let errorMessage = e.error.error.message;
      this._alert.showAlert("Error","Ha ocurrido un error al borrar la sucursal en la base de datos. Intenta recargar la pagina","error");
      return Observable.throw(e);
    });
  }

}
