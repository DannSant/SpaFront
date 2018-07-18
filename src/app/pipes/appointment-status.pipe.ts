import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appointmentStatus'
})
export class AppointmentStatusPipe implements PipeTransform {

  statusMap = {
    PENDING:"Pendiente", 
    CONFIRMED:"Confirmada", 
    UNREACHED:"No se localiza al cliente", 
    CANCELLED:"Cancelada", 
    ATTENDED:"Atendida"
  };

  transform(value: any): string {   
    return this.statusMap[value];
  }

}
