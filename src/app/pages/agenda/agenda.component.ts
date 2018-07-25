import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/appointment.model';
import { ServiceDayService } from '../../services/service-day.service';
import { ServiceDay } from '../../models/service-day.model';
import { WEEK_DAYS } from '../../config/config';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styles: []
})
export class AgendaComponent implements OnInit {

  serviceHours:any[]=[];

  selectedServiceDay:ServiceDay;

  serviceDays:ServiceDay[]=[]; 

  constructor(
    public _appointments:AppointmentService,
    public _serviceDay:ServiceDayService
  ) { }

  ngOnInit() {

    this._serviceDay.loadServiceDays().subscribe((resp:any)=>{
      if(resp.ok){
        this.serviceDays=resp.data;
      }else {
        console.error("Ocurrio un error al cargar los servicios", resp.error)
      }
    });
  }

  loadAppointments(date:Date){

    let selectedWeekDayNumber = date.getDay();
    let selectedWeekDay:string = WEEK_DAYS[selectedWeekDayNumber];
    this.selectedServiceDay = this._serviceDay.getServiceDayByDesc(selectedWeekDay,this.serviceDays);
   
    let dateFromTime = date.getTime();  

    let dateTo= new Date(date);
    dateTo.setDate(dateTo.getDate() + 1)
    dateTo.setSeconds(dateTo.getSeconds()-1);
    //console.log(date);
    //console.log(dateTo);
    let dateToTime =dateTo.getTime();
    this._appointments.getAppointmentsByDate(0,100,dateFromTime,dateToTime).subscribe((resp:any)=>{
      if(resp.ok){
        this.buildHoursData(resp.data);
      }
    });
  }

  buildHoursData(appointments:Appointment[]){
    console.log(appointments);

    this.serviceHours = [];
    let hoursRawData =this.selectedServiceDay.businessHours;
    
    let hoursData = hoursRawData.split("|");
  
    for (let h of hoursData){
      let startTime = h.split("-")[0];
      let appointmentInThisHour = this.getAppointmentByHour(appointments,startTime);
      let hourData:any = {}
      if (appointmentInThisHour){
        hourData.appointment=appointmentInThisHour;
        hourData.time = h;
        hourData.service=appointmentInThisHour.service.name;
        hourData.user=appointmentInThisHour.user.name
        hourData.cellphone=appointmentInThisHour.user.cellphone
        hourData.status=appointmentInThisHour.status        
      }else {
        hourData.appointment=null;
        hourData.time = h;
        hourData.service="";
        hourData.user=""
        hourData.cellphone="";
        hourData.status="LIBRE"
      }

      this.serviceHours.push(hourData);
      
     
    }

  }

  getAppointmentByHour(appointments:Appointment[],startTime:string):any{
    let appointmentInHour:Appointment;
    for (let a of appointments){
      let appointmentDate = new Date(a.date);     
      let appointmentTime = String(appointmentDate.getHours());
      if(appointmentTime.substring(0,2)==startTime.substring(0,2)){
        appointmentInHour=a;
        break;
      }
    }
    return appointmentInHour;
  }

}
