import { readFileSync, writeFileSync } from 'fs';
import CorpNumberManager from '../src';
import { describe, it } from 'mocha';
import assert from 'assert';
import { xml2json } from 'xml-js';

describe('CorpNumberManager test', function () {
    const CorpMgr = new CorpNumberManager('');
    it('Converter test 1', function () {
        const xml = readFileSync('./testdata/converter1.xml', 'utf-8');
        //const json = readFileSync('./testdata/converter1.json', 'utf-8');
        const ExecResult = CorpMgr['ConvertXmlToJson'](xml);
        writeFileSync('result2.json', JSON.stringify(ExecResult));
        assert.ok(true);
        //assert.strictEqual(ExecResult, JSON.parse(json));
    });
    it('Converter test 2', function () {
        const xml = readFileSync('./testdata/converter2.xml', 'utf-8');
        //const json = readFileSync('./testdata/converter2.json', 'utf-8');
        const ExecResult = CorpMgr['ConvertXmlToJson'](xml);
        writeFileSync('result3.json', JSON.stringify(ExecResult));
        assert.ok(true);
        //assert.strictEqual(ExecResult, JSON.parse(json));
    });
    it('xml2json export test 1', function () {
        const xml = readFileSync('./testdata/converter1.xml', 'utf-8');
        const json = xml2json(xml);
        writeFileSync('result0A.json', json);
        writeFileSync('result0B.json', JSON.stringify({ item: JSON.parse(json).elements }));
        writeFileSync('result0C.json', JSON.stringify({ item: JSON.parse(json).elements[0].elements }));
        writeFileSync(
            'result0D.json',
            JSON.stringify({ item: JSON.parse(json).elements[0].elements.filter(i => i.name === 'corporation') })
        );
        writeFileSync(
            'result0E.json',
            JSON.stringify({ item: JSON.parse(json).elements[0].elements.filter(i => i.name === 'corporation')[0] })
        );
        assert.ok(true);
    });
    it('xml2json export test 2', function () {
        const xml = readFileSync('./testdata/converter2.xml', 'utf-8');
        const json = xml2json(xml);
        writeFileSync('result1A.json', json);
        writeFileSync('result1B.json', JSON.stringify({ item: JSON.parse(json).elements }));
        writeFileSync('result1C.json', JSON.stringify({ item: JSON.parse(json).elements[0].elements }));
        writeFileSync(
            'result1D.json',
            JSON.stringify({ item: JSON.parse(json).elements[0].elements.filter(i => i.name === 'corporation') })
        );
        assert.ok(true);
    });
});
