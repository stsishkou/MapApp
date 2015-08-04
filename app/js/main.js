var map = L.map('map');

map.setView([53.906473, 27.567035], 12);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

map.on('click', function(e) {
    onMapClick(e);
});

function onMapClick(e) {
    console.log(e);
    L.marker([e.latlng.lat, e.latlng.lng]).addTo(map).bindPopup('test');
}

setTimeout(function() {
    console.log('*** start it ***');

    map.setView([39.61, -105.02], 11);

    var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
        denver = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
        aurora = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
        golden = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');
}, 2000);

