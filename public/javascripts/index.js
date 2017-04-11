function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 55.15, lng: 61.384 },
        scrollwheel: true,
        zoom: 13,
    });

    let line;
    showLine();
    setInterval(() => {
        line && line.setMap(null);
        showLine();
    }, 10000);

    function showLine() {
        $.ajax(`/points${window.location.pathname.replace('/map', '')}`).done((data) => {
            data = JSON.parse(data);
            line = new google.maps.Polyline({
                path: data,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2,
            });

            line.setMap(map);
        });
    }
}
