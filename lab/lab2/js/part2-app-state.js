/* =====================
  Lab 2, part 2 - application state

  Spatial applications aren't typically as simple as putting data on a map. In
  addition, you'll usually need to change the stored data in response to user
  input. This lab walks you through writing a set of functions that are capable
  of building an interactive application.

  First, we'll need to write a function for loading points onto the map. Choose
  any dataset from part1 and write a function here to download it, parse it,
  make it into markers, and plot it. You'll know you've succeeded when you can
  see markers on the map.

  NOTE 1: When we have added markers to the map in the past, we have used a line like:

       L.marker([50.5, 30.5]).addTo(map);

       This is accomplishing two goals. L.marker([50.5, 30.5]) makes a marker
       and .addTo(map) adds that marker to the map. This task differs in that
       you are being asked to create separate functions: one to create markers
       and one to add them to the map.

  (IMPORTANT!)
  NOTE 2: These functions are being called for you. Look to the bottom of this file
       to see where and how the functions you are defining will be used. Remember
       that function calls (e.g. func();) which are equal to a value (i.e. you
       can set a var to it: var result = func();) must use the 'return' keyword.

       var justOne = function() {
         return 1;
       }
       var one = justOne();
===================== */

// Use the data source URL from lab 1 in this 'ajax' function:
var downloadData = $.ajax("https://raw.githubusercontent.com/sydng/OST4GIS-week4/master/GSI_Public_Projects_Point.geojson");

// Write a function to prepare your data (clean it up, organize it as you like, create fields, etc)
var parseData = function(data) {
  var step1 = JSON.parse(data);
  var step2 = step1.features;
  var step3 = [];
  var step4 = [];
//need to convert into underscore notation
//have tried but am struggling with accessing nested with _.each
//_.each(step2, function(object) {
  //_.each(object, function (elem) {
    //_.each(elem.properties, function(data) { return _.propertyOf(data)('PROJECTNAME');
    //});
  //});
//});

  for(i = 0; i < step2.length; i++) {
    step3.push(_.propertyOf(step2[i].properties)('PROJECTNAME'));
    step4.push(_.propertyOf(step2[i].geometry)('coordinates'));
  }
  var step5 = [];
  for(i=0; i < 100; i++) {
    step5.push(step4[i].concat(step3[i]));
  }
  return step5;
};

// Write a function to use your parsed data to create a bunch of marker objects (don't plot them!)
var makeMarkers = function(elem) {
  var step6 = [];
  //_.each(elem, function(i) { step6.push(L.marker([elem[i][0], elem[i][1]])); });
  for(i = 0; i < elem.length; i++) {
    step6.push(L.marker([elem[i][1], elem[i][0]]));
  }
  return step6;
};

// Now we need a function that takes this collection of markers and puts them on the map
var plotMarkers = function(layer) {
    _.each(layer, function(x) { map.addLayer(x); });
};

// At this point you should see a bunch of markers on your map.
// Don't continue on until you can make them appear!

/* =====================
  Define the function removeData so that it clears the markers you've written
  from the map. You'll know you've succeeded when the markers that were
  previously displayed are (nearly) immediately removed from the map.

  In Leaflet, the syntax for removing one specific marker looks like this:

  map.removeLayer(marker);

  In real applications, this will typically happen in response to changes to the
  user's input.
===================== */

// Look to the bottom of this file and try to reason about what this function should look like
var removeMarkers = function(newLayer) {
    _.each(newLayer, function(y) { map.removeLayer(y); });
};

//tried to filter based on whether the projectname included "play" for playground
//couldn't quite get it to work
var parseData2 = function(data) {
  var step1 = JSON.parse(data);
  var step2 = step1.features;
  var step3 = [];
  var step4 = [];
  for(i = 0; i < step2.length; i++) {
    step3.push(_.propertyOf(step2[i].properties)('PROJECTNAME'));
    step4.push(_.propertyOf(step2[i].geometry)('coordinates'));
  }
  var step5 = [];
  for(i=0; i < 100; i++) {
    step5.push(step4[i].concat(step3[i]));
  }
  //return step5;
    step6 = [];
    for(i = 0; i < step5.length; i++) {
      if(step5[i].toUpperCase().indexOf('PLAY') >= 0) {
          step6.push(step5[i]);
      }
    return step6;
    }
};

/* =====================
  Optional, stretch goal
  Write the necessary code (however you can) to plot a filtered down version of
  the downloaded and parsed data.

  Note: You can add or remove from the code at the bottom of this file for the stretch goal.
===================== */

/* =====================
 Leaflet setup - feel free to ignore this
===================== */

var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

/* =====================
 CODE EXECUTED HERE!
===================== */

downloadData.done(function(data) {
  var parsed = parseData(data);
  //var parsed = parseData2(data);
  var markers = makeMarkers(parsed);
  plotMarkers(markers);
  //removeMarkers(markers);
  //filteringMarkers(markers);
  console.log(parsed);
});
