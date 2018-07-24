import { Component, OnInit } from '@angular/core';
import { BranchOffice } from '../../../models/branch-office.model';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { BranchOfficeService } from '../../../services/branch-office.service';
import { AlertService } from '../../../services/alert.service';
import { NgForm } from '../../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-branch-office-detail',
  templateUrl: './branch-office-detail.component.html',
  styles: []
})
export class BranchOfficeDetailComponent implements OnInit {

  
  id:string;
  title:string;
  branchOffice:BranchOffice={};
  isNew:boolean=true;

 
  constructor(
    public activatedRoute:ActivatedRoute,
    public _branchOffices:BranchOfficeService,
    public _alert:AlertService,
    public router:Router
  ) {
    this.activatedRoute.params.subscribe((params)=>{
      this.id=params["id"];
     if(this.id=="nuevo"){
       this.title="Nueva Sucursal";
       this.branchOffice={};
       this.isNew=true;
     }else {
       this.title="Modificar Sucursal";
       this.isNew=false;
       this.loadData();
     }
    })
   }

  ngOnInit() {}

  loadData(){
    this._branchOffices.getBranchOffice(this.id).subscribe((resp:any)=>{    
      if(resp.ok){
        this.branchOffice=resp.data;           
      }
    });
  }

  save(f:NgForm){
    if(!f.valid){
      this._alert.showAlert("Error","Faltan campos por completar","error");
      return;
    }

    if(!f.value.allowedGenres){
      this._alert.showAlert("Error","Faltan campos por completar","error");
      return;
    }

    if(isNaN(this.branchOffice.lat) || isNaN(this.branchOffice.lng)){
      this._alert.showAlert("Error","Latitud y longitud debe ser numerico","error");
      return;
    }

    if(this.isNew){
      this._branchOffices.createBranchOffice(this.branchOffice).subscribe((resp:any)=>{
        //console.log(resp);
        if(resp.ok){
          this._alert.showAlert("Todo bien","Se ha agregado la sucursal " + this.branchOffice.name.toUpperCase() + " con éxito","success" );
          this.branchOffice=resp.data;
          this.isNew=false;
          this.router.navigate(['/catalogs','branchOffice',this.branchOffice._id]);
        }
      })
    }else {
      this._branchOffices.modifyBranchOffice(this.branchOffice).subscribe((resp:any)=>{
        //console.log(resp);
        if(resp.ok){
          this._alert.showAlert("Todo bien","Se ha actualizado la sucursal " + this.branchOffice.name.toUpperCase() + " con éxito","success" );
        }
      })
    }
    
  }

  askForDelete(){
    this._alert.showChooseWindow(
      "Borrar",
      "Estas seguro que deseas borrar la sucursal " +this.branchOffice.name.toUpperCase() + " Si lo haces ya no podra ser asignado a nuevas citas"      
    ).then((userResp)=>{
      if(userResp.value){
        this._branchOffices.deleteTherapist(this.branchOffice).subscribe((resp:any)=>{
          if(resp.ok){
            this._alert.showAlert("Todo bien","Se ha borrado la sucursal " + this.branchOffice.name.toUpperCase() + " con éxito","success" );
            this.router.navigate(['/catalogs','branchOffice']);
          }
        })
      }
    })
  }

}
