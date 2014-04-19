$(document).ready(function(){

    var basemap = 'data/australia.geo.json';
    var cities = 'data/australia.cities.geo.json';


    var map = L.map('map').setView([-25.7915087,135.4346432], 4);
    
    $.when(
        $.getJSON(basemap),
        $.getJSON(cities)
    ).then(function(basemap, cities){
        L.geoJson(basemap[0], {
            clickable: false,
            style: { className: 'land' }
        }).addTo(map);

        // Selective cities.
        map.attributionControl.addAttribution('Places by GeoNames');
        L.selectiveJSON(cities[0],{
            pointToLayer: function(properties, latlng){
                return L.circleMarker(latlng,{className:'city', radius: 4})
                    .bindLabel(properties.name, { noHide: true });
            }
        }).addTo(map);
    });
});