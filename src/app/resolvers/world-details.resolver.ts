import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';
import {DetailedWord} from '../api/models/detailed-word';
import {WordsService} from '../api/services/words.service';
import {ROUTER_PARAM} from '../utils/constants';
import {findParam} from '../utils/router-utils';

@Injectable({
  providedIn: 'root'
})
export class WorldDetailsResolver implements Resolve<DetailedWord[]> {

  constructor(private wordService: WordsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DetailedWord[]> {
    const word: string | null = findParam(ROUTER_PARAM.WORD, route);
    if (!word) {
      return EMPTY;
    }
    return this.wordService.getDetailedWordsByPhonetics({word});
  }
}
