import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { BranchOfficeService } from '../../services/branch-office.service';
import { BranchOffice } from '../../models/branch-office.model';
import { ServiceDayService } from '../../services/service-day.service';
import { Service } from '../../models/service.model';
import { ServiceDay } from '../../models/service-day.model';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { AlertService } from '../../services/alert.service';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/appointment.model';
import { UserService } from '../../services/user.service';
import { ValueTransformer } from '../../../../node_modules/@angular/compiler/src/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styles: []
})
export class AppointmentComponent implements OnInit {

  services:Service[]=[];
  branchOffices:BranchOffice[]=[];
  serviceDays:ServiceDay[]=[]; 
  days:string[]=[];
  hours:string[]=[];

  branchOffice:string;
  service:string;
  appointmentDate:Date;
  selectedServiceDay:ServiceDay;
  businessHour:string;

  weekDays:any = [
    "domingo",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado"
  ]

  constructor(
    public _services:ServicesService,
    public _branchOffice:BranchOfficeService,
    public _serviceDay:ServiceDayService,
    public activatedRoute:ActivatedRoute,
    public _alert:AlertService,
    public _appointment:AppointmentService,
    public _userService:UserService,
    public router:Router

  ) { }

  ngOnInit() {
    this.loadCatalogs();

    this.activatedRoute.params.subscribe((params)=>{
      this.service=params['id'];
    })
  }

  loadCatalogs(){
    this._services.listarServicios(0,9999).subscribe((resp:any)=>{      
      if(resp.ok){
        this.services=resp.data;
      }else {
        console.error("Ocurrio un error al cargar los servicios", resp.error)
      }
    });
    this._branchOffice.loadBranchOffices().subscribe((resp:any)=>{
      if(resp.ok){
        this.branchOffices=resp.data;
      }else {
        console.error("Ocurrio un error al cargar los servicios", resp.error)
      }
    });
    this._serviceDay.loadServiceDays().subscribe((resp:any)=>{
      if(resp.ok){
        this.serviceDays=resp.data;
      }else {
        console.error("Ocurrio un error al cargar los servicios", resp.error)
      }
    });
  }

  

  loadDays(){
    this.days=[];
    if(!this.branchOffice){
      return;
    }
    for(let serviceDay of this.serviceDays){
      let sdBranchOffice = serviceDay.branchOffice._id;
      if(sdBranchOffice==this.branchOffice){
        this.days.push(serviceDay.day_desc);
      }
    }
  }
  
  checkDate(selectedDate:Date){
    let selectedWeekDayNumber = selectedDate.getDay();
    let selectedWeekDay:string = this.weekDays[selectedWeekDayNumber];
    let isValid=false;
    for (let validDay of this.days){
      if(validDay.toLowerCase()==selectedWeekDay.toLowerCase()){
        isValid=true;
        break;
      }
    }

    if(!isValid){
      this.appointmentDate=null;
      this._alert.showAlert("Error",`Seleccionaste un ${selectedWeekDay.toUpperCase()} y esta sucursal solo atiende los ${this.days.join(",").toUpperCase()} Favor de seleccionar uno de esos dias`,"error");
    }else {
      this.selectedServiceDay = this.getServiceDayByDesc(selectedWeekDay);
    }

    this.loadHours();
    
    
  }

  getServiceDayByDesc(desc:string):ServiceDay{
    let sd:ServiceDay;
    for(let currentSD of this.serviceDays){
      let serviceDayDesc = currentSD.day_desc;
      if(desc.toUpperCase()==serviceDayDesc.toUpperCase()){
        sd = currentSD;
        break;
      }
    }
    return sd;
  }

  loadHours(){
    if(!this.selectedServiceDay){
      console.error("No se ha cargado el dia de servicio seleccionado");
      return;
    }
    this.hours = [];
    let hoursRawData =this.selectedServiceDay.businessHours;
    
    let hoursData = hoursRawData.split("|");
  
    for (let hour of hoursData){
      this.hours.push(hour);
    }
  }

  makeAppointment(){
    let newAppointment = new Appointment();

    //Asignar usuario que pide la cita
    newAppointment.user= this._userService.loggedUser._id;

    //Construir fecha de cita
    let appointmentDate = new Date(this.appointmentDate);
    let hours = Number(this.businessHour.substring(0,2));
    let minutes = Number(this.businessHour.substring(2,2));   
    appointmentDate.setHours(hours);
    appointmentDate.setMinutes(minutes);
    newAppointment.date=appointmentDate;

    //Obtener precio
    let selectedService = this.services.map((value , index)=>{
      if(value._id==this.service){
        return value;
      }
    });
    let price = selectedService[0].price;
    newAppointment.price=price;

    //Servicio
    newAppointment.service = this.service;

    //Sucursal
    newAppointment.branchOffice=this.branchOffice;
    //console.log(newAppointment);
    this._appointment.makeAppointment(newAppointment).subscribe((resp:any)=>{
      if(resp.ok){
        this._alert.showAlert("Cita creada","Haz agendado tu cita correctamente. En un periodo de 24 horas habiles nos comunicaremos contigo para confirmarla. Gracias por tu preferencia","success");
        this.router.navigate(['/appointments']);
      }else {
        this._alert.showAlert("Error","Ocurrio un error al agendar tu cita. Prueba recargando la pagina y agendando de nuevo","error");
      }
    });


    


  }


}
