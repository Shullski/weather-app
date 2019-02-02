const request = require('request');
var geocodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='
var API_KEY = '&key=AIzaSyBnuVEIVLrVrSmqlHx_D3NFTfdWHleI2hY';

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);
    request({
      url: (geocodeURL + encodedAddress + API_KEY),
      json: true
    }, (error, response, body) => {
      if(error) {
        reject('Unable to connect to the Google servers.');
      }
      else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find that address.');
      }
      else if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          lat: body.results[0].geometry.location.lat,
          lng: body.results[0].geometry.location.lng,
        });
      }
    });
  });
};

geocodeAddress('44260').then((message) => {
  console.log(message.address);
  console.log(message.lat);
  console.log(message.lng);
}, (errorMessage) => {
  console.log(errorMessage);
});
