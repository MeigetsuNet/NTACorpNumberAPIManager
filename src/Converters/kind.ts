import Kinds from '../../converts/kind.json';

export const kind = (code: string): string => Kinds[code];
