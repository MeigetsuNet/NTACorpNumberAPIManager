import Kinds from '../../converts/kind.json' assert { type: 'json' };;

export const kind = (code: string): string | undefined => Kinds[code];
