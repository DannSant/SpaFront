import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(
    public _alert:AlertService,
    public _userService:UserService,
    public router:Router
  ) { }

  ngOnInit() {
  }

  registerUser(f:NgForm){
    if(!f.valid){
      this._alert.showAlert("Error","Faltan campos por completar","error");
      return;
    }

    if(!f.value.sex){
      this._alert.showAlert("Error","Faltan campos por completar","error");
      return;
    }

    if(f.value.password1 != f.value.password2){
      this._alert.showAlert("Error","Las contraseñas no coinciden","error");
      return;
    }

   //llamar servicio
   let user = new User();
   let datos = f.value;
   user.name = datos.name;
   user.email=datos.email;
   user.cellphone = datos.cellphone;
   user.sex = datos.sex;
   user.password=datos.password1;
   this._userService.crearUsuario(user).subscribe((resp:any)=>{
    if(resp.ok){
      this._alert.showAlertWithCallback("Todo correcto","Te has registrado correctamente, ya puedes iniciar sesion","success",()=>{
        this.router.navigate(['/login']);
      });
    }else {
      this._alert.showAlert("Error","Ocurrio un error al registrarse","error");
      console.error(resp.error)
    }
   })
  }

}
