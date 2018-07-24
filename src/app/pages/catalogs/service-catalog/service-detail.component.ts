import { Component, OnInit } from '@angular/core';
import { Service } from '../../../models/service.model';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { ServicesService } from '../../../services/services.service';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styles: []
})
export class ServiceDetailComponent implements OnInit {


  id:string;
  title:string;
  service:Service={};
  isNew:boolean=true;

 
  constructor(
    public activatedRoute:ActivatedRoute,
    public _services:ServicesService,
    public _alert:AlertService,
    public router:Router
  ) {
    this.activatedRoute.params.subscribe((params)=>{
      this.id=params["id"];
     if(this.id=="nuevo"){
       this.title="Nuevo Servicio";
       this.service={};
       this.isNew=true;
     }else {
       this.title="Modificar Servicio";
       this.isNew=false;
       this.loadData();
     }
    })
   }

  ngOnInit() {}

  loadData(){
    this._services.getService(this.id).subscribe((resp:any)=>{    
      if(resp.ok){
        this.service=resp.data;       
      }
    });
  }

  save(f:NgForm){
    if(!f.valid){
      this._alert.showAlert("Error","Faltan campos por completar","error");
      return;
    }

    if(isNaN(this.service.price) || isNaN(this.service.duration)){
      this._alert.showAlert("Error","Duracion y precio deben ser numericos","error");
      return;
    }
  
    if(this.isNew){
      this._services.createService(this.service).subscribe((resp:any)=>{
        //console.log(resp);
        if(resp.ok){
          this._alert.showAlert("Todo bien","Se ha agregado el servicio " + this.service.name.toUpperCase() + " con éxito","success" );
          this.service=resp.data;
          this.isNew=false;
          this.router.navigate(['/catalogs','service',this.service._id]);
        }
      })
    }else {
      this._services.modifyService(this.service).subscribe((resp:any)=>{
        //console.log(resp);
        if(resp.ok){
          this._alert.showAlert("Todo bien","Se ha actualizado el servicio " + this.service.name.toUpperCase() + " con éxito","success" );
        }
      })
    }
    
  }

  askForDelete(){
    this._alert.showChooseWindow(
      "Borrar",
      "Estas seguro que deseas borrar servicio " + this.service.name.toUpperCase() + " Si lo haces ya no se podran agendar mas citas con este servicio"      
    ).then((userResp)=>{
      if(userResp.value){
        this._services.deleteService(this.service).subscribe((resp:any)=>{
          if(resp.ok){
            this._alert.showAlert("Todo bien","Se ha borrado al servicio " + this.service.name.toUpperCase() + " con éxito","success" );
            this.router.navigate(['/catalogs','service']);
          }
        })
      }
    })
  }
}
