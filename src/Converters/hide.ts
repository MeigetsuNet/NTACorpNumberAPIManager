import Hides from '../../converts/hide.json' assert { type: 'json' };

export const hide = (code: string): string | undefined => Hides[code];
