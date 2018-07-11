import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { Service } from '../../models/service.model';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styles: []
})
export class ServicesComponent implements OnInit {
  services:Service[]=[];
  totalServices:number;
  pageFrom:number=0;

  constructor(
    public _services:ServicesService,
    public _alert:AlertService
  ) { }

  ngOnInit() {
    this.cargarServicios();
  }

  cargarServicios(){
    this._services.listarServicios(this.pageFrom).subscribe((resp:any)=>{
     
      if(resp.ok){
        this.totalServices=resp.records;
        this.services=resp.data;
      }
    })
  }

}
