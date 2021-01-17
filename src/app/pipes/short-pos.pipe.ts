import { Pipe, PipeTransform } from '@angular/core';
import { LangService } from '../services/lang.service';

@Pipe({
  name: 'shortPos'
})
export class ShortPosPipe implements PipeTransform {

  constructor(private langService: LangService) {

  }

  transform(value: String, ...args: unknown[]): String {
    return this.langService.shortPOS(value);
  }

}
