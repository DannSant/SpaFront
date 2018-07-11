import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  remember:boolean=false;
  email:string;
  constructor(
    public _alert:AlertService,
    public _userService:UserService,
    public router:Router
  ) { }

  ngOnInit() {
    this.email=this._userService.email;
    if(this.email){
      this.remember=true;
    }
  }

  loginUser(f:NgForm){
    if(!f.valid){
      this._alert.showAlert("Error","Debes escribir email y contraseña","error");
      return;
    }

    let email = f.value.email;
    let password = f.value.password;
    let remember = f.value.remember;

    this._userService.login(email,password,remember).subscribe((resp)=>{
      if(resp.ok){
        this.router.navigate(['/services']);
      }else {
        this._alert.showAlert("Error","Credenciales incorrectas","error");
      }
      
    })
  }

}
