import chai from 'chai';
const assert = chai.assert;

import util from '../src/imi-enrichment-address/lib/util'
import find from '../src/imi-enrichment-address/lib/find'

describe('Tests for `src/imi-enrichment-address/lib/find.js`.', () => {
  it('should find the address "大阪府大阪市中央区大手前２丁目１" as expected.', () => {
    const res = find(util.normalize("大阪府大阪市中央区大手前２丁目１"))
    assert.deepEqual('271280058002', res.code)
    assert.deepEqual('１', res.tail)
  });

  it('should find the address "大阪府堺市北区新金岡町4丁1−8" as expected.', () => {
    const res = find(util.normalize("大阪府堺市北区新金岡町4丁1−8"))
    assert.deepEqual('271460084000', res.code)
    assert.deepEqual('1−8', res.tail)
  });

  it('should find the address "京都市中京区上本能寺前町488番地" as expected.', () => {
    const res = find(util.normalize("京都市中京区上本能寺前町488番地"))
    assert.deepEqual('261040098000', res.code)
    assert.deepEqual('488番地', res.tail)
  });

  it('should find the address "京都市中京区寺町通御池上る上本能寺前町488番地" as expected.', () => {
    const res = find(util.normalize("京都市中京区寺町通御池上る上本能寺前町488番地"))
    assert.deepEqual('261040098000', res.code)
    assert.deepEqual('488番地', res.tail)
  });

  it('should find the address "京都市中京区寺町通御池上る上本能寺前町" as expected.', () => {
    const res = find(util.normalize("京都市中京区寺町通御池上る上本能寺前町"))
    assert.deepEqual('261040098000', res.code)
    assert.deepEqual('', res.tail)
  });

  it('should find the address "京都市東山区大和大路通三条下る東入若松町393" as expected.', () => {
    const res = find(util.normalize("京都市東山区大和大路通三条下る東入若松町393"))
    assert.deepEqual('261050212000', res.code)
    assert.deepEqual('393', res.tail)
  });

  it('should find the address "京都府京都市東山区大和大路二丁目" as expected.', () => {
    const res = find(util.normalize("京都府京都市東山区大和大路二丁目"))
    assert.deepEqual('261050202002', res.code)
    assert.deepEqual('', res.tail)
  });

  it('should find the address "京都府京都市東山区大和大路通正面下る大和大路2-537-1" as expected.', () => {
    const res = find(util.normalize("京都府京都市東山区大和大路通正面下る大和大路2-537-1"))
    assert.deepEqual('261050202002', res.code)
    assert.deepEqual('537-1', res.tail)
  });

  it('should find the address "京都府京都市東山区大和大路通正面下る大和大路2丁目537-1" as expected.', () => {
    const res = find(util.normalize("京都府京都市東山区大和大路通正面下る大和大路2丁目537-1"))
    assert.deepEqual('261050202002', res.code)
    assert.deepEqual('537-1', res.tail)
  });

  it('should find the address "京都府京都市東山区大和大路2-537-1" as expected.', () => {
    const res = find(util.normalize("京都府京都市東山区大和大路2-537-1"))
    assert.deepEqual('261050202002', res.code)
    assert.deepEqual('537-1', res.tail)
  });

  it('should find the address "京都府京都市東山区大和大路2丁目" as expected.', () => {
    const res = find(util.normalize("京都府京都市東山区大和大路2丁目"))
    assert.deepEqual('261050202002', res.code)
    assert.deepEqual('', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/18
  it('should find the address "埼玉県所沢市上安松" as expected.', () => {
    const res = find(util.normalize("埼玉県所沢市上安松"))
    assert.deepEqual('112080072000', res.code)
    assert.deepEqual('', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/14
  it('should find the address "埼玉県比企郡鳩山町石坂" as expected.', () => {
    const res = find(util.normalize("埼玉県比企郡鳩山町石坂"))
    assert.deepEqual('113480015000', res.code)
    assert.deepEqual('', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/15
  it('should find the address "長野県松本市岡田松岡１６２－１" as expected.', () => {
    const res = find(util.normalize("長野県松本市岡田松岡１６２－１"))
    assert.deepEqual('202020028000', res.code)
    assert.deepEqual('１６２－１', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/15
  it('should find the address "長野県松本市大字岡田松岡１６２－１" as expected.', () => {
    const res = find(util.normalize("長野県松本市大字岡田松岡１６２－１"))
    assert.deepEqual('202020028000', res.code)
    assert.deepEqual('１６２－１', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/17
  it('should find the address "京都府舞鶴市余部下無番地" as expected.', () => {
    const res = find(util.normalize("京都府舞鶴市余部下無番地"))
    assert.deepEqual('262020006000', res.code)
    assert.deepEqual('無番地', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/20
  it('should find the address "札幌市西区二十四軒1条1丁目" as expected.', () => {
    const res = find(util.normalize("札幌市西区二十四軒1条1丁目"))
    assert.deepEqual('011070023001', res.code)
    assert.deepEqual('', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/20
  it('should find the address "札幌市西区24軒1条1丁目" as expected.', () => {
    const res = find(util.normalize("札幌市西区24軒1条1丁目"))
    assert.deepEqual('011070023001', res.code)
    assert.deepEqual('', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/37
  it('should find the address "京都府京都市下京区東松屋町" as expected.', () => {
    const res = find(util.normalize("京都府京都市下京区東松屋町"))
    assert.deepEqual('261060423000', res.code)
    assert.deepEqual('', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/37
  it('should find the address "京都府京都市下京区松屋町" as expected.', () => {
    const res = find(util.normalize("京都府京都市下京区松屋町"))
    assert.deepEqual('261060465000', res.code)
    assert.deepEqual('', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/37
  it('should find the address "京都府京都市下京区西松屋町" as expected.', () => {
    const res = find(util.normalize("京都府京都市下京区西松屋町"))
    assert.deepEqual('261060381000', res.code)
    assert.deepEqual('', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/34
  it('should find the address "新潟県新潟市中央区西湊町通1ノ町2692" as expected.', () => {
    const res = find(util.normalize("新潟県新潟市中央区西湊町通1ノ町2692"))
    assert.deepEqual('151030181000', res.code)
    assert.deepEqual('2692', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/33
  it('should find the address "新潟県新潟市中央区西堀通1番町771" as expected.', () => {
    const res = find(util.normalize("新潟県新潟市中央区西堀通1番町771"))
    assert.deepEqual('151030161000', res.code)
    assert.deepEqual('771', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/47
  it('should find the address "北海道上川郡東神楽町19号南2番地" as expected.', () => {
    const res = find(util.normalize("北海道上川郡東神楽町19号南2番地"))
    assert.deepEqual('014530010000', res.code)
    assert.deepEqual('南2番地', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/47
  it('should find the address "北海道上川郡東川町西三号北7番地" as expected.', () => {
    const res = find(util.normalize("北海道上川郡東川町西三号北7番地"))
    assert.deepEqual('014580011000', res.code)
    assert.deepEqual('7番地', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/30
  it('should find the address "旭川市神居2条10丁目" as expected.', () => {
    const res = find(util.normalize("旭川市神居2条10丁目"))
    assert.deepEqual('012040074010', res.code)
    assert.deepEqual('', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/30
  it('should find the address "旭川市神楽6条12丁目" as expected.', () => {
    const res = find(util.normalize("旭川市神楽6条12丁目"))
    assert.deepEqual('012040053012', res.code)
    assert.deepEqual('', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/30
  it('should find the address "旭川市5条通20丁目" as expected.', () => {
    const res = find(util.normalize("旭川市5条通20丁目"))
    assert.deepEqual('012040010020', res.code)
    assert.deepEqual('', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/30
  it('should find the address "旭川市錦町14丁目" as expected.', () => {
    const res = find(util.normalize("旭川市錦町14丁目"))
    assert.deepEqual('012040241014', res.code)
    assert.deepEqual('', res.tail)
  });

  it('should find the address "岩手県久慈市夏井町夏井第一地割36番地" as expected.', () => {
    const res = find(util.normalize("岩手県久慈市夏井町夏井第一地割36番地"))
    assert.deepEqual('032070032000', res.code)
    assert.deepEqual('夏井第一地割36番地', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/67
  it('should find the address "山梨県北都留郡丹波山村" as expected.', () => {
    const res = find(util.normalize("山梨県北都留郡丹波山村"))
    assert.deepEqual('19443', res.code)
    assert.deepEqual('', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/76
  it('should find the address "埼玉市" as expected.', () => {
    const res = find(util.normalize("埼玉市"))
    assert.deepEqual(null, res)
  });

  // https://github.com/geolonia/community-geocoder/issues/75
  it('should find the address "京都府宇治市六地藏1丁目" as expected.', () => {
    const res = find(util.normalize("京都府宇治市六地藏1丁目"))
    assert.deepEqual('262040031001', res.code)
    assert.deepEqual('', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/75
  it('should find the address "京都府宇治市六地藏２丁目" as expected.', () => {
    const res = find(util.normalize("京都府宇治市六地藏２丁目"))
    assert.deepEqual('262040030000', res.code)
    assert.deepEqual('二丁目', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/24
  it('should find the address "岡山県笠岡市大冝" as expected.', () => {
    const res = find(util.normalize("岡山県笠岡市大冝"))
    assert.deepEqual('332050010000', res.code)
    assert.deepEqual('', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/25
  it('should find the address "岡山県岡山市中区穝" as expected.', () => {
    const res = find(util.normalize("岡山県岡山市中区穝"))
    assert.deepEqual('331020031000', res.code)
    assert.deepEqual('', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/24
  it('should find the address "福岡県遠賀郡水巻町杁" as expected.', () => {
    const res = find(util.normalize("福岡県遠賀郡水巻町杁"))
    assert.deepEqual('403820004002', res.code)
    assert.deepEqual('', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/50
  it('should find the address "宮城県塩釜市旭町1-1" as expected.', () => {
    const res = find(util.normalize("宮城県塩釜市旭町1-1"))
    assert.deepEqual('042030034000', res.code)
    assert.deepEqual('1-1', res.tail)
  });

  // https://github.com/geolonia/community-geocoder/issues/50
  it('should find the address "長野県長野市東之門町" as expected.', () => {
    const res = find(util.normalize("長野県長野市東之門町"))
    assert.deepEqual('202010060000', res.code)
    assert.deepEqual('東の門町', res.tail) // 内部的に `之` を `の` に変換
  })

  // https://github.com/geolonia/community-geocoder/issues/60
  it('should find the address "東京都千代田区猿楽町" as expected.', () => {
    const res = find(util.normalize("東京都千代田区猿楽町"))
    assert.deepEqual('131010047002', res.code)
    assert.deepEqual('', res.tail) // 内部的に `之` を `の` に変換
  })

  // https://github.com/geolonia/community-geocoder/issues/60
  it('should find the address "千代田区三崎町" as expected.', () => {
    const res = find(util.normalize("千代田区三崎町"))
    assert.deepEqual('131010049003', res.code)
    assert.deepEqual('', res.tail) // 内部的に `之` を `の` に変換
  })

  // https://github.com/geolonia/community-geocoder/issues/60
  it('should find the address "東京都千代田区神田猿楽町" as expected.', () => {
    const res = find(util.normalize("東京都千代田区神田猿楽町"))
    assert.deepEqual('131010047002', res.code)
    assert.deepEqual('', res.tail) // 内部的に `之` を `の` に変換
  })

  // https://github.com/geolonia/community-geocoder/issues/60
  it('should find the address "千代田区神田三崎町" as expected.', () => {
    const res = find(util.normalize("千代田区神田三崎町"))
    assert.deepEqual('131010049003', res.code)
    assert.deepEqual('', res.tail) // 内部的に `之` を `の` に変換
  })

  // https://github.com/geolonia/community-geocoder/issues/91
  it('should find the address "高山村高井" as expected.', () => {
    const res = find(util.normalize("高山村高井"))
    assert.deepEqual('205430002000', res.code)
    assert.deepEqual('', res.tail)
  })
  it('should find the address "高山村大字高井" as expected.', () => {
    const res = find(util.normalize("高山村大字高井"))
    assert.deepEqual('205430002000', res.code)
    assert.deepEqual('', res.tail)
  })
  it('should find the address "森町赤井川" as expected.', () => {
    const res = find(util.normalize("森町赤井川"))
    assert.deepEqual('013450001000', res.code)
    assert.deepEqual('', res.tail)
  })
  it('should find the address "森町字赤井川" as expected.', () => {
    const res = find(util.normalize("森町字赤井川"))
    assert.deepEqual('013450001000', res.code)
    assert.deepEqual('', res.tail)
  })
  // https://github.com/geolonia/community-geocoder/issues/84
  it('should find the address', () => {
    const res = find(util.normalize("京都府京都市上京区中長者町通新町西入仲之町276"))
    assert.deepEqual('261020357000', res.code) // 中長者町通新町西入 を削除
    assert.deepEqual('276', res.tail)
  })
})
