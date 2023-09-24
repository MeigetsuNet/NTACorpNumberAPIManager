import CloseCauses from '../../converts/closeCause.json';

export const closeCause = (code: string): string | undefined => CloseCauses[code];
