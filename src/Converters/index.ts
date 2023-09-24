import { closeCause } from './closeCause';
import { correct } from './correct';
import { hide } from './hide';
import { kind } from './kind';
import { latest } from './latest';
import { process as converProcess } from './process';

export const convert = {
    close_cause: (code: string): string => {
        const result = closeCause(code);
        return result == null ? code : result;
    },
    correct: (code: string): string => {
        const result = correct(code);
        return result == null ? code : result;
    },
    hide: (code: string): string => {
        const result = hide(code);
        return result == null ? code : result;
    },
    kind: (code: string): string => {
        const result = kind(code);
        return result == null ? code : result;
    },
    latest: (code: string): string => {
        const result = latest(code);
        return result == null ? code : result;
    },
    process: (code: string): string => {
        const result = converProcess(code);
        return result == null ? code : result;
    },
};
