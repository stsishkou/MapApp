let tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://localhost/">localhost</a>'
    }),

    latLng = L.latLng(53.906473, 27.567035),

    map = L.map('map', {
        center: latLng,
        zoom: 14,
        layers: [tiles]
    }),

    markers = L.markerClusterGroup();

let markerPoints = (function() {
    let points = [],
        numeric = faker.directive('numeric'),
        fullName = faker.directive('fullName');

    for (let i = 0; i < 10000; i++) {
        points.push({
            lat: numeric(52.906473, 55.906473),
            lng: numeric(27.567035, 28.567035),
            title: fullName()
        })
    }
    return points;
})();

markerPoints.forEach(function(markerPoint) {
    markers.addLayer(
        L.marker(new L.LatLng(markerPoint['lat'], markerPoint['lng']), {
            // options
            title: markerPoint['title'],
            draggable: true,
            riseOnHover: true
        }).bindPopup(markerPoint['title'])
    );

});

map.addLayer(markers);


