import { CorpInformation } from './CorpInformation';

export type CorpInfoResponse = {
    last_update_date: string;
    divide_number: string;
    divide_size: string;
    corporations?: Partial<CorpInformation>[];
}
