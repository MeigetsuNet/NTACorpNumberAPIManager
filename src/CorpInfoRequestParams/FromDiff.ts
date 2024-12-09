import { CorpSearchType } from '../CorpSearch/Type.js';

export type CorpInfoRequestParamsFromDiff = {
    from: Date;
    to: Date;
    address_code?: string;
    corp_type?: CorpSearchType;
    divide?: number;
}
