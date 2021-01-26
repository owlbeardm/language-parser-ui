import { Pipe, PipeTransform } from '@angular/core';
import { PartOfSpeech } from '../api/models';
import { LangService } from '../services/lang.service';

@Pipe({
  name: 'shortPos'
})
export class ShortPosPipe implements PipeTransform {

  constructor(private langService: LangService) {

  }

  transform(value: String | PartOfSpeech, ...args: unknown[]): String {
    return this.langService.shortPOS(value);
  }

  // transform(value: PartOfSpeech, ...args: unknown[]): String {
  //   return this.langService.shortPOS(value.toString());
  // }

}
