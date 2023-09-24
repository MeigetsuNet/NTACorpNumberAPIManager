// eslint-disable-next-line node/no-extraneous-import
import { describe, it } from 'mocha';
import assert from 'assert';
import { latest } from '../../src/Converters/latest';
import { convert } from '../../src/Converters/';

describe('Latest Converter Test', function () {
    it('main', function () {
        assert.strictEqual(latest('1'), '最新情報');
        assert.strictEqual(latest('2'), undefined);
    });
    it('wrapper', function() {
        assert.strictEqual(convert.latest('1'), '最新情報');
        assert.strictEqual(convert.latest('2'), '2');
    });
});
