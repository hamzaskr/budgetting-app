import test from 'node:test';
import assert from 'node:assert/strict';
import { parseMoney, formatMoney, percentage } from '../js/domain/money.js';
test('parses minor units without floating point arithmetic', () => assert.equal(parseMoney('1,000.50'), 100050));
test('rejects malformed or negative amounts', () => { assert.throws(() => parseMoney('-1')); assert.throws(() => parseMoney('1.234')); });
test('formats and calculates percentages', () => { assert.match(formatMoney(465000), /4,?650/); assert.equal(percentage(25, 100), 25); });
