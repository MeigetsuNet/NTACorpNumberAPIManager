import { CorpInformation } from './CorpInformation.js';

export type CorpInfoResponse = {
    last_update_date: string;
    divide_number: string;
    divide_size: string;
    corporations?: Partial<CorpInformation>[];
}
