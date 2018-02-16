/**
 * Using ajax, download some data from a remote server and log it to the console
 */

var placeholder;
var promise = $.ajax("https://raw.githubusercontent.com/sydng/OST4GIS-week4/master/city_landmarks.geojson")
.then(function(res) { placeholder = JSON.parse(res);})
.then(function() {console.log(placeholder);});




var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 2
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

// L.terminator().addTo(map)
