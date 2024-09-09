import {Pipe, PipeTransform} from '@angular/core';
import {TranslationType} from '../api/models/translation-type';

@Pipe({
    standalone: true,
    name: 'translationType'
})
export class TranslationTypePipe implements PipeTransform {

  transform(value: TranslationType, ...args: unknown[]): string {
    switch (value){
      case TranslationType.General: return 'gen.';
      default: return value;
    }
  }

}
