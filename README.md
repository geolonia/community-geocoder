# Community Geocoder

オープンソースのジオコーディング API です。

経産省の [IMI コンポーネントツール](https://info.gbiz.go.jp/tools/imi_tools/)のジオコーディングの仕組みからインスピレーションをうけて開発しました。

デモ: https://community-geocoder.geolonia.com/

[無料で利用できてオープンソースの、住所から緯度経度を検索するためのジオコーディング API を公開しました。](https://blog.geolonia.com/2020/06/01/community-geocoder.html)

## 特徴

* 国土交通省の位置参照情報の「大字・町丁目レベル位置参照情報」を利用したジオコーディングサービスです。
  * JavaScript API と緯度経度の API を提供しています。
* オープンソースなので誰でもフォークすることができ、利用規約の変更などを気にすることなく、安心して利用することができます。
* ソースコードのライセンスは MIT ライセンスです。取得した位置情報のご利用はご自由にどうぞ。

## 仕組み

Geoloniaの住所正規化ライブラリ[@geolonia/normalize-japanese-addresses](https://github.com/geolonia/normalize-japanese-addresses)を利用して、緯度経度を取得したい住所を正規化（都道府県、市区町村、町丁目などに分解する）した上で、緯度経度を取得します。

* 正規化が途中までしかできず、市区町村名までしか判別できなかった場合は、[@geolonia/jisx0402](https://github.com/geolonia/jisx0402)を使って市区町村名から市区町村コードを取得し、[@geolonia/japanese-admins](https://github.com/geolonia/japanese-admins)を使って市区町村コードから緯度・経度を取得しています。
* 都道府県名までしか判別できなかった場合は、[@geolonia/japanese-prefectural-capitals](https://github.com/geolonia/japanese-prefectural-capitals)を使って県庁所在地の緯度・経度を取得しています。

## 使い方

以下の JavaScript API をウェブページから読み込んでください。

```html
<script src="https://cdn.geolonia.com/community-geocoder.js"></script>
```

API 関数 `getLatLng()` を任意のクリックイベント等でコールしてください。

```javascript
document.getElementById('exec').addEventListener('click', () => {
  if (document.getElementById('address').value) {
    getLatLng(document.getElementById('address').value, (latlng) => {
      map.setCenter(latlng)
    })
  }
})
```

### `getLatLng(address, callback, errorCallback)`

* `address` - 緯度経度を取得したい住所の文字列
* `callback` - 緯度経度を取得したあとで実行したいコールバック関数。コールバック関数の第一引き数には緯度経度のオブジェクトが渡されます。
* `errorCallback` - エラー時のコールバック関数。エラーオブジェクトが引き数として渡されます。

住所の文字列として「東京都千代田区霞が関1-3-1」を渡した場合、コールバック関数に引き数として渡される緯度経度のオブジェクトは以下のようになっています。

```javascript
{
  addr: "3-1"
  city: "千代田区"
  lat: 35.673944
  level: 3
  lng: 139.752558
  pref: "東京都"
  town: "霞が関一丁目"
}
```

* `addr` - 都道府県名、市区町村名、町丁目を除いた残りの住所
* `city` - 市区町村名
* `lat` - 緯度
* `level` - 正規化レベル。住所文字列のどこまでを判別できたかを以下の数値で表しています。
  * 0 - 都道府県も判別できなかった。
  * 1 - 都道府県まで判別できた。
  * 2 - 市区町村まで判別できた。
  * 3 - 町丁目まで判別できた。
* `lng` - 経度
* `pref` - 都道府県名
* `town` - 町丁目

## 開発者向け情報

まず、以下のコマンドで環境を用意してください。

```
$ git clone git@github.com:geolonia/community-geocoder.git
$ cd community-geocoder
$ npm install
```

### JavaScript API の開発方法

`src/api.js` がこのサービスで提供される JavaScript API のソースです。 以下のコマンドでブラウザで確認しながら作業できます。

```
$ npm start
```

プルリクエストはいつでも歓迎します。

## ライセンス、利用規約

* ソースコードのライセンスは MIT ライセンスです。
* 取得した緯度経度の情報のご利用方法に制限はありません。他社の地図、アプリ、その他ご自由にご利用ください。
* ご利用に際しましては、できればソーシャルでのシェア、[Geolonia](https://geolonia.com/) へのリンクの設置などをしていただけると、開発者たちのモチベーションが上がると思います。

プルリクや Issue は大歓迎です。住所の正規化を工夫すれば精度があがりそうなので、そのあたりのアイディアを募集しています。
