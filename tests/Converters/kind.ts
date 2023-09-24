// eslint-disable-next-line node/no-extraneous-import
import { describe, it } from 'mocha';
import assert from 'assert';
import { kind } from '../../src/Converters/kind';
import { convert } from '../../src/Converters/';

describe('Kind Converter Test', function () {
    it('main', function () {
        assert.strictEqual(kind('101'), '国の機関');
        assert.strictEqual(kind('102'), undefined);
    });
    it('wrapper', function() {
        assert.strictEqual(convert.kind('101'), '国の機関');
        assert.strictEqual(convert.kind('102'), '102');
    });
});
