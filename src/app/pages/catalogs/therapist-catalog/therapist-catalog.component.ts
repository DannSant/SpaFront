import { Component, OnInit } from '@angular/core';
import { TherapistService } from '../../../services/therapist.service';
import { Therapist } from '../../../models/therapist.model';

@Component({
  selector: 'app-therapist-catalog',
  templateUrl: './therapist-catalog.component.html',
  styles: []
})
export class TherapistCatalogComponent implements OnInit {
  therapists:Therapist[]=[];
  constructor(
    public _therapists:TherapistService
  ) { }

  ngOnInit() {
    this._therapists.loadAllTherapists().subscribe((resp:any)=>{    
      if(resp.ok){
        this.therapists=resp.data;
      }
    })
  }

}
