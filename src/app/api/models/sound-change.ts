/* tslint:disable */
/* eslint-disable */
import { SoundChangePurpose } from './sound-change-purpose';
import { SoundChangeType } from './sound-change-type';
export interface SoundChange {
  environmentAfter?: string;
  environmentBefore?: string;
  id?: number;
  priority?: number;
  soundChangePurpose?: SoundChangePurpose;
  soundFrom?: string;
  soundTo?: string;
  type?: SoundChangeType;
}
