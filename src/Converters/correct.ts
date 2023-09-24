import Corrects from '../../converts/correct.json';

export const correct = (code: string): string | undefined => Corrects[code];
