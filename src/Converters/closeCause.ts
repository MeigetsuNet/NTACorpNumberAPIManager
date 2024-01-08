import CloseCauses from '../../converts/closeCause.json' assert { type: 'json' };

export const closeCause = (code: string): string | undefined => CloseCauses[code];
