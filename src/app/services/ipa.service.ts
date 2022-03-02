import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IpaService {

  sounds: string[] = [];
  private consonantVariants: string[] = ['ʰ', 'ʷ', 'ʲ', 'ʷʰ', 'ː'];

  constructor() {
  }

  addPhonetic(phonetic: string): void {
    if (!this.sounds.includes(phonetic)) {
      this.sounds.push(phonetic);
    }
  }

  getConsonantVariants(): string[] {
    return this.consonantVariants;
  }
}
