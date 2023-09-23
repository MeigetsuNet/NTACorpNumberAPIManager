import { CorpSearchMode } from '../CorpSearch/Mode';
import { CorpSearchTarget } from '../CorpSearch/Target';
import { CorpSearchType } from '../CorpSearch/Type';

export interface CorpInfoRequestParamsFromName {
    name: string;
    match_type?: CorpSearchMode;
    target?: CorpSearchTarget;
    address_code?: string;
    corp_type?: CorpSearchType;
    contain_change?: boolean;
    contain_close?: boolean;
    corp_number_reserve?: {
        from?: Date;
        to?: Date;
    };
    divide?: number;
}
