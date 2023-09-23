import { CorpSearchType } from '../CorpSearch/Type';

export interface CorpInfoRequestParamsFromDiff {
    from: Date;
    to: Date;
    address_code?: string;
    corp_type?: CorpSearchType;
    divide?: number;
}
