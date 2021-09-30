import geojsonExtent from '@mapbox/geojson-extent'

import { getLatLng } from './api.js'

require('viewport-units-buggyfill').init()

document.addEventListener('DOMContentLoaded', () => {
  const map = new window.geolonia.Map('#map')

  map.on('moveend', () => {
    const { lng, lat } = map.getCenter()
    document.getElementById('lat').value = Math.round(lat * 1000000) / 1000000
    document.getElementById('lng').value = Math.round(lng * 1000000) / 1000000
  })

  document.getElementById('address').addEventListener('focus', e => {
    e.target.select()
  })

  document.getElementById('lat').addEventListener('focus', e => {
    e.target.select()
  })

  document.getElementById('lng').addEventListener('focus', e => {
    e.target.select()
  })

  const showMessage = msg => {
    document.querySelector('#err .msg').textContent = msg
    document.getElementById('err').style.visibility = 'visible'

    const title = `[誤判定] ${document.getElementById('address').value}`
    const body = '住所が判定できませんでした。'
    const url = `https://github.com/geolonia/community-geocoder/issues/new?title=${encodeURI(title)}&body=${encodeURI(body)}`
    document.querySelector('#err a').href = url
  }

  const search = () => {
    if ('undefined' !== typeof map.getLayer('japanese-administration')) {
      map.removeLayer('japanese-administration')
      map.removeSource('japanese-administration')
    }

    document.getElementById('err').style.visibility = 'hidden'

    if (document.getElementById('address').value) {
      getLatLng(document.getElementById('address').value, latlng => {
        // eslint-disable-next-line no-console
        console.log(latlng)
        if (latlng.level === 1) {
          // 都道府県名までしか判別できなかった場合(正規化レベル1)は、
          // @geolonia/japanese-prefectural-capitals(https://github.com/geolonia/japanese-prefectural-capitals)
          // を使って県庁所在地の緯度・経度を取得しています。
          const endpoint = 'https://geolonia.github.io/japanese-prefectural-capitals/index.json'
          fetch(endpoint).then(res => {
            return res.json()
          }).then(data => {
            map.flyTo({ center: data[latlng.pref], zoom: 9, essential: true })
            showMessage(`住所の判定ができなかったので「${latlng.pref}」に移動します。`)
          })
        } else if (latlng.level === 2) {
          // 市区町村名までしか判別できなかった場合(正規化レベル2)は、
          // @geolonia/jisx0402(https://github.com/geolonia/jisx0402)
          // を使って市区町村名から市区町村コードを取得し、
          // @geolonia/japanese-admins(https://github.com/geolonia/japanese-admins)
          // を使って市区町村コードから緯度・経度を取得しています。
          const endpoint = 'https://geolonia.github.io/jisx0402/api/v1/all.json'
          fetch(endpoint).then(res => {
            return res.json()
          }).then(data => {
            const keys = Object.keys(data)
            const values = Object.values(data)
            const index = values.findIndex(value => value.prefecture === latlng.pref && value.city === latlng.city)
            const code = keys[index].substr(0, 5)

            const endpoint = `https://geolonia.github.io/japanese-admins/${code.substr(0, 2)}/${code}.json`
            fetch(endpoint).then(res => {
              return res.json()
            }).then(data => {
              map.fitBounds(geojsonExtent(data))
              map.addLayer({
                id: 'japanese-administration',
                type: 'fill',
                source: {
                  type: 'geojson',
                  data: data,
                },
                layout: {},
                paint: {
                  'fill-color': '#ff0000',
                  'fill-opacity': 0.08,
                },
              })
              showMessage(`住所の判定ができなかったので「${data.features[0].properties.name}」に移動します。`)
            })
          })
        } else {
          map.flyTo({ center: latlng, zoom: 16, essential: true })
        }
      }, e => {
        document.querySelector('#err .msg').textContent = e.message
        showMessage(e)
      })
    }
  }

  document.getElementById('exec').addEventListener('click', search)
})
