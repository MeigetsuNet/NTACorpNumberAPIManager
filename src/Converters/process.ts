import Processes from '../../converts/process.json';

export const process = (code: string): string => Processes[code];
