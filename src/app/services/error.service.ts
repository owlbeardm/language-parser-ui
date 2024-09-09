import { Injectable } from '@angular/core';
import { Error } from '../models/error';
import { BehaviorSubject } from 'rxjs';
import { KeyBindService } from './key-bind.service';
import { KEYS } from '../models/keys';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  // private errors: Error[] = [];
  private _errors = new BehaviorSubject<Error[]>([]);
  private dataStore: { errors: Error[] } = { errors: [] };
  readonly errors = this._errors.asObservable();

  constructor(private keybind: KeyBindService) {
    const binding$ = this.keybind.match(["ESCAPE"], []).subscribe(() => {
      this.clearErrors();
    });
  }

  addError(error: Error) {
    this.dataStore.errors.push(error);
    this._errors.next(Object.assign({}, this.dataStore).errors);
  }

  clearErrors() {
    if (!this.dataStore.errors.length) return;
    this.dataStore.errors = [];
    this._errors.next(Object.assign({}, this.dataStore).errors);
  }
}
