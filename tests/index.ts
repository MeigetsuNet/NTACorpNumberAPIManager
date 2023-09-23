import { readFileSync, writeFileSync } from 'fs';
import CorpNumberManager from '../src';
// eslint-disable-next-line node/no-extraneous-import
import { describe, it } from 'mocha';
import assert from 'assert';

describe('CorpNumberManager test', function () {
    it('Converter test 1', function () {
        const xml = readFileSync('./testdata/converter1.xml', 'utf-8');
        const json = readFileSync('./testdata/converter1.json', 'utf-8');
        const ExecResult = CorpNumberManager['ConvertXmlToJson'](xml);
        writeFileSync('result2.json', JSON.stringify(ExecResult));
        assert.deepStrictEqual(ExecResult, JSON.parse(json));
    });
    it('Converter test 2', function () {
        const xml = readFileSync('./testdata/converter2.xml', 'utf-8');
        const json = readFileSync('./testdata/converter2.json', 'utf-8');
        const ExecResult = CorpNumberManager['ConvertXmlToJson'](xml);
        writeFileSync('result3.json', JSON.stringify(ExecResult));
        assert.deepStrictEqual(ExecResult, JSON.parse(json));
    });
    it('Converter test 3', function () {
        const xml = readFileSync('./testdata/converter1.xml', 'utf-8');
        const json = readFileSync('./testdata/converter3.json', 'utf-8');
        const JsonConvertResult = CorpNumberManager['ConvertXmlToJson'](xml);
        const ExecResult = CorpNumberManager['ConvertCodeOnJson'](JsonConvertResult);
        writeFileSync('result2.json', JSON.stringify(ExecResult));
        assert.deepStrictEqual(ExecResult, JSON.parse(json));
    });
    it('Converter test 4', function () {
        const xml = readFileSync('./testdata/converter2.xml', 'utf-8');
        const json = readFileSync('./testdata/converter4.json', 'utf-8');
        const JsonConvertResult = CorpNumberManager['ConvertXmlToJson'](xml);
        const ExecResult = CorpNumberManager['ConvertCodeOnJson'](JsonConvertResult);
        writeFileSync('result3.json', JSON.stringify(ExecResult));
        assert.deepStrictEqual(ExecResult, JSON.parse(json));
    });
});
