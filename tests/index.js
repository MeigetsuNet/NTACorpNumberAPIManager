import { readFileSync } from 'fs';
import CorpNumberManager from '../dist/src/index.js';
// eslint-disable-next-line node/no-extraneous-import
import { describe, it } from 'mocha';
import assert from 'assert';

describe('CorpNumberManager test', function () {
    it('Converter test 1', function () {
        const xml = readFileSync('./testdata/converter1.xml', 'utf-8');
        const json = readFileSync('./testdata/converter1.json', 'utf-8');
        const ExecResult = CorpNumberManager['ConvertXmlToJson'](xml);
        assert.deepStrictEqual(ExecResult, JSON.parse(json));
    });

    it('Converter test 2', function () {
        const xml = readFileSync('./testdata/converter2.xml', 'utf-8');
        const json = readFileSync('./testdata/converter2.json', 'utf-8');
        const ExecResult = CorpNumberManager['ConvertXmlToJson'](xml);
        assert.deepStrictEqual(ExecResult, JSON.parse(json));
    });

    it('Converter test 3', function () {
        const xml = readFileSync('./testdata/converter1.xml', 'utf-8');
        const json = readFileSync('./testdata/converter3.json', 'utf-8');
        const JsonConvertResult = CorpNumberManager['ConvertXmlToJson'](xml);
        const ExecResult = CorpNumberManager['ConvertCodeOnJson'](JsonConvertResult);
        assert.deepStrictEqual(ExecResult, JSON.parse(json));
    });

    it('Converter test 4', function () {
        const xml = readFileSync('./testdata/converter2.xml', 'utf-8');
        const json = readFileSync('./testdata/converter4.json', 'utf-8');
        const JsonConvertResult = CorpNumberManager['ConvertXmlToJson'](xml);
        const ExecResult = CorpNumberManager['ConvertCodeOnJson'](JsonConvertResult);
        assert.deepStrictEqual(ExecResult, JSON.parse(json));
    });

    it('Empty test', function () {
        const xml = readFileSync('./testdata/empty.xml', 'utf-8');
        const json = readFileSync('./testdata/empty.json', 'utf-8');
        const ExecResult = CorpNumberManager['ConvertXmlToJson'](xml);
        assert.deepStrictEqual(ExecResult, JSON.parse(json));
    });

    it('Close information test 1', function () {
        const xml = readFileSync('./testdata/for_close.xml', 'utf-8');
        const json = readFileSync('./testdata/for_close1.json', 'utf-8');
        const ExecResult = CorpNumberManager['ConvertXmlToJson'](xml);
        assert.deepStrictEqual(ExecResult, JSON.parse(json));
    });

    it('Close information test 2', function () {
        const xml = readFileSync('./testdata/for_close.xml', 'utf-8');
        const json = readFileSync('./testdata/for_close2.json', 'utf-8');
        const JsonConvertResult = CorpNumberManager['ConvertXmlToJson'](xml);
        const ExecResult = CorpNumberManager['ConvertCodeOnJson'](JsonConvertResult);
        assert.deepStrictEqual(ExecResult, JSON.parse(json));
    });

    it('Corp Number Converter Test', function () {
        assert.strictEqual(CorpNumberManager.ConvertRegistryNumberToCorpNumber('010404006753'), '4010404006753');
        assert.strictEqual(CorpNumberManager.ConvertRegistryNumberToCorpNumber('0104040067531'), null);
        assert.strictEqual(CorpNumberManager.ConvertRegistryNumberToCorpNumber('a01040400675'), null);
    });
});
