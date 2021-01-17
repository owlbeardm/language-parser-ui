import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';

export function hasKeycode(event: KeyboardEvent, codes: number[]): boolean {
    return codes.some(value => (event.keyCode || event.which) === value);
}

export const KEYS = { A: 65, ALT: 18, APOSTROPHE: 192, AT_SIGN: 64, B: 66, BACKSLASH: 220, BACKSPACE: 8, C: 67, CAPS_LOCK: 20, CLOSE_SQUARE_BRACKET: 221, COMMA: 188, CONTEXT_MENU: 93, CONTROL: 17, D: 68, DASH: 189, DELETE: 46, DOWN_ARROW: 40, E: 69, EIGHT: 56, END: 35, ENTER: 13, EQUALS: 187, ESCAPE: 27, F: 70, F1: 112, F10: 121, F11: 122, F12: 123, F2: 113, F3: 114, F4: 115, F5: 116, F6: 117, F7: 118, F8: 119, F9: 120, FF_EQUALS: 61, FF_MINUS: 173, FF_MUTE: 181, FF_SEMICOLON: 59, FF_VOLUME_DOWN: 182, FF_VOLUME_UP: 183, FIRST_MEDIA: 166, FIVE: 53, FOUR: 52, G: 71, H: 72, HOME: 36, I: 73, INSERT: 45, J: 74, K: 75, L: 76, LAST_MEDIA: 183, LEFT_ARROW: 37, M: 77, MAC_ENTER: 3, MAC_META: 224, MAC_WK_CMD_LEFT: 91, MAC_WK_CMD_RIGHT: 93, META: 91, MUTE: 173, N: 78, NINE: 57, NUM_CENTER: 12, NUM_LOCK: 144, NUMPAD_DIVIDE: 111, NUMPAD_EIGHT: 104, NUMPAD_FIVE: 101, NUMPAD_FOUR: 100, NUMPAD_MINUS: 109, NUMPAD_MULTIPLY: 106, NUMPAD_NINE: 105, NUMPAD_ONE: 97, NUMPAD_PERIOD: 110, NUMPAD_PLUS: 107, NUMPAD_SEVEN: 103, NUMPAD_SIX: 102, NUMPAD_THREE: 99, NUMPAD_TWO: 98, NUMPAD_ZERO: 96, O: 79, ONE: 49, OPEN_SQUARE_BRACKET: 219, P: 80, PAGE_DOWN: 34, PAGE_UP: 33, PAUSE: 19, PLUS_SIGN: 43, PRINT_SCREEN: 44, Q: 81, QUESTION_MARK: 63, R: 82, RIGHT_ARROW: 39, S: 83, SCROLL_LOCK: 145, SEMICOLON: 186, SEVEN: 55, SHIFT: 16, SINGLE_QUOTE: 222, SIX: 54, SLASH: 191, SPACE: 32, T: 84, TAB: 9, THREE: 51, TILDE: 192, TWO: 50, U: 85, UP_ARROW: 38, V: 86, VOLUME_DOWN: 174, VOLUME_UP: 175, W: 87, X: 88, Y: 89, Z: 90, ZERO: 48 };
export type KeyNames = keyof typeof KEYS;

export type ModifierKey = 'altKey' | 'shiftKey' | 'ctrlKey' | 'metaKey';
export const MODIFIERS = ['altKey', 'shiftKey', 'ctrlKey', 'metaKey'];
/**
 * Checks whether a modifier key is pressed.
 * @param event Event to be checked.
 */
export function hasModifierKey(
    event: KeyboardEvent,
    ...modifiers: ModifierKey[]
): boolean {
    if (modifiers.length) {
        return modifiers.some(modifier => event[modifier]);
    }
    return event.altKey || event.shiftKey || event.ctrlKey || event.metaKey;
}

export class MatchConfig {
    public listenOn: FromEventTarget<KeyboardEvent> = window;
    constructor(init: Partial<MatchConfig>) {
        Object.assign(this, init);
    }
}