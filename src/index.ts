import { xml2json } from 'xml-js';

interface CorpInformation {
    corp_number: string;
    process: string;
    correct: string;
    update_date: string;
    change_date: string;
    name: string;
    name_image_id: string;
    name_ruby?: string;
    kind: string;
    address: {
        text: {
            prefecture: string;
            city: string;
            street_number: string;
        };
        code: {
            prefecture: string;
            city: string;
        };
        post_code: string;
        image_id: string;
        outside: string;
        outside_image_id: string;
    };
    close?: {
        date: string | null;
        cause: string | null;
    };
    successor_corporate_number: string;
    change_cause: string;
    assignment_date: string;
    latest: string;
    en?: {
        name: string | null;
        prefecture: string | null;
        city: string | null;
        address_outside: string | null;
    };
    ignore: string | null;
}

export enum CorpSearchMode {
    Match_Front = 1,
    Match_Part = 2,
}

export enum CorpSearchTarget {
    JIS1_2 = 1,
    JIS1_4 = 2,
    English = 3,
}

export enum CorpType {
    StateAgency = '01',
    LocalGovernment = '02',
    RegisteredCorpEstablishedInJP = '03',
    Others = '04',
}

export interface CorpInfoResponse {
    last_update_date: string;
    divide_number: string;
    divide_size: string;
    corporations: CorpInformation[];
}

export interface CorpInfoRequestParamsFromNum {
    number: string;
    contain_history?: boolean;
}

export interface CorpInfoRequestParamsFromDiff {
    from: Date;
    to: Date;
    address_code?: string;
    corp_type?: CorpType;
    divide?: number;
}

export interface CorpInfoRequestParamsFromName {
    name: string;
    match_type?: CorpSearchMode;
    target?: CorpSearchTarget;
    address_code?: string;
    corp_type?: CorpType;
    contain_change?: boolean;
    contain_close?: boolean;
    corp_number_reserve?: {
        from?: Date;
        to?: Date;
    };
    divide?: number;
}

export default class CorpNumberManager {
    constructor(private readonly ntaAppId: string) {}
    private ConvertXmlToJson(xmlText: string): CorpInfoResponse {
        const json = JSON.parse(xml2json(xmlText));
        const MainObject = json.elements[0].elements;
        const GetElements = (key: string, Root: any[]) => Root.filter(i => i.name === key);
        const GetElementValue = obj => {
            if (obj.elements == null) return undefined;
            return obj.elements[0].text;
        };
        return {
            last_update_date: GetElementValue(GetElements('lastUpdateDate', MainObject)[0]),
            divide_number: GetElementValue(GetElements('divideNumber', MainObject)[0]),
            divide_size: GetElementValue(GetElements('divideSize', MainObject)[0]),
            corporations: GetElements('corporation', MainObject).map(item => {
                const e = item.elements;
                let Data = {
                    corp_number: GetElementValue(GetElements('corporateNumber', e)[0]),
                    process: GetElementValue(GetElements('process', e)[0]),
                    correct: GetElementValue(GetElements('correct', e)[0]),
                    update_date: GetElementValue(GetElements('updateDate', e)[0]),
                    change_date: GetElementValue(GetElements('changeDate', e)[0]),
                    name: GetElementValue(GetElements('name', e)[0]),
                    name_image_id: GetElementValue(GetElements('nameImageId', e)[0]),
                    name_ruby: GetElementValue(GetElements('furigana', e)[0]),
                    kind: GetElementValue(GetElements('kind', e)[0]),
                    address: {
                        text: {
                            prefecture: GetElementValue(GetElements('prefectureName', e)[0]),
                            city: GetElementValue(GetElements('cityName', e)[0]),
                            street_number: GetElementValue(GetElements('streetNumber', e)[0]),
                        },
                        code: {
                            prefecture: GetElementValue(GetElements('prefectureCode', e)[0]),
                            city: GetElementValue(GetElements('cityCode', e)[0]),
                        },
                        post_code: GetElementValue(GetElements('postCode', e)[0]),
                        image_id: GetElementValue(GetElements('addressImageId', e)[0]),
                        outside: GetElementValue(GetElements('addressOutside', e)[0]),
                        outside_image_id: GetElementValue(GetElements('addressOutsideImageId', e)[0]),
                    },
                    close: {
                        date: GetElementValue(GetElements('closeDate', e)[0]),
                        cause: GetElementValue(GetElements('closeCause', e)[0]),
                    },
                    successor_corporate_number: GetElementValue(GetElements('successorCorporateNumber', e)[0]),
                    change_cause: GetElementValue(GetElements('changeCause', e)[0]),
                    assignment_date: GetElementValue(GetElements('assignmentDate', e)[0]),
                    latest: GetElementValue(GetElements('latest', e)[0]),
                    en: {
                        name: GetElementValue(GetElements('enName', e)[0]),
                        prefecture: GetElementValue(GetElements('enPrefectureName', e)[0]),
                        city: GetElementValue(GetElements('enCityName', e)[0]),
                        address_outside: GetElementValue(GetElements('enAddressOutside', e)[0]),
                    },
                    ignore: GetElementValue(GetElements('hihyoji', e)[0]),
                };
                return JSON.parse(JSON.stringify(Data));
            }),
        };
    }
    private static RemoveNullKeys(parameters) {
        const Keys = Object.keys(parameters).filter(i => {
            if (parameters[i] == null) return false;
            return typeof parameters[i] === 'object' && !Array.isArray(parameters[i])
                ? Object.keys(parameters[i]).length > 0
                : parameters[i].length > 0;
        });
        const Res = {};
        let BeforeKeyCount = 0;
        do {
            BeforeKeyCount = Object.keys(Res).length;
            Keys.forEach(i => {
                if (typeof Res[i] === 'object') {
                    if (Array.isArray(Res[i])) Res[i] = Res[i].map(d => CorpNumberManager.RemoveNullKeys(d));
                    else Res[i] = CorpNumberManager.RemoveNullKeys(Res[i]);
                }
                Res[i] = parameters[i];
            });
        } while (BeforeKeyCount !== Object.keys(Res).length);
        return Res;
    }
    private Request(requestType: string, parameters: string): Promise<CorpInfoResponse> {
        let statusCode = 200;
        return fetch(`https://api.houjin-bangou.nta.go.jp/4/${requestType}?id=${this.ntaAppId}&type=12&${parameters}`)
            .then(response => {
                statusCode = response.status;
                return response.text();
            })
            .then(txt => {
                if (statusCode === 200) return this.ConvertXmlToJson(txt);
                else throw new Error(`${statusCode}.${txt}`);
            });
    }
    getCorpInfoFromNum(parameters: CorpInfoRequestParamsFromNum): Promise<CorpInfoResponse> {
        const parametersText: string = `number=${parameters.number}&history=${Number(
            parameters.contain_history ?? false
        )}`;
        return this.Request('num', parametersText);
    }
    getCorpInfoFromDiff(parameters: CorpInfoRequestParamsFromDiff): Promise<CorpInfoResponse> {
        const formattedParams = {
            from: `${parameters.from.getFullYear()}-${parameters.from.getMonth() + 1}-${parameters.from.getDate()}`,
            to: `${parameters.to.getFullYear()}-${parameters.to.getMonth() + 1}-${parameters.to.getDate()}`,
            address: parameters.address_code,
            kind: parameters.corp_type,
            divide: parameters.divide,
        };
        const params = new URLSearchParams(CorpNumberManager.RemoveNullKeys(formattedParams));
        return this.Request('diff', params.toString());
    }
    getCorpInfoFromName(parameters: CorpInfoRequestParamsFromName): Promise<CorpInfoResponse> {
        const formattedParams = {
            name: parameters.name,
            mode: parameters.match_type,
            target: parameters.target,
            address: parameters.address_code,
            kind: parameters.corp_type,
            change: Number(parameters.contain_change ?? false),
            close: Number(parameters.contain_close ?? true),
            from: parameters.corp_number_reserve == null ? undefined : parameters.corp_number_reserve.from,
            to: parameters.corp_number_reserve == null ? undefined : parameters.corp_number_reserve.to,
            divide: parameters.divide,
        };
        const params = new URLSearchParams(CorpNumberManager.RemoveNullKeys(formattedParams));
        return this.Request('name', params.toString());
    }
}
