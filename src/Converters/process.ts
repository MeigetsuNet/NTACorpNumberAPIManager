import Processes from '../../converts/process.json' assert { type: 'json' };;

export const process = (code: string): string | undefined => Processes[code];
