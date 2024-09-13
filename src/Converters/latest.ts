import LatestInfos from '../../converts/latest.json' assert { type: 'json' };

export const latest = (code: string): string | undefined => LatestInfos[code];
