import Processes from '../../converts/process.json';

export const process = (code: string): string | undefined => Processes[code];
