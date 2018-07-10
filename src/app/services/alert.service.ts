import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
@Injectable()
export class AlertService {

  constructor() { }

  showAlert(title:string,msg:string,type:any){
    Swal(title,msg,type)
  }

  showWaitWindow(title="Procesando",text="Espere por favor, estamos procesando la solicitud... <br> <i class='fas fa-spinner fa-spin'></i></h3>"){
    Swal(
      {
        title:title,
        html: text,
        type:'info',
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick:false,
        allowEscapeKey:false
      });
  }

  showAlertWithCallback(title:string,msg:string,type:any,callback){
    Swal(
      {
        title:title,
        text: msg,
        type:type,
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: true,
        allowOutsideClick:false,
        allowEscapeKey:false
      }).then(()=>{
        callback();
      });
  }

  showChooseWindow(
    title='Estas seguro?',
    text='No sera posible recuperar este elemento',
    type:any='warning',
    confirm="Si",
    reject='No'
  ){
    return Swal({
        title: title,
        text: text,
        type: type,
        showCancelButton: true,
        confirmButtonText: confirm,
        cancelButtonText: reject
      });
  }

  closeWaitWindow(){
      Swal.close();
  }

}
