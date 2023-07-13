/*
estore.js

Purpose/Work Done: This is the javascript page for our e-store page. This script file is called in the
header of all our e-commerce pages.
This file is use to make our cart page functional. It keeps track of all the items present in the 
shopping cart. This also calculates the final price that the user has to pay. It can update the price 
if the user changes the quantity of items, remove or add items to cart while shopping. After the user is
done shopping, they can checkout which will clear their account and prompt them to go back to the estore 
page again.
We do not have our database ready yet, but once we do, this script file will be used to store the items
the user wants on the database. When the user adds an item to cart from any of the shopping cart pages,
the item will be stored on the database. Then we will get the information on the database and update our cart
accordingly. That is still a work in progress as we havent initialed our database yet.

Author: Rahabar Mahmud

*/


//it checks if the page has been loaded yet, if everything is loaded, then it calls the ready function
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

/**
 * The ready function. This function is called when the body is loaded.
 * This function calls the remove cart item function when the remove button is clicked.
 * It calls the quantity changed function to check the quantity of each item
 * It calls the add to cart function when something new is added to cart
 * Author: Rahabar Mahmud (A00446187)
 */
function ready() {

  //this checks if the remove item from cart button has been clicked. It calls the remove cart item function
  var removeCartItemButtons = document.getElementsByClassName("btn-close");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  //it checks if the quantity of all the items in the cart is set properly. It calls the quantity change function
  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  //it checks if an item is being added to the cart. It calls the add to cart function
  var addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  
  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
}

/**
 * THis function is used to check on the quantity of each item added to cart. This function
 * also makes sure that the quanity of each item cannot be set to anything less than 1.
 * @param {*} event changing of the quantity
 * 
 * Author: Rahabar Mahmud
 */
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

/**
 * This is a simple function that is used to remove the items from the rows.
 * It removes the entire row by removing the parent element of the row which contains
 * all the items information.
 * It then calls the update cart total function to calculate the total
 * 
 * @param {*} event the clicking of the remove button
 * 
 * Author: Rahabar Mahmud
 */
function removeCartItem(event) {
  var buttonClicked = event.target;

  //removing the rows
  buttonClicked.parentElement.parentElement.remove();

  //updating cart
  updateCartTotal();
}

/**
 * This is the function used to ugrade the price of the items in the cart.
 * It uses a simple for loop that iterates through all the items in the cart and adds
 * up their prices. It uses the class name of the cart item and the row they are in.
 * It also checks for the quantity of each item selected by the user. The quantity box can be
 * updated and the cart total will increase as well. Then it finally displays the total 
 * price of the items in the cart to the user.
 * 
 * Author: Rahabar Mahmud
 */
function updateCartTotal() {
  //setting up variables for cart item and row of the item
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0; //initializing total to be 0

  //the for loop to go through all the items
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement =
      cartRow.getElementsByClassName("cart-quantity-input")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));

    //the price of the item
    var quantity = quantityElement.value;

    //finding the new total
    total = total + price * quantity;
  }
  //rounding up the results and printing them
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}


/**
 * This function is called when the checkout button is called. It uses a while loop to
 * empty all the items in the shopping cart. It then updates the cart again by the
 * update cart function to show the new price of the empty cart, which would now be 0.
 * 
 * Author: Rahabar Mahmud
 */
function purchaseClicked() {
  var cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}


/**
 * This is the add to cart function. When the user adds an item to the cart from any of the
 * page on our website, this function will check where the item has been added to cart from and
 * then call the add Item to cart function. This function is not completely functional yet as we have
 * yet to design a database for our project. Once we the database, then this function will store
 * the item details on the database and then we can use to call the add item to cart function.
 * This also calls the update cart total function to update the total cart price.
 * 
 * Authors: Rahabar Mahmud
 * @param {*} event 
 */
function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

/**
 * This is the function that is responsible to add the items to the cart. It then creates
 * a row on our cart table and then displays the item that our customer has added to cart.
 * We have the image of the item, it's name, price, quantity changer and a remove item button
 * for each of the item on the list.
 * @param {*} title it gets the class-title of the image from the addToCartClicked function
 * @param {*} price it gets the class price of the image from the addToCartClicked function
 * @param {*} imageSrc it gets the image source of the image from the addToCartClicked function
 * @returns  if the user tries to add an item when its already added to the cart, it prompts
 * a message saying that the item is already added to cart.
 * 
 * Author: Rahabar Mahmud
 */
function addItemToCart(title, price, imageSrc) {

  //creating variable for table row which we will append to our table
  var cartRow = document.createElement("tr");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];

  //variable for the item title
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");

  //checking if the item already exists in the cart
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }

  //the html for adding the row of items to the table
  var cartRowContents = `
   
        <td><img class="cart-item-image" src="${imageSrc}" alt=""></td>
        <td><span class="cart-item-title">${title}</span></td>
        <td><span class="cart-price cart-column">${price}</span></td>
        <td><input class="cart-quantity-input" type="number" value="1"></td>
        <td><button type="button" class="btn-close">Remove Item</button></td>
        `;
  cartRow.innerHTML = cartRowContents;

  //appending the item to the cart row
  cartItems.append(cartRow);

  //adding the remove button
  cartRow
    .getElementsByClassName("btn-close")[0]
    .addEventListener("click", removeCartItem);

  //appending the quantity changer
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

//the popup that is used when the user checks out
let popup = document.getElementById('popup');

/**
 * This function is used to add the the class open-popup to our pop-up div.
 * I have added some css in the css file for the class open-popup. It makes the
 * pop-up scale in size and animate itself to the center of the page.
 * The pop was initially scaled down to 0.1 and was hidden under the menu bar
 * The user can then click the button on the popup to go back to the main estore page.
 * 
 * Author: Rahabar Mahmud
 */
function openPopup(){
  popup.classList.add('open-popup');
}

/**
 * This function is used to remove the open-popup class from our pop-up div. It will make our
 * popup scale back to 0.1 and go and hide itself under the menubar again until the user checksout again.
 * 
 * Author: Rahabar Mahmud
 */
function closePopup(){
  popup.classList.remove('open-popup');
}