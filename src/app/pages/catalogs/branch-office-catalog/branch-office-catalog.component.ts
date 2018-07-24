import { Component, OnInit } from '@angular/core';
import { BranchOffice } from '../../../models/branch-office.model';
import { BranchOfficeService } from '../../../services/branch-office.service';

@Component({
  selector: 'app-branch-office-catalog',
  templateUrl: './branch-office-catalog.component.html',
  styles: []
})
export class BranchOfficeCatalogComponent implements OnInit {

  branchOffices:BranchOffice[]=[];
  constructor(
    public _branchOffices:BranchOfficeService
  ) { }

  ngOnInit() {
    this._branchOffices.loadBranchOffices().subscribe((resp:any)=>{ 
     
      if(resp.ok){
        this.branchOffices=resp.data;
      }
    })
  }
}
