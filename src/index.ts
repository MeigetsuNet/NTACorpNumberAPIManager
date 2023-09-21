interface CorpInformation {
    corp_number: string;
    process: string;
    correct: string;
    update_date: string;
    change_date: string;
    name: string;
    name_image_id: string;
    name_ruby: string | null;
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
    close: {
        date: string | null;
        cause: string | null;
    };
    successor_corporate_number: string;
    change_cause: string;
    assignment_date: string;
    latest: string;
    en: {
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
    divide_number: number;
    divide_size_: number;
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
    #AppID: string;
    #Parser: DOMParser;
    constructor(ntaAppId: string) {
        this.#AppID = ntaAppId;
        this.#Parser = new DOMParser();
    }
    private static toInt(val: string | null, defaultVal = 0) {
        return val == null ? defaultVal : parseInt(val);
    }
    private ConvertXmlToJson(xmlText: string): CorpInfoResponse {
        const doc = this.#Parser.parseFromString(xmlText, 'application/xml');
        const Res: CorpInfoResponse = {
            last_update_date: doc.getElementsByTagName('lastUpdateDate ')[0].nodeValue ?? '',
            divide_number: CorpNumberManager.toInt(doc.getElementsByTagName('divideNumber')[0].nodeValue),
            divide_size_: CorpNumberManager.toInt(doc.getElementsByTagName('divideSize')[0].nodeValue),
            corporations: Array.prototype.map.call(
                doc.getElementsByTagName('corporation'),
                (item: Element): CorpInformation => {
                    return {
                        corp_number: item.getElementsByTagName('corporateNumber')[0].nodeValue ?? '',
                        process: item.getElementsByTagName('process')[0].nodeValue ?? '',
                        correct: item.getElementsByTagName('correct')[0].nodeValue ?? '',
                        update_date: item.getElementsByTagName('updateDate')[0].nodeValue ?? '',
                        change_date: item.getElementsByTagName('changeDate')[0].nodeValue ?? '',
                        name: item.getElementsByTagName('name')[0].nodeValue ?? '',
                        name_image_id: item.getElementsByTagName('nameImageId')[0].nodeValue ?? '',
                        name_ruby: item.getElementsByTagName('furigana')[0].nodeValue,
                        kind: item.getElementsByTagName('kind')[0].nodeValue ?? '',
                        address: {
                            text: {
                                prefecture: item.getElementsByTagName('prefectureName')[0].nodeValue ?? '',
                                city: item.getElementsByTagName('cityName')[0].nodeValue ?? '',
                                street_number: item.getElementsByTagName('streetNumber')[0].nodeValue ?? '',
                            },
                            code: {
                                prefecture: item.getElementsByTagName('prefectureCode')[0].nodeValue ?? '',
                                city: item.getElementsByTagName('cityCode')[0].nodeValue ?? '',
                            },
                            post_code: item.getElementsByTagName('postCode')[0].nodeValue ?? '',
                            image_id: item.getElementsByTagName('addressImageId')[0].nodeValue ?? '',
                            outside: item.getElementsByTagName('addressOutside')[0].nodeValue ?? '',
                            outside_image_id: item.getElementsByTagName('addressOutsideImageId')[0].nodeValue ?? '',
                        },
                        close: {
                            date: item.getElementsByTagName('closeDate')[0].nodeValue,
                            cause: item.getElementsByTagName('closeCause')[0].nodeValue,
                        },
                        successor_corporate_number:
                            item.getElementsByTagName('successorCorporateNumber')[0].nodeValue ?? '',
                        change_cause: item.getElementsByTagName('changeCause')[0].nodeValue ?? '',
                        assignment_date: item.getElementsByTagName('assignmentDate')[0].nodeValue ?? '',
                        latest: item.getElementsByTagName('latest')[0].nodeValue ?? '',
                        en: {
                            name: item.getElementsByTagName('enName')[0].nodeValue,
                            prefecture: item.getElementsByTagName('enPrefectureName')[0].nodeValue,
                            city: item.getElementsByTagName('enCityName')[0].nodeValue,
                            address_outside: item.getElementsByTagName('enAddressOutside')[0].nodeValue,
                        },
                        ignore: item.getElementsByTagName('hihyoji')[0].nodeValue,
                    };
                }
            ),
        };
        return CorpNumberManager.RemoveNullKeys(Res) as CorpInfoResponse;
    }
    private static RemoveNullKeys(parameters) {
        const Keys = Object.keys(parameters).filter(i => parameters[i] !== null && parameters[i].length > 0);
        const Res = {};
        Keys.forEach(i => {
            if (typeof Res[i] === 'object') {
                if (Array.isArray(Res[i])) Res[i] = Res[i].map(d => CorpNumberManager.RemoveNullKeys(d));
                else Res[i] = CorpNumberManager.RemoveNullKeys(Res[i]);
            }
            Res[i] = parameters[i];
        });
        return Res;
    }
    private Request(requestType: string, parameters: string): Promise<CorpInfoResponse> {
        let statusCode = 200;
        return fetch(`https://api.houjin-bangou.nta.go.jp/4/${requestType}?id=${this.#AppID}&type=12&${parameters}`)
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
