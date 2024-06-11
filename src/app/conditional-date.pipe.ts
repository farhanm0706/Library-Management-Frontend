import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conditionalDate'
})
export class ConditionalDatePipe implements PipeTransform {

  transform(value: any, format:string='dd-MM-yyyy'): any {
    const date =new Date(value);
    if(isNaN(date.getTime())){
      return value;
    }
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

}
