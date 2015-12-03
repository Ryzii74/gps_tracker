function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 55.15, lng: 61.384},
        scrollwheel: false,
        zoom: 13
    });

    $.ajax('/points/ryzii').done(function (data) {
        console.log(data);
    });
}