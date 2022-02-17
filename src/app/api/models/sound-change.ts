/* tslint:disable */
/* eslint-disable */
export interface SoundChange {
  environmentAfter?: string;
  environmentBefore?: string;
  id?: number;
  priority?: number;
  soundFrom?: string;
  soundTo?: string;
  type?: 'REPLACE_ALL' | 'REPLACE_FIRST' | 'REPLACE_LAST';
}
