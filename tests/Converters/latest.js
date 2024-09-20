// eslint-disable-next-line node/no-extraneous-import
import { describe, it } from 'mocha';
import assert from 'assert';
import { latest } from '../../dist/Converters/latest.js';
import { convert } from '../../dist/Converters/index.js';

describe('Latest Converter Test', function () {
    it('main', function () {
        assert.strictEqual(latest('1'), '最新情報');
        assert.strictEqual(latest('2'), undefined);
    });

    it('wrapper', function () {
        assert.strictEqual(convert.latest('1'), '最新情報');
        assert.strictEqual(convert.latest('2'), '2');
    });
});
