import { CorpSearchType } from '../CorpSearch/Type';

export type CorpInfoRequestParamsFromDiff = {
    from: Date;
    to: Date;
    address_code?: string;
    corp_type?: CorpSearchType;
    divide?: number;
};
