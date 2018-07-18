import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { Service } from '../../models/service.model';
import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { Router } from '../../../../node_modules/@angular/router';

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
    public _alert:AlertService,
    public _userService:UserService,
    public router:Router
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

  agendarCita(service){
    if(this._userService.isAuthenticated()){
      this.router.navigate(['/appointment',service._id]);
    }else {
      this._alert.showAlert("Atencion","Debes iniciar sesion antes de agendar una cita","warning");
      this.router.navigate(['/login']);
    }
  }

}
