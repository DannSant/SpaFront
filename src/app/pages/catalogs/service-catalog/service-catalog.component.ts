import { Component, OnInit } from '@angular/core';
import { Service } from '../../../models/service.model';
import { ServicesService } from '../../../services/services.service';

@Component({
  selector: 'app-service-catalog',
  templateUrl: './service-catalog.component.html',
  styles: []
})
export class ServiceCatalogComponent implements OnInit {
  services:Service[]=[];
  constructor(
    public _services:ServicesService
  ) { }

  ngOnInit() {
    this._services.listarServicios(0).subscribe((resp:any)=>{    
      if(resp.ok){
        this.services=resp.data;
      }
    })
  }

}
