import {Injectable} from '@angular/core';
import {hasKeycode, hasModifierKey, KeyNames, KEYS, MatchConfig, ModifierKey} from '../models/keys';
import {fromEvent, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyBindService {

  constructor() {
  }

  public match(
    matchKey: KeyNames[],
    matchModifiers: ModifierKey[] = [],
    options?: MatchConfig
  ): Observable<KeyboardEvent> {
    const mc = !options ? new MatchConfig({}) : new MatchConfig(options);
    // const {listenOn} = mc;
    return new Observable((observer) => {
      // const listener$ = fromEvent(listenOn, 'keydown');
      // listener$.subscribe((event: KeyboardEvent) => {
      //   if (
      //     hasKeycode(event, matchKey.map((k) => KEYS[k])) &&
      //     (!matchModifiers.length || hasModifierKey(event, ...matchModifiers))
      //   ) {
      //     observer.next(event);
      //   }
      // });
    });
  }


}
