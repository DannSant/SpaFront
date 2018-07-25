import { Component, OnInit } from '@angular/core';
import { ServiceDay } from '../../../models/service-day.model';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { ServiceDayService } from '../../../services/service-day.service';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BranchOffice } from '../../../models/branch-office.model';
import { BranchOfficeService } from '../../../services/branch-office.service';

@Component({
  selector: 'app-service-day-detail',
  templateUrl: './service-day-detail.component.html',
  styles: []
})
export class ServiceDayDetailComponent implements OnInit {


  id:string;
  title:string;
  serviceDay:ServiceDay={};
  branchOffices:BranchOffice[]=[];
  isNew:boolean=true;

 
  constructor(
    public activatedRoute:ActivatedRoute,
    public _serviceDays:ServiceDayService,
    public _branchOffices:BranchOfficeService,
    public _alert:AlertService,
    public router:Router
  ) {
    this.activatedRoute.params.subscribe((params)=>{
      this.id=params["id"];
     if(this.id=="nuevo"){
       this.title="Nuevo dia de servicio";
       this.serviceDay={};
       this.isNew=true;
     }else {
       this.title="Modificar dia de servicio";
       this.isNew=false;
       this.loadData();
     }
    })
   }

  ngOnInit() {
    this._branchOffices.loadBranchOffices().subscribe((resp:any)=>{
      if(resp.ok){
        this.branchOffices=resp.data;
      }
    })
  }

  loadData(){
    this._serviceDays.getServiceDay(this.id).subscribe((resp:any)=>{    
      if(resp.ok){
        this.serviceDay=resp.data;       
      }
    });
  }

  save(f:NgForm){
    if(!f.valid){
      this._alert.showAlert("Error","Faltan campos por completar","error");
      return;
    }  

    if(this.isNew){
      this._serviceDays.createServiceDay(this.serviceDay).subscribe((resp:any)=>{
        //console.log(resp);
        if(resp.ok){
          this._alert.showAlert("Todo bien","Se ha agregado al dia de servicio " + this.serviceDay.day_desc.toUpperCase() + " con éxito","success" );
          this.serviceDay=resp.data;
          this.isNew=false;
          this.router.navigate(['/catalogs','serviceDay',this.serviceDay._id]);
        }
      })
    }else {
      this._serviceDays.modifyServiceDay(this.serviceDay).subscribe((resp:any)=>{
        //console.log(resp);
        if(resp.ok){
          this._alert.showAlert("Todo bien","Se ha actualizado al dia de servicio " + this.serviceDay.day_desc.toUpperCase() + " con éxito","success" );
        }
      })
    }
    
  }

  askForDelete(){
    this._alert.showChooseWindow(
      "Borrar",
      "Estas seguro que deseas borrar al dia de servicio " + this.serviceDay.day_desc.toUpperCase() + " Si lo haces ya no podra ser asignado a nuevas citas"      
    ).then((userResp)=>{
      if(userResp.value){
        this._serviceDays.deleteServiceDay(this.serviceDay).subscribe((resp:any)=>{
          if(resp.ok){
            this._alert.showAlert("Todo bien","Se ha borrado al dia de servicio " + this.serviceDay.day_desc.toUpperCase() + " con éxito","success" );
            this.router.navigate(['/catalogs','serviceDay']);
          }
        })
      }
    })
  }

}
