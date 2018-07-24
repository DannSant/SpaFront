import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { NgForm } from '../../../../../node_modules/@angular/forms';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: []
})
export class UserDetailComponent implements OnInit {
  id:string;
  title:string;
  user:User={};
  isNew:boolean=true;

 
  constructor(
    public activatedRoute:ActivatedRoute,
    public _userService:UserService,
    public _alert:AlertService,
    public router:Router
  ) {
    this.activatedRoute.params.subscribe((params)=>{
      this.id=params["id"];
     if(this.id=="nuevo"){
       this.title="Nuevo Usuario";
       this.user={};
       this.isNew=true;
     }else {
       this.title="Modificar Usuario";
       this.isNew=false;
       this.loadData();
     }
    })
   }

  ngOnInit() {}

  loadData(){
    this._userService.getUser(this.id).subscribe((resp:any)=>{    
      if(resp.ok){
        this.user=resp.data;
        this.user.password="";
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

    if(isNaN(this.user.cellphone)){
      this._alert.showAlert("Error","El celular debe ser numerico","error");
      return;
    }

    if(String(this.user.cellphone).length!=10){
      this._alert.showAlert("Error","El celular debe ser de 10 digitos","error");
      return;
    }

    if(this.isNew && this.user.password.length<=0){
      this._alert.showAlert("Error","El password es obligatorio","error");
      return;
    }    

    if(this.isNew){
      this._userService.crearUsuario(this.user).subscribe((resp:any)=>{
        //console.log(resp);
        if(resp.ok){
          this._alert.showAlert("Todo bien","Se ha agregado al usuario " + this.user.email.toUpperCase() + " con éxito","success" );
          this.user=resp.data;
          this.user.password="";
          this.isNew=false;
          this.router.navigate(['/catalogs','user',this.user._id]);
        }
      })
    }else {
      this._userService.modifyUser(this.user).subscribe((resp:any)=>{
        //console.log(resp);
        if(resp.ok){
          this._alert.showAlert("Todo bien","Se ha actualizado al usuario " + this.user.email.toUpperCase() + " con éxito","success" );
        }
      })
    }
    
  }

  askForDelete(){
    this._alert.showChooseWindow(
      "Borrar",
      "Estas seguro que deseas borrar al usuario con el email " + this.user.email.toUpperCase() + " Si lo haces ya no podra ingresar a la pagina"      
    ).then((userResp)=>{
      if(userResp.value){
        this._userService.deleteUser(this.user).subscribe((resp:any)=>{
          if(resp.ok){
            this._alert.showAlert("Todo bien","Se ha borrado al usuario " + this.user.email.toUpperCase() + " con éxito","success" );
            this.router.navigate(['/catalogs','user']);
          }
        })
      }
    })
  }

}
