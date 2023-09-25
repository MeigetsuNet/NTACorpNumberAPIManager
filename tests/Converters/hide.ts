// eslint-disable-next-line node/no-extraneous-import
import { describe, it } from 'mocha';
import assert from 'assert';
import { hide } from '../../src/Converters/hide';
import { convert } from '../../src/Converters/';

describe('Correct Converter Test', function () {
    it('main', function () {
        assert.strictEqual(hide('1'), '検索対象除外');
        assert.strictEqual(hide('2'), undefined);
    });
    it('wrapper', function () {
        assert.strictEqual(convert.hide('1'), '検索対象除外');
        assert.strictEqual(convert.hide('2'), '2');
    });
});
