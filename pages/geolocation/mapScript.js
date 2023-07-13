/*This script uses the Google Maps API to generate an interactive
map with custom icons. Created for the geolocation app of Group D in the Fall 2022
Software Engineering course at Saint Mary's University. 
Authors/Work Done: Alexandra Embree - Map base, icons, customization, popups
Alexander Mack - Geolocation based dot marker
*/

//Define the map
let map;

//Populated in setMarkers function
const markers = [];

//Populated in setPath function
const route = [];

//Point of interests: name, lat, long, category
var POIS = [
  ["Trailhead", 44.626459, -63.923519, "Other"],
  ["Hazelnut Tree", 44.626375, -63.923296, "Tree"],
  ["Big & Bent Apple Trees", 44.626245, -63.923206, "Tree"],
  ["Pear Tree", 44.626235, -63.923128, "Tree"],
  ["Cherry-HoneySuckle Arch", 44.626174, -63.923098, "Tree"],
  ["Spruce Grove Start", 44.6261, -63.923103, "Other"],
  ["Old Foundation", 44.626089, -63.922964, "Historical"],
  ["Spruce Grove End", 44.626003, -63.922846, "Other"],
  ["Big Grove Entrance", 44.625959, -63.922715, "Tree"],
  ["Old Well", 44.625875, -63.922742, "Historical"],
  ["Very Big Apple Tree", 44.625831, -63.922568, "Tree"],
  ["Trail End", 44.625837, -63.922404, "Other"],
];

//The approximate points of a polygon that covers the park area, based
//on map estimate
const parkBoundariesCoordinates = [
  { lat: 44.626674, lng: -63.923623 },
  { lat: 44.626605, lng: -63.923836 },
  { lat: 44.62584, lng: -63.923439 },
  { lat: 44.625377, lng: -63.922789 },
  { lat: 44.625747, lng: -63.921874 },
];

setPath();

/*Author: Alexandra Embree
This function creates an array of lat/long points to define a polyline.
The polyline acts as an approximation of the path through the park.*/
function setPath() {
  let n = 0;
  for (let i = 0; i < POIS.length; i++) {
    const POI = POIS[i];
    if (POI[0] != "Old Well") {
      route[n] = {
        lat: POI[1],
        lng: POI[2],
      };
      n++;
    }
  }
}

/*Author: Alexandra Embree
This function initiates the google map, defines boundaries, and connect
the call to a google cloud account via mapID. This will need to be replaced in the future.
Satellite is the default view.*/
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 44.626129, lng: -63.9229 },
    zoom: 18,
    mapId: "846c23653f3a8525",
    minZoom: 17,
    restriction: {
      latLngBounds: {
        north: 44.6274,
        south: 44.625,
        east: -63.92,
        west: -63.926,
      },
    },
    strictBounds: true,
    mapTypeId: "satellite",
  });

  setMarkers(map);
  setPopupWindows(map);

  //drawing the boundary polygon based on defined array
  const parkBoundary = new google.maps.Polygon({
    paths: parkBoundariesCoordinates,
    strokeColor: "#FFFFFF",
    strokeOpacity: 0.9,
    strokeWeight: 2,
    fillColor: "#96be25",
    fillOpacity: 0.3,
  });

  //drawing the path polyline based on defined array
  const parkPath = new google.maps.Polyline({
    path: route,
    strokeColor: "#FFFFF",
    strokeWeight: 1,
  });

  //Adding the above to the map
  parkBoundary.setMap(map);
  parkPath.setMap(map);
}

/*Author: Alexandra Embree
This function adds markers to the map based on what category they were defined as
above. 
@param map - The google map object defined above.
*/
function setMarkers(map) {
  for (let i = 0; i < POIS.length; i++) {
    const location = POIS[i];

    if (location[3] == "Tree") {
      markers[i] = new google.maps.Marker({
        position: { lat: location[1], lng: location[2] },
        map,
        icon: { url: "tree.png", scaledSize: new google.maps.Size(40, 30) },
        title: location[0],
      });
    } else if (location[3] == "Historical") {
      markers[i] = new google.maps.Marker({
        position: { lat: location[1], lng: location[2] },
        map,
        icon: { url: "museum.png", scaledSize: new google.maps.Size(40, 30) },
        title: location[0],
      });
    } else {
      markers[i] = new google.maps.Marker({
        position: { lat: location[1], lng: location[2] },
        map,
        icon: {
          url: "point-of-interest.png",
          scaledSize: new google.maps.Size(40, 30),
        },
        title: location[0],
      });
    }
  }
  /**
   * Addition authored by: Alexander Mack
   * This section gets the user's location, and creates an icon on the map corresponding
   * to that location.
   */
  // Check that geolocation is enabled
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Append a new marker to the last index of the POI list
      markers[markers.length] = new google.maps.Marker({
        // Init marker information
        position: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        map,
        icon: {
          url: "dot.png",
          scaledSize: new google.maps.Size(10, 10),
        },
        title: "You are here!",
      });
    });
  }
  // If geolocation is disabled, do not run above. Icon will not show,
  // and the map will function as if the function did not exist.
}

/*Author: Alexandra Embree
This function defines popup windows such that when a POI is clicked on the map,
a title with the name appears along with a hyperlinked message to click to learn more.
Furthermore, listeners are added to the popup windows so that if another window is 
opened, the one currently open closes automatically.
@param map - the map object created and populated above.*/
function setPopupWindows(map) {
  var previousInfoWindow = false;
  for (let i = 0; i < markers.length; i++) {
    const infoWindow = new google.maps.InfoWindow({
      content:
        "<h3>" +
        markers[i].title +
        "</h3>" +
        "<a href=\"#'" +
        markers[i].title +
        "'\"> Click here to learn more about the " +
        markers[i].title +
        "!" +
        "</a>",
      ariaLabel: markers[i].title,
    });

    markers[i].addListener("click", () => {
      if (previousInfoWindow) {
        previousInfoWindow.close();
      }
      previousInfoWindow = infoWindow;
      infoWindow.open({
        anchor: markers[i],
        map,
      });
    });
  }
}

window.initMap = initMap;
