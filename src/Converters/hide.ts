import Hides from '../../converts/hide.json';

export const hide = (code: string): string | undefined => Hides[code];
