import chai from 'chai';
const assert = chai.assert;

import { getLatLng } from '../src/api.js';

describe('Tests for `src/api.js`.', () => {
  it('should getLatLng the address "大阪府大阪市中央区大手前２丁目１" as expected.', (done) => {
    getLatLng("大阪府大阪市中央区大手前２丁目１", latlng => {
      assert.deepEqual("1", latlng.addr);
      assert.deepEqual("大阪市中央区", latlng.city);
      assert.deepEqual(34.687006, latlng.lat);
      assert.deepEqual(3, latlng.level);
      assert.deepEqual(135.519317, latlng.lng);
      assert.deepEqual("大阪府", latlng.pref);
      assert.deepEqual("大手前二丁目", latlng.town);
      done(); 
    });
  });

  it('should getLatLng the address "大阪府大阪市中央区大手前10-10" as expected.', (done) => {
    getLatLng("大阪府大阪市中央区大手前10-10", latlng => {
      assert.deepEqual("大手前10-10", latlng.addr);
      assert.deepEqual("大阪市中央区", latlng.city);
      assert.deepEqual(null, latlng.lat);
      assert.deepEqual(2, latlng.level);
      assert.deepEqual(null, latlng.lng);
      assert.deepEqual("大阪府", latlng.pref);
      assert.deepEqual("", latlng.town);
      done(); 
    });
  });

  it('should getLatLng the address "大阪府大サカ市中央区大手前２丁目１" as expected.', (done) => {
    getLatLng("大阪府大サカ市中央区大手前２丁目１", latlng => {
      assert.deepEqual("大サカ市中央区大手前2丁目1", latlng.addr);
      assert.deepEqual("", latlng.city);
      assert.deepEqual(null, latlng.lat);
      assert.deepEqual(1, latlng.level);
      assert.deepEqual(null, latlng.lng);
      assert.deepEqual("大阪府", latlng.pref);
      assert.deepEqual("", latlng.town);
      done(); 
    });
  });
})
