const { normalize } = require('@geolonia/normalize-japanese-addresses')

export const getLatLng = (str, callback, errorCallback = () => {}) => {
  try {
    normalize(str).then(json => {
      if (json.level > 0) {
        callback(json)
      } else {
        const e = new Error('見つかりませんでした。住所を修正して、もう一度お試しください。')
        errorCallback(e)
      }
    }).catch(() => {
      const e = new Error('見つかりませんでした。住所を修正して、もう一度お試しください。')
      errorCallback(e)
    })
  } catch (e) {
    errorCallback(e)
  }
}

if (typeof window !== 'undefined') {
  window.getLatLng = getLatLng
}
