import { CorpInfoRequestParamsFromNum } from './CorpInfoRequestParams/FromNum';
import { CorpInfoRequestParamsFromDiff } from './CorpInfoRequestParams/FromDiff';
import { CorpInfoRequestParamsFromName } from './CorpInfoRequestParams/FromName';
import { CorpInfoResponse } from './CorpInfoResponse';
import { convert } from './Converters/index';
import { convert as xmlConvert } from 'ntacorpnumberapimanager-xmlparser';

export default class CorpNumberManager {
    static DateReserveAllowStartDate: Date = new Date(2015, 9, 15);
    constructor(private readonly ntaAppId: string) {}
    private static async ConvertXmlToJson(xmlText: string): Promise<CorpInfoResponse> {
        return await xmlConvert(xmlText) as CorpInfoResponse;
    }
    private static ConvertCodeOnJson(Data: CorpInfoResponse) {
        /* c8 ignore next */
        if (Data.corporations == null) return Data;
        const Corps = Data.corporations.map(i => {
            const Res = i;
            if (Res.process != null) Res.process = convert.process(Res.process);
            if (Res.kind != null) Res.kind = convert.kind(Res.kind);
            if (Res.latest != null) Res.latest = convert.latest(Res.latest);
            if (Res.correct != null) Res.correct = convert.correct(Res.correct);
            if (Res.close != null && Res.close.cause != null) Res.close.cause = convert.close_cause(Res.close.cause);
            if (Res.ignore != null) Res.ignore = convert.hide(Res.ignore);
            return Res;
        });
        const Res = Data;
        Data.corporations = Corps;
        return Res;
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
    private Request(requestType: string, parameters: string, convertCode: boolean): Promise<CorpInfoResponse> {
        let statusCode = 200;
        return fetch(`https://api.houjin-bangou.nta.go.jp/4/${requestType}?id=${this.ntaAppId}&type=12&${parameters}`)
            .then(response => {
                statusCode = response.status;
                return response.text();
            })
            .then(txt => {
                if (statusCode === 200) {
                    return CorpNumberManager.ConvertXmlToJson(txt)
                        .then(jsonData => (convertCode ? CorpNumberManager.ConvertCodeOnJson(jsonData) : jsonData));
                } else throw new Error(`${statusCode}.${txt}`);
            });
    }
    getCorpInfoFromNum(
        parameters: CorpInfoRequestParamsFromNum,
        convertCode: boolean = true
    ): Promise<CorpInfoResponse> {
        if (!/^[1-9]\d{12}$/.test(parameters.number)) throw new Error('法人番号は半角数字13桁で指定して下さい。');
        const parametersText: string = `number=${parameters.number}&history=${Number(
            parameters.contain_history ?? false
        )}`;
        return this.Request('num', parametersText, convertCode);
    }
    private static CheckDiff(from: Date, to: Date) {
        const diffTime = to.getTime() - from.getTime();
        if (diffTime < 0) throw new Error('toにfromより前の日付を指定することはできません');
        if (Math.floor(diffTime / (1000 * 60 * 60 * 24)) > 50)
            throw new Error('50日を超えた期間を指定することはできません');
        if (CorpNumberManager.DateReserveAllowStartDate > from)
            throw new Error('2015年10月5日以前の日付は指定できません');
    }
    getCorpInfoFromDiff(
        parameters: CorpInfoRequestParamsFromDiff,
        convertCode: boolean = true
    ): Promise<CorpInfoResponse> {
        const GetDateText = (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const formattedParams = {
            from: GetDateText(parameters.from),
            to: GetDateText(parameters.to),
            address: parameters.address_code,
            kind: parameters.corp_type,
            divide: parameters.divide,
        };
        CorpNumberManager.CheckDiff(parameters.from, parameters.to);
        const params = new URLSearchParams(CorpNumberManager.RemoveNullKeys(formattedParams));
        return this.Request('diff', params.toString(), convertCode);
    }
    getCorpInfoFromName(
        parameters: CorpInfoRequestParamsFromName,
        convertCode: boolean = true
    ): Promise<CorpInfoResponse> {
        if (parameters.corp_number_reserve != null)
            CorpNumberManager.CheckDiff(parameters.corp_number_reserve.from, parameters.corp_number_reserve.to);
        const GetDateText = (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const formattedParams = {
            name: parameters.name,
            mode: parameters.match_type,
            target: parameters.target,
            address: parameters.address_code,
            kind: parameters.corp_type,
            change: Number(parameters.contain_change ?? false),
            close: Number(parameters.contain_close ?? true),
            from:
                parameters.corp_number_reserve == null || parameters.corp_number_reserve.from == null
                    ? undefined
                    : GetDateText(parameters.corp_number_reserve.from),
            to:
                parameters.corp_number_reserve == null || parameters.corp_number_reserve.to == null
                    ? undefined
                    : GetDateText(parameters.corp_number_reserve.to),
            divide: parameters.divide,
        };
        const params = new URLSearchParams(CorpNumberManager.RemoveNullKeys(formattedParams));
        return this.Request('name', params.toString(), convertCode);
    }
    public static ConvertRegistryNumberToCorpNumber(registryNumber: string): string | null {
        if (!/^\d{12}$/.test(registryNumber)) return null;
        const CheckDigit =
            [...registryNumber]
                .map(i => parseInt(i))
                .reverse()
                .reduce((acc, cur, idx) => acc + cur * ((idx % 2) + 1)) % 9;
        return `${9 - CheckDigit}${registryNumber}`;
    }
}
