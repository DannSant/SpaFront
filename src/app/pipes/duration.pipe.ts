import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number): string {

    let hours = Math.floor(value/60);
    let minutes = value%60;
    let formatedValue = "";
    if(hours>0){
      if(hours==1){
        formatedValue += hours + " hora"
      }else {
        formatedValue += hours + " horas"
      }
    }
    formatedValue+=" ";
    if(minutes>0){
      if(minutes==1){
        formatedValue += minutes + " minuto"
      }else {
        formatedValue += minutes + " minutos"
      }
    }



    return formatedValue;
  }

}
