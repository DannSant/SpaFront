import { Component, OnInit } from '@angular/core';
import { ServiceDay } from '../../../models/service-day.model';
import { ServiceDayService } from '../../../services/service-day.service';

@Component({
  selector: 'app-service-day-catalog',
  templateUrl: './service-day-catalog.component.html',
  styles: []
})
export class ServiceDayCatalogComponent implements OnInit {

  serviceDays:ServiceDay[]=[];
  constructor(
    public _serviceDays:ServiceDayService
  ) { }

  ngOnInit() {
    this._serviceDays.loadServiceDays().subscribe((resp:any)=>{    
      if(resp.ok){
        this.serviceDays=resp.data;
      }
    })
  }

}
