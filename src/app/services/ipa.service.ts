import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IpaService {

  sounds: string[] = [];

  constructor() {
  }

  addPhonetic(phonetic: string): void {
    if (!this.sounds.includes(phonetic)) {
      this.sounds.push(phonetic);
    }
  }
}
