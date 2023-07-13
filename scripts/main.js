/*
Author: Devon Leigh 
Purpose: This script file contains intilization and functions called in multiple pages of the website, this provides functionality to certain elements depicted below by comments
Contains intilization for the swiper.js javascript library (https://swiperjs.com/)
*/


//sets mobile nav-bar width to 40%
function openNav() {
  document.getElementById("nav-bar").style.width = "40%";
}

//hamburger navbar close, sets mobile nav-bar width to 0%
function closeNav() {
  document.getElementById("nav-bar").style.width = "0%";
}

//constants declared and assigned to certain divs
const menuBtn = document.querySelector(".menu-btn");
const navBar = document.querySelector(".nav-bar");
const mainContent = document.querySelector(".main-content");

//menuOpen default to closed
let menuOpen = false;

//event listener that opens or closes onclick based on current state
menuBtn.addEventListener("click", () => {
  //if the menu is not open and menubtn is clicked, adds open to divs and calls openNav function
  if (!menuOpen) {
    menuOpen = true;
    menuBtn.classList.add("open");
    mainContent.classList.add("open");
    navBar.classList.add("open");
    openNav();
  } 
  //if the menu is open and menubtn is clicked, removes open to divs and calls closeNav function
  else {
    menuOpen = false;
    menuBtn.classList.remove("open");
    navBar.classList.remove("open");
    mainContent.classList.remove("open");
    closeNav();
  }
});

//intilization for the Swiper javascript library for carousel controls
const swiper = new Swiper(".swiper", {
  loop: true,

  // pagination init
  pagination: {
    el: ".swiper-pagination",   
    clickable: true,
  },

  // Optional JS to populate next and previous swiper buttons
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // Optional JS to set an autoplay delay on the pictures
  autoplay: {
    delay: 5000,
  },
});

// Return to top button declaration
let topbutton = document.getElementById("topBtn");


//scrolling down the page causes the button to appear
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    //changes the css to display: block for the button
    topbutton.style.display = "block";
  } else {
    //changes the css to display: none for the button
    topbutton.style.display = "none";
  }
}

// function to return to top of page on button click by resetting position to 0
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0; 
}
