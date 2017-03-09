"use strict";

//SODA New York art galleries API 
//API can be found at https://dev.socrata.com/foundry/data.cityofnewyork.us/43hw-uvdj
var SODAagAPI = "https://data.cityofnewyork.us/resource/43hw-uvdj.json?$$app_token=dNjo0bVaaQvP9GEFDkHGujiRG";

var map = L.map('map').setView([40.7850, -73.9682], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZXZtYXlyaW5jayIsImEiOiJjajAxaXBja3QwNzhmMndsczk4NnlteG9qIn0.9JNK9Zq_C3I43Uqw4x0KBA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    accessToken: 'pk.eyJ1IjoiZXZtYXlyaW5jayIsImEiOiJjajAxaXBja3QwNzhmMndsczk4NnlteG9qIn0.9JNK9Zq_C3I43Uqw4x0KBA'
}).addTo(map);

fetch(SODAagAPI)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        for (var i = 0; i < data.length; i++) {
            var gal = data[i];
            if (gal.the_geom.coordinates != undefined) {
            var latlng = gal.the_geom.coordinates.reverse();
            L.marker(latlng).addTo(map)
                .bindPopup("<b>"+gal.name+"</b>"+"<br>"+gal.address1+"<br>"+gal.tel+"<br>"+gal.url);
            }
        }
    })
    .catch(function(err) {
        console.error(err);
        alert(err.message);
    });