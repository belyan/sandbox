import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumber'
})
export class CardNumberPipe implements PipeTransform {
  transform(value: string): string {
    const groups = value.split(' ');

    groups[1] = '****';
    groups[2] = '****';

    return groups.join(' ');
  }
}
