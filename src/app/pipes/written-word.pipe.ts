import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'writtenWord'
})
export class WrittenWordPipe implements PipeTransform {

  transform(value: string | undefined, ...args: unknown[]): string | undefined {
    if(!value) return value;
    return value
      .replace(/ɡ/g,'g')
      .replace(/Ɡ/g,'G');
  }

}
