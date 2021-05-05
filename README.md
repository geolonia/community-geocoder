# Nuxt simple geocoding ja

## Summary

- Simple geocoder for japanese addresses
- forked from [community-geocoder](https://github.com/geolonia/community-geocoder)
  - thanks for [Geolonia](https://geolonia.com/)

## Usage

```javascript
const geocoder = require('nuxt-simple-geocoding-ja');
geocoder(
  'address'
  (dict_address)=>{
    //callback for success
  },
  (dict_address)=>{
    //callback for error
  }  
);
```
