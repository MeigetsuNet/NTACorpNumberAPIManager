// eslint-disable-next-line node/no-extraneous-import
import { describe, it } from 'mocha';
import assert from 'assert';
import { closeCause } from '../../dist/src/Converters/closeCause.js';
import { convert } from '../../dist/src/Converters/index.js';

describe('Close Cause Converter Test', function () {
    it('main', function () {
        assert.strictEqual(closeCause('01'), '清算の結了等');
        assert.strictEqual(closeCause('02'), undefined);
    });

    it('wrapper', function () {
        assert.strictEqual(convert.close_cause('01'), '清算の結了等');
        assert.strictEqual(convert.close_cause('02'), '02');
    });
});
