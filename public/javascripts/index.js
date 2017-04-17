function showLine() {
    const userId = window.location.pathname.replace('/', '');
    if (!userId) return;

    $.ajax(`/points${userId}`).done((data) => {
        data = JSON.parse(data);
        const line = new google.maps.Polyline({
            path: data,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });

        line.setMap(map);
    });
}

function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 55.15, lng: 61.384 },
        scrollwheel: true,
        zoom: 13,
    });

    let line;
    showLine();
    setInterval(() => {
        if (line) line.setMap();
        showLine();
    }, 10000);
}
