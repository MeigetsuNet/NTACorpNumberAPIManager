import { CorpSearchMode } from '../CorpSearch/Mode.js';
import { CorpSearchTarget } from '../CorpSearch/Target.js';
import { CorpSearchType } from '../CorpSearch/Type.js';

export type CorpInfoRequestParamsFromName = {
    name: string;
    match_type?: CorpSearchMode;
    target?: CorpSearchTarget;
    address_code?: string;
    corp_type?: CorpSearchType;
    contain_change?: boolean;
    contain_close?: boolean;
    corp_number_reserve?: {
        from: Date;
        to: Date;
    };
    divide?: number;
}
