import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { BranchOfficeService } from '../../services/branch-office.service';
import { BranchOffice } from '../../models/branch-office.model';
import { ServiceDayService } from '../../services/service-day.service';
import { Service } from '../../models/service.model';
import { ServiceDay } from '../../models/service-day.model';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { AlertService } from '../../services/alert.service';

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
    public _alert:AlertService

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
    
    
  }

  getServiceDayByDesc(desc:string):ServiceDay{
    let sd:ServiceDay;
    for(let currentSD of this.serviceDays){
      //buscar el correcto
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


}
