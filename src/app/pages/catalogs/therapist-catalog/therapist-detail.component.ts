import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { TherapistService } from '../../../services/therapist.service';
import { AlertService } from '../../../services/alert.service';
import { Therapist } from '../../../models/therapist.model';
import { NgForm } from '../../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-therapist-detail',
  templateUrl: './therapist-detail.component.html',
  styles: []
})
export class TherapistDetailComponent implements OnInit {

  id:string;
  title:string;
  therapist:Therapist={};
  isNew:boolean=true;

 
  constructor(
    public activatedRoute:ActivatedRoute,
    public _therapists:TherapistService,
    public _alert:AlertService,
    public router:Router
  ) {
    this.activatedRoute.params.subscribe((params)=>{
      this.id=params["id"];
     if(this.id=="nuevo"){
       this.title="Nuevo Masajista";
       this.therapist={};
       this.isNew=true;
     }else {
       this.title="Modificar Masajista";
       this.isNew=false;
       this.loadData();
     }
    })
   }

  ngOnInit() {}

  loadData(){
    this._therapists.getTherapist(this.id).subscribe((resp:any)=>{    
      if(resp.ok){
        this.therapist=resp.data;       
      }
    });
  }

  save(f:NgForm){
    if(!f.valid){
      this._alert.showAlert("Error","Faltan campos por completar","error");
      return;
    }

    if(!f.value.sex){
      this._alert.showAlert("Error","Faltan campos por completar","error");
      return;
    }

    if(isNaN(this.therapist.cellphone)){
      this._alert.showAlert("Error","El celular debe ser numerico","error");
      return;
    }

    if(String(this.therapist.cellphone).length!=10){
      this._alert.showAlert("Error","El celular debe ser de 10 digitos","error");
      return;
    }  

    if(this.isNew){
      this._therapists.createTherapist(this.therapist).subscribe((resp:any)=>{
        //console.log(resp);
        if(resp.ok){
          this._alert.showAlert("Todo bien","Se ha agregado al masajista " + this.therapist.name.toUpperCase() + " con éxito","success" );
          this.therapist=resp.data;
          this.isNew=false;
          this.router.navigate(['/catalogs','therapist',this.therapist._id]);
        }
      })
    }else {
      this._therapists.modifyTherapist(this.therapist).subscribe((resp:any)=>{
        //console.log(resp);
        if(resp.ok){
          this._alert.showAlert("Todo bien","Se ha actualizado al masajista " + this.therapist.name.toUpperCase() + " con éxito","success" );
        }
      })
    }
    
  }

  askForDelete(){
    this._alert.showChooseWindow(
      "Borrar",
      "Estas seguro que deseas borrar al masajista " + this.therapist.name.toUpperCase() + " Si lo haces ya no podra ser asignado a nuevas citas"      
    ).then((userResp)=>{
      if(userResp.value){
        this._therapists.deleteTherapist(this.therapist).subscribe((resp:any)=>{
          if(resp.ok){
            this._alert.showAlert("Todo bien","Se ha borrado al masajista " + this.therapist.name.toUpperCase() + " con éxito","success" );
            this.router.navigate(['/catalogs','therapist']);
          }
        })
      }
    })
  }

}
