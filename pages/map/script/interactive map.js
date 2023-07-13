//  Purpose: Interactive map by using the static image provided of the preservation
//  Authors: 
//  Zilong Wang  - functions content, structure
//  Brandon Watson - functions content, structure

/*
Description: This is the javascript page for our e-store page. This script file is called in the
header of all our map page. This file is to ensure the map page is interactive for all users.
When user move their coursor over or out of the marker. There will be a different respond from page
When user move their mouse over the markers, the brief description box will occur. When they move out,
it will disappear. The most of buttons should be clickable execpt the buttons link to the pages we don't
set up.(because of time or group decision) When users click the markers, the detailed description 
box will pop out.
*/
var myTimeout; /* timer variable*/
var slideIndex = 1;/* used in slide show change*/


/* the part below is about the common functions which will be used in so many times*/
/* This is a function. Hide all the things which should be hidden, like the description boxes*/
function setup(){
  description_cleaner();
  const image = Array.from(document.getElementsByClassName("second_image"));
  image.forEach(box => {
    box.style.display = "none";
  });
}

/* This is a function that set a timer to ensure the brief description boxes don't 
 immediately disappear when they move out the mouse from markers.
 when time is up, the corresponding brief description boxes will be
 hidden again.
 */
function timer(id){
  myTimeout = setTimeout(function(){invisible(id)}, 1000);
}

/* This is a function that clear the timer is runnung when user move their mouse to the 
brief description boxes, So user have the chance to do something
over the brief description boxes */
function description_cleaner(){
  const boxes = Array.from(document.getElementsByClassName("infowin"));
  boxes.forEach(box => {
    box.style.display = "none";
  });
}

/* This is a function that Change the markers' color from red to white, When user's mouse
move out. */
function marker_color_cleaner(){
  const markers = Array.from(document.getElementsByClassName("bi bi-geo-alt-fill mywid"));
  markers.forEach(box => {
    box.style.color = "white";
  });
}

/* This is a function that hide corresponding boxes by id */
function invisible(id){
  document.getElementById(id).style.display = "none";
}

/* This is a function that display corresponding boxes by id */
function visible(id){
  document.getElementById(id).style.display = "inline";
}

/* This is a function that redirect to Google map version */
function change_mode(){
  document.location = "./google_map.html";
}






/* the part below is about the functions about marker and description parts*/

/* marker 1*/
/* This is a function. When user move mouse or cursor over marker1, the marker will 
 have a bounce effect and the corresponding brief description 
 boxes will occur*/ 
function moveover_marker1(){
  let x = document.getElementById("marker1");
  x.classList.add("bounce");
  let y = document.getElementById("description1")?.id;
  setTimeout(function(){x.classList.remove("bounce")}, 500);
  description_cleaner();
  visible(y);
  clearTimeout(myTimeout);
}  

/*This is a function. When user move out their mouses or cursors from marker1, a timer will
be set; Once time is up, hide the brief description boxes*/  
function moveout_marker1(){
  let x = document.getElementById("marker1");
  let y = document.getElementById("description1")?.id;
  timer(y);
  slideIndex = 1;
}

/* This is a function. When user move mouse or cursor over description, the timer will be clear*/ 
function moveover_description1(){
  clearTimeout(myTimeout);
} 

/* This is a function. When user move mouse or cursor out from description box, hide the description box*/ 
function moveout_description1(){
  let x = document.getElementById("description1")?.id;
  invisible(x);
}





/* marker 2*/
/* This is a function. When user move mouse or cursor over marker2, the marker will 
 have a bounce effect and the corresponding brief description 
 boxes will occur*/ 
function moveover_marker2(){
  let x = document.getElementById("marker2");
  x.classList.add("bounce");
  let y = document.getElementById("description2")?.id;
  setTimeout(function(){x.classList.remove("bounce")}, 500);
  description_cleaner();
  visible(y);
  clearTimeout(myTimeout);
}    

/* This is a function. When user move out their mouses or cursors from marker2, a timer will
be set; Once time is up, hide the brief description boxes*/
function moveout_marker2(){
  let x = document.getElementById("marker2");
  let y = document.getElementById("description2")?.id;
  timer(y);
  slideIndex = 1;
}

/* This is a function. When user move mouse or cursor over description, the timer will be clear*/  
function moveover_description2(){
  clearTimeout(myTimeout);
}

/* This is a function. When user move mouse or cursor out from description box, hide the description box*/ 
function moveout_description2(){
  let x = document.getElementById("description2")?.id;
  invisible(x);
}

/* This is a function. It is the function called by the "next" and "previous" button,
Only two pictures on slide show. When user click "next" button in the last picture,
it will back to the first picture.When user click "pre" button in the first picture,
it will back to the last picture*/ 
function slideCount2(n){
  slideIndex = slideIndex + n;
  if(slideIndex < 1){slideIndex = 2;}
  if(slideIndex > 2){slideIndex = 1;}
  console.log(slideIndex);
  slideshow2(slideIndex);
}

/* This is a function. Display corresponding picture after click*/ 
function slideshow2(n){
    if(n == 1){
      document.getElementById("slideshow_image2A").style.display="block";
      document.getElementById("slideshow_image2B").style.display="none";
    }else if(n == 2){
      document.getElementById("slideshow_image2A").style.display="none";
      document.getElementById("slideshow_image2B").style.display="block";
    }
}
   


/* marker 3*/
 /* This is a function. When user move mouse or cursor over marker3, the marker will 
have a bounce effect and the corresponding brief description 
boxes will occur*/  
function moveover_marker3(){
  let x = document.getElementById("marker3");
  let y = document.getElementById("description3")?.id;
  x.classList.add("bounce");
  setTimeout(function(){x.classList.remove("bounce")}, 500);
  description_cleaner();
  visible(y);
  clearTimeout(myTimeout);
}  

/*This is a function. When user move out their mouses or cursors from marker3, a timer will
be set; Once time is up, hide the brief description boxes*/
function moveout_marker3(){
  let x = document.getElementById("marker3");
  let y = document.getElementById("description3")?.id;
  timer(y);
}

/* This is a function. When user move mouse or cursor over description, the timer will be clear*/
function moveover_description3(){
  clearTimeout(myTimeout);
  
}

/* This is a function. When user move mouse or cursor out from description box, hide the description box*/ 
function moveout_description3(){
  let x = document.getElementById("description3")?.id;
  invisible(x);
}

/* This is a function. It is the function called by the "next" and "previous" button,
Only two pictures on slide show. When user click "next" button in the last picture,
it will back to the first picture.When user click "pre" button in the first picture,
it will back to the last picture*/ 
function slideCount3(n){
  slideIndex = slideIndex + n;
  if(slideIndex < 1){slideIndex = 2;}
  if(slideIndex > 2){slideIndex = 1;}
  console.log(slideIndex);
  slideshow3(slideIndex);
  
}

/* This is a function. display corresponding picture after click*/ 
function slideshow3(n){
    if(n == 1){
      document.getElementById("slideshow_image3A").style.display="block";
      document.getElementById("slideshow_image3B").style.display="none";
    }else if(n == 2){
      document.getElementById("slideshow_image3A").style.display="none";
      document.getElementById("slideshow_image3B").style.display="block";
    }
}



/* marker 4*/
/* This is a function. When user move mouse or cursor over marker4, the marker will 
have a bounce effect and the corresponding brief description 
boxes will occur*/ 
function moveover_marker4(){
  let x = document.getElementById("marker4");
  let y = document.getElementById("description4")?.id;
  x.classList.add("bounce");
  setTimeout(function(){x.classList.remove("bounce")}, 500);
  description_cleaner();
  visible(y);
  clearTimeout(myTimeout);
}    

/* This is a function. When user move out their mouses or cursors from marker4, a timer will
be set; Once time is up, hide the brief description boxes*/
function moveout_marker4(){
  let x = document.getElementById("marker4");
  let y = document.getElementById("description4")?.id;
  timer(y);
}

/*This is a function. When user move mouse or cursor over description, the timer will be clear*/
function moveover_description4(){
  clearTimeout(myTimeout);
  
}
/* This is a function. When user move mouse or cursor out from description box, hide the description box*/ 
function moveout_description4(){
  let x = document.getElementById("description4")?.id;
  invisible(x);
}

/* This is a function. It is the function called by the "next" and "previous" button,
Only two pictures on slide show. When user click "next" button in the last picture,
it will back to the first picture.When user click "pre" button in the first picture,
it will back to the last picture*/ 
function slideCount4(n){
  slideIndex = slideIndex + n;
  if(slideIndex < 1){slideIndex = 2;}
  if(slideIndex > 2){slideIndex = 1;}
  console.log(slideIndex);
  slideshow4(slideIndex);
  
}

/* This is a function. display corresponding picture after click*/ 
function slideshow4(n){
    if(n == 1){
      document.getElementById("slideshow_image4A").style.display="block";
      document.getElementById("slideshow_image4B").style.display="none";
    }else if(n == 2){
      document.getElementById("slideshow_image4A").style.display="none";
      document.getElementById("slideshow_image4B").style.display="block";
    }
}



/* marker 5*/
 /* This is a function. When user move mouse or cursor over marker5, the marker will 
have a bounce effect and the corresponding brief description 
boxes will occur*/   
function moveover_marker5(){
  let x = document.getElementById("marker5");
  let y = document.getElementById("description5")?.id;
  x.classList.add("bounce");
  setTimeout(function(){x.classList.remove("bounce")}, 500);
  description_cleaner();
  visible(y);
  clearTimeout(myTimeout);
}  

/* This is a function. When user move out their mouses or cursors from marker5, a timer will
be set; Once time is up, hide the brief description boxes*/
function moveout_marker5(){
  let x = document.getElementById("marker5");
  let y = document.getElementById("description5")?.id;
  timer(y);
}
/* This is a function. When user move mouse or cursor over description, the timer will be clear*/
function moveover_description5(){
  clearTimeout(myTimeout);
  
}

/*This is a function. When user move mouse or cursor out from description box, hide the description box*/ 
function moveout_description5(){
  let x = document.getElementById("description5")?.id;
  invisible(x);
}


/* This is a function. It is the function called by the "next" and "previous" button,
Only two pictures on slide show. When user click "next" button in the last picture,
it will back to the first picture.When user click "pre" button in the first picture,
it will back to the last picture*/ 
function slideCount5(n){
  slideIndex = slideIndex + n;
  if(slideIndex < 1){slideIndex = 2;}
  if(slideIndex > 2){slideIndex = 1;}
  console.log(slideIndex);
  slideshow5(slideIndex);
  
}

/* This is a function. display corresponding picture after click*/ 
function slideshow5(n){
    if(n == 1){
      document.getElementById("slideshow_image5A").style.display="block";
      document.getElementById("slideshow_image5B").style.display="none";
    }else if(n == 2){
      document.getElementById("slideshow_image5A").style.display="none";
      document.getElementById("slideshow_image5B").style.display="block";
    }
}




/* marker 6*/
/* This is a function. When user move mouse or cursor over marker6, the marker will 
have a bounce effect and the corresponding brief description 
boxes will occur*/   
function moveover_marker6(){
  let x = document.getElementById("marker6");
  let y = document.getElementById("description6")?.id;
  x.classList.add("bounce");
  setTimeout(function(){x.classList.remove("bounce")}, 500);
  description_cleaner();
  visible(y);
  clearTimeout(myTimeout);
}   


/*This is a function. When user move out their mouses or cursors from marker6, a timer will
be set; Once time is up, hide the brief description boxes*/
function moveout_marker6(){
  let x = document.getElementById("marker6");
  let y = document.getElementById("description6")?.id;
  timer(y);
}


/* This is a function. When user move mouse or cursor over description, the timer will be clear*/
function moveover_description6(){
  clearTimeout(myTimeout);
  
}
/* This is a function. When user move mouse or cursor out from description box, hide the description box*/ 
function moveout_description6(){
  let x = document.getElementById("description6")?.id;
  invisible(x);
}






/* marker 7*/
/*This is a function. When user move mouse or cursor over marker7, the marker will 
have a bounce effect and the corresponding brief description 
boxes will occur*/  
function moveover_marker7(){
  let x = document.getElementById("marker7");
  let y = document.getElementById("description7")?.id;
  x.classList.add("bounce");
  setTimeout(function(){x.classList.remove("bounce")}, 500);
  description_cleaner();
  visible(y);
  clearTimeout(myTimeout);
}    

/* This is a function. When user move out their mouses or cursors from marker7, a timer will
be set; Once time is up, hide the brief description boxes*/
function moveout_marker7(){
  let x = document.getElementById("marker7");
  let y = document.getElementById("description7")?.id;
  timer(y);
}

/* This is a function. When user move mouse or cursor over description, the timer will be clear*/
function moveover_description7(){
  clearTimeout(myTimeout);
  
}

/* This is a function. When user move mouse or cursor out from description box, hide the description box*/ 
function moveout_description7(){
  let x = document.getElementById("description7")?.id;
  invisible(x);
}

/* This is a function. It is the function called by the "next" and "previous" button,
Only two pictures on slide show. When user click "next" button in the last picture,
it will back to the first picture.When user click "pre" button in the first picture,
it will back to the last picture*/ 
function slideCount7(n){
  slideIndex = slideIndex + n;
  if(slideIndex < 1){slideIndex = 2;}
  if(slideIndex > 2){slideIndex = 1;}
  console.log(slideIndex);
  slideshow7(slideIndex);
  
}

/* This is a function. display corresponding picture after click*/ 
function slideshow7(n){
    if(n == 1){
      document.getElementById("slideshow_image7A").style.display="block";
      document.getElementById("slideshow_image7B").style.display="none";
    }else if(n == 2){
      document.getElementById("slideshow_image7A").style.display="none";
      document.getElementById("slideshow_image7B").style.display="block";
    }
}


/* marker 8*/
/* This is a function. When user move mouse or cursor over marker8, the marker will 
have a bounce effect and the corresponding brief description 
boxes will occur*/ 
function moveover_marker8(){
  let x = document.getElementById("marker8");
  let y = document.getElementById("description8")?.id;
  x.classList.add("bounce");
  setTimeout(function(){x.classList.remove("bounce")}, 500);
  description_cleaner();
  visible(y);
  clearTimeout(myTimeout);
}     


/* This is a function. When user move out their mouses or cursors from marker8, a timer will
be set; Once time is up, hide the brief description boxes*/
function moveout_marker8(){
  let x = document.getElementById("marker8");
  let y = document.getElementById("description8")?.id;
  timer(y);
}

/* This is a function. When user move mouse or cursor over description, the timer will be clear*/
function moveover_description8(){
  clearTimeout(myTimeout);
  
}

/* This is a function. When user move mouse or cursor out from description box, hide the description box*/ 
function moveout_description8(){
  let x = document.getElementById("description8")?.id;
  invisible(x);
}


/* marker 9*/
/* This is a function. When user move mouse or cursor over marker9, the marker will 
have a bounce effect and the corresponding brief description 
boxes will occur*/  
function moveover_marker9(){
  let x = document.getElementById("marker9");
  let y = document.getElementById("description9")?.id;
  x.classList.add("bounce");
  setTimeout(function(){x.classList.remove("bounce")}, 500);
  description_cleaner();
  visible(y);
  clearTimeout(myTimeout);
}       


/* This is a function. When user move out their mouses or cursors from marker9, a timer will
be set; Once time is up, hide the brief description boxes*/
function moveout_marker9(){
  let x = document.getElementById("marker9");
  let y = document.getElementById("description9")?.id;
  timer(y);
}


/* This is a function. When user move mouse or cursor over description, the timer will be clear*/
function moveover_description9(){
  clearTimeout(myTimeout);
  
}

/* This is a function. When user move mouse or cursor out from description box, hide the description box*/ 
function moveout_description9(){
  let x = document.getElementById("description9")?.id;
  invisible(x);
}

/* This is a function. It is the function called by the "next" and "previous" button,
Only two pictures on slide show. When user click "next" button in the last picture,
it will back to the first picture.When user click "pre" button in the first picture,
it will back to the last picture*/ 
function slideCount9(n){
  slideIndex = slideIndex + n;
  if(slideIndex < 1){slideIndex = 2;}
  if(slideIndex > 2){slideIndex = 1;}
  console.log(slideIndex);
  slideshow9(slideIndex);
  
}

/* This is a function. display corresponding picture after click*/ 
function slideshow9(n){
    if(n == 1){
      document.getElementById("slideshow_image9A").style.display="block";
      document.getElementById("slideshow_image9B").style.display="none";
    }else if(n == 2){
      document.getElementById("slideshow_image9A").style.display="none";
      document.getElementById("slideshow_image9B").style.display="block";
    }
}





/* marker 11*/
/* This is a function. When user move mouse or cursor over marker9, the marker will 
have a bounce effect and the corresponding brief description 
boxes will occur*/  
function moveover_marker11(){
  let x = document.getElementById("marker11");
  let y = document.getElementById("description11")?.id;
  x.classList.add("bounce");
  setTimeout(function(){x.classList.remove("bounce")}, 500);
  description_cleaner();
  visible(y);
  clearTimeout(myTimeout);
}      


/* This is a function. When user move out their mouses or cursors from marker9, a timer will
be set; Once time is up, hide the brief description boxes*/
function moveout_marker11(){
  let x = document.getElementById("marker11");
  let y = document.getElementById("description11")?.id;
  timer(y);
}


/* This is a function. When user move mouse or cursor over description, the timer will be clear*/
function moveover_description11(){
  clearTimeout(myTimeout);
  
}

/* This is a function. When user move mouse or cursor out from description box, hide the description box*/ 
function moveout_description11(){
  let x = document.getElementById("description11")?.id;
  invisible(x);
}

/* This is a function. It is the function called by the "next" and "previous" button,
Only two pictures on slide show. When user click "next" button in the last picture,
it will back to the first picture.When user click "pre" button in the first picture,
it will back to the last picture*/ 
function slideCount11(n){
  slideIndex = slideIndex + n;
  if(slideIndex < 1){slideIndex = 2;}
  if(slideIndex > 2){slideIndex = 1;}
  console.log(slideIndex);
  slideshow11(slideIndex);
  
}

/* This is a function. display corresponding picture after click*/ 
function slideshow11(n){
    if(n == 1){
      document.getElementById("slideshow_image11A").style.display="block";
      document.getElementById("slideshow_image11B").style.display="none";
    }else if(n == 2){
      document.getElementById("slideshow_image11A").style.display="none";
      document.getElementById("slideshow_image11B").style.display="block";
    }
}




/* the part below is about the functions of detailed description box which is located on the left of  map*/


/* This is a function. Detect user's click, if user click the place other than the detailed description box, hide the
detailed description box */ 
function detect_Click(event){
  if (event.target != document.getElementById("detail_block")){
    document.getElementById("detail_block").style.width = "0px";
    marker_color_cleaner();
  } else{
   
  }
}


/*This is a function. Some places don't have enough information; When users click these markers,
  they will pop up alert */ 
function empty_tips() {
  window.alert("No extra information for this location, try others!")
  }


// Detect when marker on the map is clicked
/*This is a function. When user click marker2 , the detailed description box will get corresponding information,
the picture and location's name will be change */ 
function marker2_click(){
  document.getElementById("detail_block").style.width = "300px";
  document.getElementById("picture_part").src="../resources/image/hazelnut tree1.jpg";
  document.getElementById("location_name").innerHTML = "Hazelnut tree";
  document.getElementById("introduction").innerHTML = "A Hazelnut tree is here!";
  marker_color_cleaner();
  document.getElementById("marker2").style.color = "red";
  document.getElementById("detail_block").scrollTop = 0;
}

// Detect when marker on the map is clicked
/*This is a function. When user click marker3 , the detailed description box will get corresponding information,
the picture and location's name will be change */ 
function marker3_click(){
  document.getElementById("detail_block").style.width = "300px";
  document.getElementById("picture_part").src="../resources/image/apple tree1.jpg";
  document.getElementById("location_name").innerHTML = "Big apple tree";
  document.getElementById("introduction").innerHTML = "A big apple tree is here!";
  marker_color_cleaner();
  document.getElementById("marker3").style.color = "red";
  document.getElementById("detail_block").scrollTop = 0;
} 

// Detect when marker on the map is clicked
/*This is a function. When user click marker4 , the detailed description box will get corresponding information,
the picture and location's name will be change */ 
function marker4_click(){
  document.getElementById("detail_block").style.width = "300px";
  document.getElementById("picture_part").src="../resources/image/pear tree1.jpg";
  document.getElementById("location_name").innerHTML = "Pear tree";
  document.getElementById("introduction").innerHTML = "A Pear tree is here!";
  marker_color_cleaner();
  document.getElementById("marker4").style.color = "red";
  document.getElementById("detail_block").scrollTop = 0;
}

// Detect when marker on the map is clicked
/*When user click marker5 , the detailed description box will get corresponding information,
the picture and location's name will be change */ 
function marker5_click(){
  document.getElementById("detail_block").style.width = "300px";
  document.getElementById("picture_part").src="../resources/image/Cherry-Honeysuckle Arch1.jpg";
  document.getElementById("location_name").innerHTML = "Cherry-Honeysuckle Arch";
  document.getElementById("introduction").innerHTML = "Cherry-Honeysuckle Arch is here!";
  marker_color_cleaner();
  document.getElementById("marker5").style.color = "red";
  document.getElementById("detail_block").scrollTop = 0;
}

/*This is a function. When user click marker7 , the detailed description box will get corresponding information,
the picture and location's name will be change */ 
function marker7_click(){
  document.getElementById("detail_block").style.width = "300px";
  document.getElementById("picture_part").src="../resources/image/foundation1.jpg";
  document.getElementById("location_name").innerHTML = "Foundation";
  document.getElementById("introduction").innerHTML = "Foundation is here!";
  marker_color_cleaner();
  document.getElementById("marker7").style.color = "red";
  document.getElementById("detail_block").scrollTop = 0;
}

// Detect when marker on the map is clicked
/*This is a function. When user click marker9 , the detailed description box will get corresponding information,
the picture and location's name will be change */
function marker9_click(){
  document.getElementById("detail_block").style.width = "300px";
  document.getElementById("picture_part").src="../resources/image/biggrove1.jpg";
  document.getElementById("location_name").innerHTML = "Big Grove";
  document.getElementById("introduction").innerHTML = "You already entered the Big Grove!";
  marker_color_cleaner();
  document.getElementById("marker9").style.color = "red";
  document.getElementById("detail_block").scrollTop = 0;
} 

// Detect when marker on the map is clicked
/*This is a function. When user click marker11 , the detailed description box will get corresponding information,
the picture and location's name will be change */ 
function marker11_click(){
  document.getElementById("detail_block").style.width = "300px";
  document.getElementById("picture_part").src="../resources/image/apple tree1.jpg";
  document.getElementById("location_name").innerHTML = "Very big apple tree";
  document.getElementById("introduction").innerHTML = "A very very big apple tree, it is bigger than ever before!";
  marker_color_cleaner();
  document.getElementById("marker11").style.color = "red";
  document.getElementById("detail_block").scrollTop = 0;
}

