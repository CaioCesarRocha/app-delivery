export function getDistanceFromLatLntInKm(position1, position2){
    "use strict";
    var deg2rad = function (deg) { return deg * (Math.PI / 180); },
        R = 6371,
        position1Lat = position1[0],
        position1Lng = position1[1],
        position2Lat = position2[0],   
        position2Lng = position2[1],
        dLat = deg2rad(position2Lat - position1Lat),
        dLng = deg2rad(position2Lng - position1Lng),
        a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(deg2rad(position1Lat))
            * Math.cos(deg2rad(position1Lat))
            * Math.sin(dLng / 2) * Math.sin(dLng / 2),
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        console.log(parseInt(((R * c *1000).toFixed())))
    return parseInt(((R * c *1000).toFixed()));
}

/*var distance = (getDistanceFromLatLonInKm(
   {lat: -23.522490, lng: -46.736600},
   {lat: -23.4446654, lng: -46.5319316}
));
console.log(distancia);*/