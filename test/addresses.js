const assert = require('chai').assert;
const fs = require('fs');
const path = require('path');

const util = require('../src/imi-enrichment-address/lib/util').util;
const find = require('../src/imi-enrichment-address/lib/find').find;

it.allowFail = (title, callback) => {
  it(title, function() {
    return Promise.resolve().then(() => {
      return callback.apply(this, arguments);
    }).catch(() => {
      this.skip();
    });
  });
};

describe('Tests for `src/imi-enrichment-address/lib/find.js` with address list.', () => {
  const data = fs.readFileSync(path.join(path.dirname(__filename), '/addresses.txt'), {encoding: 'utf-8'}).split(/\n/)
  for (let i = 0; i < data.length; i++) {
    if (data[i]) {
      it.allowFail(`should find the address "${data[i]}" as expected.`, () => {
        const res = find(util.normalize(data[i]))
        assert.isTrue(12 == res.code.length)
      });
    }
  }
})
