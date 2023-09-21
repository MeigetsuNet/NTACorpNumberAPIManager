import { readFileSync } from 'fs';
import CorpNumberManager from '../src';
import { describe, it } from 'mocha';
import assert from 'assert';

describe('CorpNumberManager test', function () {
    const CorpMgr = new CorpNumberManager('');
    it('Converter test 1', function () {
        const xml = readFileSync('./testdata/converter1.xml', 'utf-8');
        const json = readFileSync('./testdata/converter1.json', 'utf-8');
        assert.deepStrictEqual(CorpMgr['ConvertXmlToJson'](xml), json);
    });
    it('Converter test 2', function () {
        const xml = readFileSync('./testdata/converter2.xml', 'utf-8');
        const json = readFileSync('./testdata/converter2.json', 'utf-8');
        assert.deepStrictEqual(CorpMgr['ConvertXmlToJson'](xml), json);
    });
});
