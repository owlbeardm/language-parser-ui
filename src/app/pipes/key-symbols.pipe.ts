import { Pipe, PipeTransform } from '@angular/core';
import { KeyNames } from '../models/keys';

@Pipe({
    standalone: true,
    name: 'keySymbols'
})
export class KeySymbolsPipe implements PipeTransform {

  transform(value: String | KeyNames, ...args: unknown[]): String {
    switch (value) {
      case 'ZERO':
        return '0';
      case 'ONE':
        return '1';
      case 'TWO':
        return '2';
      case 'THREE':
        return '3';
      case 'FOUR':
        return '4';
      case 'FIVE':
        return '5';
      default:
        return value;
    }
  }

}
