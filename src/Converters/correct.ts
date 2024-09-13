import Corrects from '../../converts/correct.json' assert { type: 'json' };

export const correct = (code: string): string | undefined => Corrects[code];
