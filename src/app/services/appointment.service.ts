import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { SERVICE_URL } from '../config/config';
import { UserService } from './user.service';
import { Appointment } from '../models/appointment.model';

@Injectable()
export class AppointmentService {

  constructor(
    public http:HttpClient,
    public _userService:UserService
  ) { }

  makeAppointment(appointment:Appointment){
    let url = SERVICE_URL + "/appointment/make";
    let headers = new HttpHeaders({token:this._userService.token});
    return this.http.post(url,appointment,{headers});
  }

  getCurrentAppointments(){
    let url = SERVICE_URL + "/appointment/current";
    let headers = new HttpHeaders({token:this._userService.token});
    return this.http.post(url,{},{headers});
  }

  getPastAppointments(){
    let url = SERVICE_URL + "/appointment/past";
    let headers = new HttpHeaders({token:this._userService.token});
    return this.http.post(url,{},{headers});
  }

}
