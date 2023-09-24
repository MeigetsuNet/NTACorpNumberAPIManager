// eslint-disable-next-line node/no-extraneous-import
import { describe, it } from 'mocha';
import assert from 'assert';
import { process } from '../../src/Converters/process';
import { convert } from '../../src/Converters/';

describe('Process Converter Test', function () {
    it('main', function () {
        assert.strictEqual(process('01'), '新規');
        assert.strictEqual(process('02'), undefined);
    });
    it('wrapper', function() {
        assert.strictEqual(convert.process('01'), '新規');
        assert.strictEqual(convert.process('02'), '02');
    });
});
