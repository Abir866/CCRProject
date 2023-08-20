/*
Purpose: The functionality of this file is to allow the display of
         a google map showing the end user the location of the conservation
         site.
Author/ Work Done: Justin Lemire - Entirety of this file.
*/

/*
    Below is a link to the Google Maps API licensing agreement.
    https://cloud.google.com/maps-platform/terms?_gl=1*1u53vl3*_ga*OTU1MzMyMTk5LjE2NjYwMTIyNTU.*_ga_NRWSTWS78N*MTY2OTQ3OTYyMC4yLjAuMTY2OTQ3OTYyMi4wLjAuMA..
    Accessed on: November 26th, 2022
*/

/*
Purpose: To initialize the google map api and display the associated map.
Parameters: N/A
Return: N/A
Author: Same as Header
*/

function initMap() {
    //the center point of the map when first loaded
    var loc = {lat: 44.614798, lng: -63.922875};
    //creates a map variable using the preset location as the center with a low level zoom
    var map = new google.maps.Map(
        document.getElementById("map"), {zoom: 15, center: loc});
        //adds the marker for the location
        var marker = new google.maps.Marker({position: loc, map: map});
}

window.initMap = initMap;