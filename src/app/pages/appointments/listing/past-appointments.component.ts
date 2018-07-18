import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../models/appointment.model';
import { AppointmentService } from '../../../services/appointment.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-past-appointments',
  templateUrl: './past-appointments.component.html',
  styles: []
})
export class PastAppointmentsComponent implements OnInit {
  appointments:Appointment[] = [];
  constructor(
    public _appointments:AppointmentService,
    public _alert:AlertService
  ) { }

  ngOnInit() {
    this._appointments.getPastAppointments().subscribe((resp:any)=>{
      if(resp.ok){
        this.appointments=resp.data;
      }else {
        this.appointments=[];
        console.log("Error al cargar citas",resp.error);
      }
    })
  }

}
