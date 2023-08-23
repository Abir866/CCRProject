<!--
  Purpose: The html and php scripts in this file used to provide the visible structure and content of the the page for the quiz game.
  Consists embedded styling to provide styles in addition to those provided by the external css file
  Authors / Work Done: 
  Rahabar Mahmud - common menu section, pop up- styling, structure, functionality
  Toufiq Abir Farhan Tufan - Styling, structure, content, functionality of the rest of the sections
  
-->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.google.com/specimen/Inter" />
    
    <!--Linking the thrid party css  custom font libraries from the web-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css" />

    <!--Linking the css files -->
    <link rel="stylesheet" href="../../styles/body.css" />
    <link rel="stylesheet" href="../../styles/nav.css" />
    <link rel="stylesheet" href="../../styles/header.css" />
    <link rel="stylesheet" href="../../styles/footer.css" />
    <link rel="stylesheet" href="../../styles/index.css" />
    <link rel="stylesheet" href="./../../styles/my_css.css" />
    <link rel="stylesheet" href="../../styles/estore.css" />
    <link rel="stylesheet" href="../../styles/cart.css" />
    <!--Linking the third party  css and js libraries from the web where it is found -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css" />
    <link rel="stylesheet" type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    
    <script defer src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
     <!--Linking the third party css and js libraries for custom modal from the web where it is found -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />
    
    <!--Linking the javascript file for functionality of the menu -->
    <script defer src="scripts/main.js"></script>

    <!--Linking the javascript file for functionality of the quiz-->
    <script src="./../../scripts/carousel.js"></script>

    <style>
        .modal a.close-modal {
    position: absolute;
    top: -12.5px;
    right: -12.5px;
    display: none;
    width: 30px;
    height: 30px;
    text-indent: -9999px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAA3hJREFUaAXlm8+K00Acx7MiCIJH/yw+gA9g25O49SL4AO3Bp1jw5NvktC+wF88qevK4BU97EmzxUBCEolK/n5gp3W6TTJPfpNPNF37MNsl85/vN/DaTmU6PknC4K+pniqeKJ3k8UnkvDxXJzzy+q/yaxxeVHxW/FNHjgRSeKt4rFoplzaAuHHDBGR2eS9G54reirsmienDCTRt7xwsp+KAoEmt9nLaGitZxrBbPFNaGfPloGw2t4JVamSt8xYW6Dg1oCYo3Yv+rCGViV160oMkcd8SYKnYV1Nb1aEOjCe6L5ZOiLfF120EjWhuBu3YIZt1NQmujnk5F4MgOpURzLfAwOBSTmzp3fpDxuI/pabxpqOoz2r2HLAb0GMbZKlNV5/Hg9XJypguryA7lPF5KMdTZQzHjqxNPhWhzIuAruOl1eNqKEx1tSh5rfbxdw7mOxCq4qS68ZTjKS1YVvilu559vWvFHhh4rZrdyZ69Vmpgdj8fJbDZLJpNJ0uv1cnr/gjrUhQMuI+ANjyuwftQ0bbL6Erp0mM/ny8Fg4M3LtdRxgMtKl3jwmIHVxYXChFy94/Rmpa/pTbNUhstKV+4Rr8lLQ9KlUvJKLyG8yvQ2s9SBy1Jb7jV5a0yapfF6apaZLjLLcWtd4sNrmJUMHyM+1xibTjH82Zh01TNlhsrOhdKTe00uAzZQmN6+KW+sDa/JD2PSVQ873m29yf+1Q9VDzfEYlHi1G5LKBBWZbtEsHbFwb1oYDwr1ZiF/2bnCSg1OBE/pfr9/bWx26UxJL3ONPISOLKUvQza0LZUxSKyjpdTGa/vDEr25rddbMM0Q3O6Lx3rqFvU+x6UrRKQY7tyrZecmD9FODy8uLizTmilwNj0kraNcAJhOp5aGVwsAGD5VmJBrWWbJSgWT9zrzWepQF47RaGSiKfeGx6Szi3gzmX/HHbihwBser4B9UJYpFBNX4R6vTn3VQnez0SymnrHQMsRYGTr1dSk34ljRqS/EMd2pLQ8YBp3a1PLfcqCpo8gtHkZFHKkTX6fs3MY0blKnth66rKCnU0VRGu37ONrQaA4eZDFtWAu2fXj9zjFkxTBOo8F7t926gTp/83Kyzzcy2kZD6xiqxTYnHLRFm3vHiRSwNSjkz3hoIzo8lCKWUlg/YtGs7tObunDAZfpDLbfEI15zsEIY3U/x/gHHc/G1zltnAgAAAABJRU5ErkJggg==);
}
    </style>

    <title>St. Margeret's Bay Woodland Conservation</title>
</head>

<header>
    <!--Menu section constituting the head of the game page for navigation-->

    <div class="header-container" style="height: 100px">
        <div class="org-name">
            <a class="org-logo" href="/index.html">
                <p><a href="../../index.html">French Village Forest <b>Conservation</b></a></p>
        </div>
        <div class="menu-btn">
            <div class="menu-btn_burger"></div>
            <div id="nav-bar" class="nav-bar">
                <nav>
                    <ul>
                        <li><a href="../../pages/about/about.html">About</a></li>
                        <li><a href="../../pages/ecosystem/ecosystem.html">Ecosystem</a></li>
                        <li><a href="../../pages/map/map.html">Map</a></li>
                        <li><a href="../../pages/burial/burial.html">Burial</a></li>
                        <li><a href="../../pages/quiz/game.php">Quiz</a></li>
                        <li><a href="../../pages/e-commerce/estore.html">Marketplace</a></li>
                        <li><a href="../../pages/geolocation/FV.html">Geolocation</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>


</header>
<!-- main content section - the game body.
     The body tag calls the function that set's up the game as a screen of questions displayed one at a time to the user-->
<body class="bodyQuiz" onload="carousel()">
<!-- Current date and time display from the server as a content of the html -->
<?php
			echo '<div class="timer" style="position:absolute;top:94px;left: 0px;display:initial">';
            # html over written by getcurrent date function ( in quiz.php) with new information of date and time  for display
			echo '<h6 id="datetime" style="color:blue">';
					  
						echo "It's ".date("i, F jS").".<br>";
						echo "Our time is ".date('g:ia').".";
						
          echo '</h6>';
			
			echo '</div>';
			
			?>

    <div class="main-content">

        <!-- A pop up to be displayed at the end of the quiz game in the results screen -->
        <div class="popup" id="popup" style="background-color:white">

            <h3>Thank you for playing!</h3>
            <p style="color:black">Results with correct answer are given below</p>
            <button type="button" onclick="closePopup()">Check Answers</button>
        </div>
        <!--Some textual content for the body of initial screen of the game page-->
        <main>
            <div>
                <article>
                    <h3 style="color:black">
                        Fun play of the Day
                    </h3>

                    <p>
                        Whether you are a explorer or looking for a trip to relax and
                        enjoy with no concerns there. We have got questions for you

                    </p>
                </article>
                <!-- script containing The more information modal's content(some text and link) that uses the third party js library and css for  functioning as a modal for each screen in the game 
                     The script ends by including the quiz. php script that provides functioning of the elements here in game.php that calls it's(script's) functions.-->
                <?php 
                # the class- modal label's the div tag html for modification by js and css of the libraries imported. Once the link to the modal is clocked(info button).The rel:open pseudo selector  open's the modal due to the js library 
                # with the content (html in the div tag labelled as modal)
                # When the close button as part of the modal's content is clicked, the rel:close pesudo attribute, functionalble due to the thrd pary js library, causes it to close the modal
		    echo "
			<div id=\"ex1\" class=\"modal mod\">
			<p class=\"change\"><img src=\"./../../resources/image/poly.jpeg\" width=\"60px\" height=\"70px\" </p>
			<p class=\"txt\" style=\"color:black\">Hint: Please go to the refered link to get hints!.</p>
      <a href=\"./../../pages/ecosystem/ecosystem.html\">Read More to get hint</a><br>
			<a href=\"./../../index.html#idburial\">Skip Quiz and go back to Homepage</a><br>
			<a href=\"#\" rel=\"modal:close\"><button type='button' style='background-color:black;color:grey;'>Close</button></a>
		    </div>
		    
		    
		    <div class='moreinfo'><a href=\"#ex1\"  class='callmod' rel=\"modal:open\" role=\"button\"><img id=\"im\" src=\"./../../resources/image/info.jpeg\"></a></div>";
				
            include("./../../scripts/quiz.php");
			?>
            </div>

        </main>

        <!-- footer section of the game page -->

        <footer class="section-p1" style="display:flex; justify-content: space-between;">
            <div class="col" style="width:25%">
                <h4>Contact Us</h4>
                <p>
                    <strong>Address:</strong> 71 St Pauls Ln, French Village, NS B3Z 4E3
                </p>
                <p><strong>Phone:</strong> 111 222 333/ (+1) 444 555 666</p>
                <p><strong>Hours:</strong> 10:00 - 16:00; Mon - Sat</p>
            </div>

            <div class="col" style="width:25%">
                <h4>Useful Links</h4>
                <a href="#">Quiz</a>
                <a href="#">Sign-in</a>
                <a href="#">MarketPlace</a>
                <a href="#">Map</a>
            </div>

            <div class="col" style="width:25%">
                <div class="follow">
                    <h4>Follow us</h4>
                    <div class="icon">
                        <i class="fab fa-facebook-f"></i>
                        <i class="fab fa-twitter"></i>
                        <i class="fab fa-instagram"></i>
                        <i class="fab fa-pinterest-p"></i>
                        <i class="fab fa-linkedin"></i>
                    </div>
                </div>
            </div>

            <div class="copyright">
                <p>Ⓒ SMU Software Engineering Group F</p>
            </div>
        </footer>

    </div>

</body>



</html>