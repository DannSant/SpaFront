import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../models/appointment.model';
import { AppointmentService } from '../../../services/appointment.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-current-appointments',
  templateUrl: './current-appointments.component.html',
  styles: []
})
export class CurrentAppointmentsComponent implements OnInit {

  appointments:Appointment[] = [];

  constructor(
    public _appointments:AppointmentService,
    public _alert:AlertService
  ) { }

  ngOnInit() {
    this._appointments.getCurrentAppointments().subscribe((resp:any)=>{
      if(resp.ok){
        this.appointments=resp.data;
      }else {
        this.appointments=[];
        console.log("Error al cargar citas",resp.error);
      }
    })
  }

}
