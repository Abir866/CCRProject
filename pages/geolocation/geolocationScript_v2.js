/*
 * This is the main script for the POI tracking of the geolocation app created by group D of
 * Software Engineering CSCI 3428, during the Fall term of 2022.
 * Author: Alexander Mack
 */

$("body").ready(() => {
    // init position data
    var geo = document.getElementById("geo");
    var points = document.getElementById("POI");
    // call navigator.geolocation function
    getLocation();
    // create point of interest fieldset
    listPOIs();


    // check that geolocation is supported by the browser
    function getLocation() {
        if (navigator.geolocation) {
            // calls watchPosition with showPosition as reference
            navigator.geolocation.watchPosition(showPosition);
        } else {
            // will also return false if the user does not accept the
            // "allow this device to use your location" prompt
            geo.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    /**
     * Author: Alexander Mack
     * this function takes the positional data of the user and breaks it into usable data
     * @param {*} position the current position of the user
     * @returns the latitude and longitude of the user
     */
    function showPosition(position) {
        // csv file (read database) loaded here to reduce calls
        // the d3 tag is the call for the d3.js API, in this case using the csv loading function
        d3.csv("pois.csv").then((d) => {
            /*
            // code for creating visible coordinates for user, de-implemented for simplicity
            geo.innerHTML = "Latitude: " + position.coords.latitude
                + "<br>Longitude: " + position.coords.longitude;
            geo.innerHTML += "<br>Accuracy: " + position.coords.accuracy;
            */

            // call testPOI to check if the user is within range of one of the POIs in the database
            testPOI(position.coords, d);

            // action listener for the destination selector with access to database
            $("input:button[id=destButton]").click(() => {
                // send to getDirections functions
                getDirections(position.coords, d);
            });
        });
        return position.coords.latitude, position.coords.longitude;
    }

    /**
     * Author: Alexander Mack
     * This function checks all the POIs against the user's position, and after deciding which POI is closest,
     * prints the distance and direction to the POI.
     * @param {*} pos the user's position
     * @param {*} data the dataset of POIs
     */
    function getDirections(pos, data) {
        // create simple variables from positional data
        var lat = pos.latitude;
        var lon = pos.longitude;
        // the location of matching data
        var loc = 0;
        var checked = $("input:radio[name=location]:checked").val()
        for (var i = 0; i < data.length; i++) {
            if (checked === data[i].name) {
                loc = i;
            }
        }
        document.getElementById("directions").innerHTML = "To get to the "
            + data[loc].name + " go " + calcDist(lat, lon, data[loc].lat, data[loc].lng).toFixed(1) + " meters to the "
            + angleCalc(directionPOI(lat - data[loc].lat, lon - data[loc].lng)) + "!";
    }

    /*
     * Author: Alexander Mack
     * Author notes:
     * 111120 meters per degree lat/long
     * position.coords.accuracy returns accuracy in meters
     * can base the range of each POI as a radius relative
     * to the position of the coords.accuracy return.
     * i.e. if((position) "is within" (x,y) + (base radius)
     * + (accuracy in lat/long)) then (return true)
     * We can also poll the position of every POI in a database this way
     * but will need to prevent overlap of POIs when position accuracy is too
     * large.
     */

   /** 
    * Author: Alexander Mack
    * This function checks the positional data of the user against the positional data
    * in the database, then prints any POIs that the user is within. Known bug: can print multiple
    * POIs if there is overlap between the boundaries.
    * @param {*} pos the positional data of the user
    * @param {*} data the data from the database
    */
    function testPOI(pos, data) {
        // create simplified variables for the user position
        var longi = pos.longitude;
        var lati = pos.latitude
        // create a "boundary" around the POI in 
        var BOUNDS = 10 / 111120;
        // set accuracy in meters
        var ACCURACY = pos.accuracy / 111120;

        // Iterate through the data and check each POI to see if the user is within the boundary box
        // prints a string to the website when the a match is found
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].name, Number(data[i].lng) - BOUNDS - ACCURACY < longi &&
                longi < Number(data[i].lng) + BOUNDS + ACCURACY
                && Number(data[i].lat) - BOUNDS - ACCURACY < lati &&
                lati < Number(data[i].lat) + BOUNDS + ACCURACY)
            if (Number(data[i].lng) - BOUNDS - ACCURACY < longi &&
                longi < Number(data[i].lng) + BOUNDS + ACCURACY
                && Number(data[i].lat) - BOUNDS - ACCURACY < lati &&
                lati < Number(data[i].lat) + BOUNDS + ACCURACY) {
                points.innerHTML = "You have arrived at the " + data[i].name + "! <a href=\"#'" + data[i].name + "'\">Click here</a> to learn more!";
            }
        };
        // send data to next function
        nearestPOI(pos, data);
    }
    /*
     * Author: Alexander Mack
     * Author Note:
     * ((Number(data[i].lng) - longi)^2 + (Number(data[i].lat) - lat)^2)^(1/2)
     * This function gives the magnitude of the distance, scalar, without
     * direction. We can use this to calculate the closest POI to the user's
     * current location and return it. As well, we can return the direction and angle to this POI.
     */

    /**
     * Author: Alexander Mack
     * This function checks the user's position against all known POIs and returns information on the
     * nearest POI to the user's position, in scalar distance and cardinal direction.
     * @param {*} pos The user's positional data
     * @param {*} data The database of positional data of the POIs
     */
    function nearestPOI(pos, data) {
        var longi = pos.longitude;
        var lati = pos.latitude;
        // initialize the distance as the first POI
        var nextPOI = ((Number(data[0].lng) - longi) ** 2 + (Number(data[0].lat) - lati) ** 2) ** (1 / 2);
        // init the index of the "nearest POI"
        var POIint = 0;
        // iterate through the data, starting at the second index, and check for any that are smaller values than
        // the initial distance
        for (var i = 1; i < data.length; i++) {
            var xLong = (Number(data[i].lng) - longi);
            var yLat = (Number(data[i].lat) - lati);
            console.log(((xLong ** 2 + yLat ** 2) ** (1 / 2)));
            // if the distance of the current index is smaller than the current "shortest distance"
            // replace the distance and the index with the new values
            if (((xLong ** 2 + yLat ** 2) ** (1 / 2)) < nextPOI) {
                console.log(data[i].name);
                nextPOI = (xLong ** 2 + yLat ** 2) ** (1 / 2);
                POIint = i;
            }
        }
        console.log(nextPOI);
        // Once iterating is complete, print the nearest POI, the distance to the POI
        document.getElementById("nextPOI").innerHTML = "The next closest point of interest is the " + data[POIint].name
            + ", which is " + (nextPOI * 111120).toFixed(1) + " meters away to the ";
        // Get the angle to the POI
        var angle = directionPOI(Number(data[POIint].lat) - lati, Number(data[POIint].lng) - longi);
        // Print the angle as the cardinal direction and then as an angle off of East
        document.getElementById("nextPOI").innerHTML += angleCalc(angle) + "! (" + angle.toFixed(1) + " degrees from East)";
    }

    /**
     * Author: Alexander Mack
     * Calculates the distance between position 1 and position 2 by performing pythagorean theorem
     * i.e. 
     *              (x2,y2)
     *                    /| 
     *                   / |
     *      (h**2+w**2) /  | (y2-y1) = h
     *         **(1/2) /   | 
     *                /    |
     *        (x1,y1)/_____|
     *               (x2-x1) = w
     * @param {*} lat1 The latitude of the first position
     * @param {*} long1 The longitude of the first position
     * @param {*} lat2  The latitude of the second position
     * @param {*} long2 The longitude of the second position
     * @returns The distance in meters between position 1 and position 2
     */
    function calcDist(lat1, long1, lat2, long2) {
        // the math, converted to meters
        return (((lat1 - lat2) ** 2 + (long1 - long2) ** 2) ** (1 / 2)) * 111120;
    }

    /*
     * Author: Alexander Mack
     * This function should print a list of all POIs in the database into a set of radio buttons,
     * and then when a button is pressed, the direction and distance to that POI will be printed on screen, and tracked.
     */
    function listPOIs() {
        // removes any lingering fieldsets
        // d3 is the API call for d3.js, in this case to select the "fieldset" tag
        d3.select("fieldset").remove();
        // load the database and create a radio button for each POI
        var data = d3.csv("pois.csv").then((data) => {
            // set a variable for the fieldset tag within the div with ID contorls
            var fieldset = d3.select("#controls")
                .append("fieldset");
            // append a legend to the fieldset
            fieldset.append("legend")
                .style("color", "black")
                .html("Select a location to get directions: ");
            // for each POI, append a radio button with appropriate ID and label
            for (var i = 0; i < data.length; i++) {
                fieldset.append("input")
                    .attr("type", "radio")
                    .attr("name", "location")
                    .attr("value", () => {
                        return data[i].name;
                    })
                    .attr("id", () => {
                        return data[i].name;
                    });
                fieldset.append("label")
                    .attr("for", () => {
                        return data[i].name
                    })
                    .style("padding-right", "10px")
                    .html(() => {
                        return data[i].name + "<br>";
                    });
            }
            $("#controls").append(fieldset);
        });
    }

    /*
     * Author: Alexander Mack
     * Author's Note:
     * Math.atan2(y, x) * 180 / Math.PI 
     * this equation converts the distance in (lat, long) to radians, then to degrees
     */

    /**
     * Author: Alexander Mack
     * This function takes two lengths that are perpendicular to each other and calculates
     * the angle required to complete the triangle in radians, and then convert it to degrees.
     * @param {*} y The vertical length
     * @param {*} x The horizontal length
     * @returns the angle to complete the triangle, in degrees
     */
    function directionPOI(y, x) {
        console.log(Math.atan2(1, 0) * 180 / Math.PI);
        return Math.atan2(y, x) * 180 / Math.PI;
    }

    /**
     * Author: Alexander Mack
     * This function returns the cardinal direction based on the given angle based on the Unit Circle, with 0 being East.
     * there are 8 different directions, but can parse any angle from +360 degrees to -360 degrees
     * @param {*} angle the angle, in degrees
     * @returns the cardinal direction
     */
    function angleCalc(angle) {
        switch (true) {
            case (angle > -22.5 && angle < 22.5):
                return "East";
            case (angle < -22.5 && angle > -67.5):
                return "Southeast";
            case (angle < -67.5 && angle > -112.5):
                return "South";
            case (angle < -112.5 && angle > -157.5):
                return "Southwest";
            case (angle < -157.5 && angle > -202.5):
                return "West";
            case (angle < -202.5 && angle > -247.5):
                return "Northwest";
            case (angle < -247.5 && angle > -292.5):
                return "North";
            case (angle < -292.5 && angle > -337.5):
                return "Northeast";
            case (angle < -337.5 && angle > -382.5):
                return "East";
            case (angle > 22.5 && angle < 67.5):
                return "Northeast";
            case (angle > 67.5 && angle < 112.5):
                return "North";
            case (angle > 112.5 && angle < 157.5):
                return "Northwest";
            case (angle > 157.5 && angle < 202.5):
                return "West";
            case (angle > 202.5 && angle < 247.5):
                return "Southwest";
            case (angle > 247.5 && angle < 292.5):
                return "South";
            case (angle > 292.5 && angle < 337.5):
                return "Southeast";
            case (angle > 337.5 && angle < 382.5):
                return "Northeast";
        }
    }


});


