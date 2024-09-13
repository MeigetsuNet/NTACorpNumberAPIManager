import { closeCause } from './closeCause.js';
import { correct } from './correct.js';
import { hide } from './hide.js';
import { kind } from './kind.js';
import { latest } from './latest.js';
import { process as converProcess } from './process.js';

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
