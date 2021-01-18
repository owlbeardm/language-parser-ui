/* tslint:disable */
type PartOfSpeech =
  'Adjective' |
  'Adverb' |
  'Conjunction' |
  'Determiner' |
  'Noun' |
  'Numeral' |
  'Prefix' |
  'Preposition' |
  'Pronoun' |
  'Suffix' |
  'Verb';
module PartOfSpeech {
  export const ADJECTIVE: PartOfSpeech = 'Adjective';
  export const ADVERB: PartOfSpeech = 'Adverb';
  export const CONJUNCTION: PartOfSpeech = 'Conjunction';
  export const DETERMINER: PartOfSpeech = 'Determiner';
  export const NOUN: PartOfSpeech = 'Noun';
  export const NUMERAL: PartOfSpeech = 'Numeral';
  export const PREFIX: PartOfSpeech = 'Prefix';
  export const PREPOSITION: PartOfSpeech = 'Preposition';
  export const PRONOUN: PartOfSpeech = 'Pronoun';
  export const SUFFIX: PartOfSpeech = 'Suffix';
  export const VERB: PartOfSpeech = 'Verb';
  export function values(): PartOfSpeech[] {
    return [
      ADJECTIVE,
      ADVERB,
      CONJUNCTION,
      DETERMINER,
      NOUN,
      NUMERAL,
      PREFIX,
      PREPOSITION,
      PRONOUN,
      SUFFIX,
      VERB
    ];
  }
}

export { PartOfSpeech }