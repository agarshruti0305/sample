import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: number): string {
    switch(value) {
      case 0: return 'New';
      case 1: return 'Completed'
    }
  }

}
