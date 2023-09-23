import LatestInfos from '../../converts/latest.json';

export const latest = (code: string): string => LatestInfos[code];
