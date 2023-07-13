<!DOCTYPE html>
<html>

<head>
  <title></title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link href="../resources/jquery-mobile-theme-203732-0/themes/St_Margaret's_Map.css" rel="stylesheet" />
  <link href="../resources/jquery-mobile-theme-203732-0/themes/St_Margaret's_Map.min.css" rel="stylesheet" />
  <link href="../resources/jquery-mobile-theme-203732-0/themes/jquery.mobile.icons.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile.structure-1.4.5.min.css" />
  <link rel="stylesheet" href="./styles/jquery.mobile-1.4.5.min.css" />
  <link rel="stylesheet" href="./styles/jquery.mobile.structure-1.4.5.min.css" />
  <script src="./jquery-3.6.1.min.js"></script>
  <script src=" ./script/jquery-1.11.1.min.js"></script>
  <script src="./script/jquery.mobile-1.4.5.min.js"></script>
  <link rel="import" href="../../common/menu2.html" />
</head>

<body onload="setup()">
  <div data-role="page">
    <div class="ui-content" id="ui-content">
      <div class="ui-grid-a ui-responsive">
        <div class="ui-block-a ui-responsive">
          <div>
            <!-- <img src="." -->
          </div>
          <div class="form-container">
            <form action="/action_page.php">
              <label for="fname">First name:</label>
              <input type="text" id="fname" name="fname" value="" /><br /><br />
              <label for="lname">Last name:</label>
              <input type="text" id="lname" data-clear-btn="true" name="lname" value="" /><br /><br />
              <label for="email-2">Email:</label>
              <input type="email" data-clear-btn="true" name="email-2" id="email-2" value="" /><br /><br />
              <label for="tel-2">Tel:</label>
              <input type="tel" data-clear-btn="true" name="tel-2" id="tel-2" value="" /><br /><br />
              <p>select burial location</p>
              <br />
              <label for="Pear_tree">Pear_tree</label><br />
              <input type="radio" id="Pear_tree" name="fav_language" value="Apple_tree" />
              <br />
              <label for="hazelnut_tree">Hazelnut tree</label><br />
              <input type="radio" id="hazelnut_tree" name="fav_language" value="hazelnut_tree" checked="checked" />
              <label for="Apple_tree">Apple tree</label><br />
              <input type="radio" id="Apple_tree" name="fav_language" value="Apple_tree" /><br />
              <input type="submit" value="Submit" />
            </form>

            <p>Click the "Submit" button when finish</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>

</html>