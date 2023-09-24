import Kinds from '../../converts/kind.json';

export const kind = (code: string): string | undefined => Kinds[code];
