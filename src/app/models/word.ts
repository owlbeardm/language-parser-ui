export interface Word {
    id: number;
    forgotten: boolean;
    word: String;
    partOfSpeech: String;
}

export interface Translation {
    fromWordId: number,
    toLangId: number,
    toWordId?: number,
    comment?: String,
    altTranslation?: String
}

export interface Language {
    name: String
}

// export interface WordDescriptionAPI {
//     (Word, [Language], [WordTranslation], [WordSource])
// }

export type WordAndLang = [
    word: Word,
    lang: Language
]

export type WordSource = [
    wordNadLang: WordAndLang, 
    translations: WordTranslation[]
]

export type WordTranslation = [
    translaction: Translation,
    lang: Language,
    word?: Word
]

export type WordDescriptionAPI = [
    word: Word,
    lang: Language[],
    translations: WordTranslation[],
    source: WordSource[]
];
