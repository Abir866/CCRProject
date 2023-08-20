<!--
    Index
    Purpose: This will be the main page that the user will see when first loading the website. It will act as the Home Page.
    Author: Justin Lemire (Full document)
-->

<!DOCTYPE html>
<!-- The following 3 items are for the required includes with the websites document_head file, the banner file and navigation bar file. -->
<?php include './common/document_head.php'; ?>
<?php include './common/banner.php'; ?>
<?php include './common/nav.html'; ?>

    <div id="content">
        <h1>The Conservation Site</h1>
        <section>
        <div id="picture">
            <a href="./img/IMG_1813.jpg"> <!-- A link to the displayed image stored on the website host server -->
                <img src="./img/IMG_1813.jpg" alt="Church"> <!-- the displayed image -->
            </a>
        </div>
        <!-- The div for the information that accompanies the preceding image. -->
        <div id="info">
            <h4>St. Paul's</h4>
            <p>When first arriving to the site you will be greeted by a view of St. Paul's church</p>
        </div>
        </section>
        <section>
            <div id="pictureRight">
                <a href="./img/HabitatTypes.jpg"> <!-- A link to the displayed image stored on the website host server -->
                    <img src="./img/HabitatTypes.jpg" alt="Habitat Types"> <!-- the displayed image -->
                </a>
            </div>
            <!-- The div for the information that accompanies the preceding image. -->
            <div id="infoRight">
                <h4>Habitats</h4>
                <p>Located inside the conservation area are many different types of habitats, some of them endangered.</p>
            </div>
        </section>
        <section>
            <div id="picture">
                <a href="./img/FitnessStation.jpg"> <!-- A link to the displayed image stored on the website host server -->
                    <img src="./img/FitnessStation.jpg" alt="Fitness Station"> <!-- the displayed image -->
                </a>
            </div>
            <!-- The div for the information that accompanies the preceding image. -->
            <div id="info">
                <h4>Exercise Area</h4>
                <p>Located near the entrance to the trail system will be an exercise area. It will contain different types of fitness equipment.</p>
            </div>
        </section>
        <h4>Map of location</h4>
        <!-- The following div displays the Google map that was created in main.js to show the location of the conservation area. -->
        <div id="map"></div>
        <!-- 
            The following script calls the initMap function in main.js and passes along the access key to the google maps api to display
            the requested map of the area and allows use of the functions associated with it. 
        -->
        <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_TOKEN&callback=initMap&v=weekly"
      defer
    ></script>
    </div>
</body>

</html>
