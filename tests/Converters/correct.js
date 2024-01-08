// eslint-disable-next-line node/no-extraneous-import
import { describe, it } from 'mocha';
import assert from 'assert';
import { correct } from '../../dist/src/Converters/correct.js';
import { convert } from '../../dist/src/Converters/index.js';

describe('Correct Converter Test', function () {
    it('main', function () {
        assert.strictEqual(correct('1'), '訂正');
        assert.strictEqual(correct('2'), undefined);
    });
    it('wrapper', function () {
        assert.strictEqual(convert.correct('1'), '訂正');
        assert.strictEqual(convert.correct('2'), '2');
    });
});
