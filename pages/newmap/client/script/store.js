/**
 * The purpose of this file is to add the behaviours and animation for the
 * store page.
 *
 * Populate the store page with the items' images and corresponding item
 * name and price.
 *
 * Add the behaviour for the store pop up information panel.
 *
 * Add the behaviour for the cart feature.
 *
 * Author: Agowun Muhammad Altaf (A00448118), shared code from conservation page for the item gallery part
 * Author: Mohak Shrivastava (A00445470), wrote the whole file, and adapted the code shared from the conservation page to store page
 */

// global reference to the store section
const store = document.querySelector("#store");
// global reference to the more information panel background
const moreInfoBackground = document.querySelector("#moreInfoBackground");
// global reference to the more information panel
const moreInfoPanel = moreInfoBackground.querySelector("#moreInfoPanel");
// global reference to the more information panel's header
const moreInfoPanelH1 = moreInfoPanel.querySelector("h1");
// global reference to the more information panel's image
const moreInfoPanelImage = moreInfoPanel.querySelector("#mainImg");
// global reference to the more information panel's other image bar
const moreInfoPanelOtherImg = moreInfoPanel.querySelector("#otherImgs");
// global reference to the more information panel's description
const moreInfoPanelDescription = moreInfoPanel.querySelector("#description");
// global reference to the more information panel's price
const moreInfoPanelPrice = moreInfoPanel.querySelector("#price");
// global reference to the more information panel's item quantity
const moreInfoPanelQuantity = moreInfoPanel.querySelector("#itemQuantity");
// global reference to the more information panel's add to cart button
const moreInfoPanelAddtoCart = moreInfoPanel.querySelector("#addToCart");
// global reference to the cart button
const cartBtn = document.querySelector("#cartBtn");
// global reference to the cart modal
const cart = document.querySelector("#cart");
// global reference to the cart modal
const cartClose = cart.querySelector("#closeCart");
// global reference to the cart modal
const cartPurchase = cart.querySelector("#purcahse");
// global reference to the cart items list
const cartItemList = cart.querySelector("#cartItems");
// global reference to the cart items total price
const cartTotalPrice = cart.querySelector("#totalPrice");

// global store the items id to be use in the cart page and the number of the item
const cartItems = {};
// global store the list of items
let items;
// global store the id of the item being viewed
let itemId;
// global flag to know whether the cart is empty or not
let cartEmpty;

/**
 * get the items to be displayed.
 *
 * Author: Agowun Muhammad Altaf (A00448118), shared code from conservation page
 * Author: Mohak Shrivastava (A00445470), adapted and wrote the code
 */
function fetchItemsData() {
    // fetch the items data
    $.post(`${SERVER_URL}/store/getitems`, (data) => {
        items = data;
        // add the content of the columns
        populateColumns(data);
    });
}

/**
 * add the items images and name to the respective columns.
 *
 * Author: Agowun Muhammad Altaf (A00448118), shared code from conservation page
 * Author: Mohak Shrivastava (A00445470), adapted and wrote the code
 *
 * @param items the item to be displayed
 */
function populateColumns(items) {
    // reference to the columns in the store section
    const columns = store.querySelectorAll(".columns");
    // get the number of columns
    const numColumns = columns.length;

    // animate the images out
    gsap.timeline()
        .to(store.querySelectorAll(".itemContainer"), {
            opacity: 0,
            scale: 0.8,
        })
        .call(() => {
            // remove current images
            columns.forEach((column) => {
                column.innerHTML = "";
            });

            // loop through the items to be added to the screen
            items.forEach((item, i) => {
                // create the div to hold the image, name and price
                const itemContainer = document.createElement("div");
                // add the class for styling the div
                itemContainer.classList.add("itemContainer");

                // create the image wrapper for parallax and link to more info
                const imgWrapper = document.createElement("button");
                // add the class for styling image wrapper
                imgWrapper.classList.add("imgWrapper");

                itemContainer.addEventListener("click", () => {
                    openMoreInfoPanel(item);
                });

                // create the image element for the item
                const itemImg = document.createElement("img");
                // set the image to be the first in the list of images for the item
                itemImg.src = item.imgsURL[0];

                // create the name text to display the name of the item
                const itemName = document.createElement("p");

                // add the name to the div created
                itemName.innerText = item.name;

                // create the price text to display the price of the item
                const itemPrice = document.createElement("p");

                // add the price to the div created
                itemPrice.innerText = `$${Number(item.price).toFixed(2)}`;

                // add the image to the image wrapper for parallax effect
                imgWrapper.appendChild(itemImg);

                // append the image wrapper and item name to a single container
                itemContainer.append(imgWrapper, itemName, itemPrice);

                // append the images to the columns
                columns[i % numColumns].append(itemContainer);

                // set the item container to the initial state for animation
                gsap.set(itemContainer, { opacity: 0, scale: 0.8 });

                // when the image is loaded then animate the container in
                itemImg.onload = () => {
                    // add parallax effect to the images
                    gsap.fromTo(
                        itemImg,
                        {
                            translateY: "-10%",
                        },
                        {
                            scrollTrigger: {
                                trigger: imgWrapper,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true,
                            },
                            translateY: "10%",
                        }
                    );
                    // animate the images into view
                    gsap.to(itemContainer, {
                        opacity: 1,
                        scale: 1,
                    });
                };
            });
        });
}

/**
 * append the number of column for the display dimension.
 *
 * Author: Agowun Muhammad Altaf (A00448118), shared code from conservation page
 * Author: Mohak Shrivastava (A00445470), adapted and wrote the code
 */
function appendColumns() {
    // get the width of the screen
    const windowWidth = window.innerWidth;
    // store the number of columns to be added
    let numColumns = 1;

    // check the width
    if (windowWidth > TABLET_WIDTH) {
        // width greater than the width of a tablet phone
        numColumns = 3;
    } else if (windowWidth > MOBILE_WIDTH) {
        // width greater than the width of a mobile phone
        numColumns = 2;
    }

    // clear the columns already present
    store.innerHTML = "";

    // add the columns
    for (let column = 0; column < numColumns; column++) {
        // create a div for the column
        const newColumn = document.createElement("div");
        // add the styling for the columns
        newColumn.classList.add("columns");
        // add the column to the store section
        store.appendChild(newColumn);
    }

    // fetch the data to be used to populate the columns
    fetchItemsData();
}

// append columns on load
appendColumns();

// re-append the columns if there is a change
window.addEventListener("resize", () => {
    appendColumns();
});

// check if user is on desktop
if (window.innerWidth > TABLET_WIDTH) {
    // user is on desktop enable momentum scrollbar on the more information panel
    Scrollbar.init(moreInfoPanel, {
        damping: 0.1,
        syncCallbacks: true,
    });
}

/**
 * display a panel for more information on the items.
 *
 * Author: Agowun Muhammad Altaf (A00448118), shared code from conservation page
 * Author: Mohak Shrivastava (A00445470), adapted and wrote the code
 *
 * @param data for the item to be dispalyed
 */
function openMoreInfoPanel(data) {
    // update the id of the item being viewed
    itemId = data._id;
    // update the name for the panel
    moreInfoPanelH1.textContent = data.name;
    // update the main image in the panel
    moreInfoPanelImage.src = data.imgsURL[0];
    // set the description for that item
    moreInfoPanelDescription.innerText = data.description;
    // set the price for that item
    moreInfoPanelPrice.innerText = `Price: $${Number(data.price).toFixed(2)}`;
    // set the quantity for that item
    moreInfoPanelQuantity.innerText = `x ${cartItems[itemId] || 0}`;

    // clear the previous images
    moreInfoPanelOtherImg.innerHTML = "";

    // add the images in the list section below the main image
    data.imgsURL.forEach((img, i) => {
        // create the smaller image preview
        const smallImg = document.createElement("img");
        // set the image of the smaller preview
        smallImg.src = img;

        // add the active image class to the first image
        if (i == 0) {
            smallImg.classList.add("activeImg");
        }

        // change the main image with the image the user clicks on
        smallImg.addEventListener("click", () => {
            // remove the hidden on the previous image
            moreInfoPanelOtherImg
                .querySelectorAll("img")
                .forEach((smallImg) => {
                    smallImg.classList.remove("activeImg");
                });

            smallImg.classList.add("activeImg");

            moreInfoPanelImage.src = img;
        });

        // add the small images to the other image preview bar
        moreInfoPanelOtherImg.appendChild(smallImg);
    });

    // set the panel and background to visible
    gsap.set(moreInfoBackground, { display: "flex" });

    // animate the the more information panel background into view
    gsap.timeline()
        .to(moreInfoBackground, {
            opacity: 1,
            duration: 0.3,
            ease: Circ.EaseInOut,
        }) // animate the the more information panel into view
        .fromTo(
            moreInfoPanel,
            { height: 0, duration: 0 },
            {
                height: "90vh",
                duration: 0.4,
                ease: Circ.EaseOut,
            },
            "-=30%"
        );
}

/**
 * add item to both cartItem array and session storage.
 *
 * Author: Mohak Shrivastava (A00445470)
 */
function addItemToCart() {
    if (itemId.length != 0) {
        cartItems[itemId] =
            cartItems[itemId] == null ? 1 : Number(cartItems[itemId]) + 1;
        // set the quantity for that item
        moreInfoPanelQuantity.innerText = `x ${cartItems[itemId] || 0}`;
    }
}

/**
 * remove 1 item to both cartItem array and session storage.
 *
 * Author: Mohak Shrivastava (A00445470)
 */
function decrementItemInCart() {
    if (itemId.length != 0) {
        cartItems[itemId] =
            cartItems[itemId] == null ? 0 : Number(cartItems[itemId]) - 1;

        if (cartItems[itemId] < 0) {
            cartItems[itemId] = 0;
        }

        // set the quantity for that item
        moreInfoPanelQuantity.innerText = `x ${cartItems[itemId] || 0}`;
    }
}

/**
 * close the more information panel.
 *
 * Author: Agowun Muhammad Altaf (A00448118), shared code from conservation page
 * Author: Mohak Shrivastava (A00445470), adapted and wrote the code
 */
function closeMoreInfoPanel() {
    // animate the the more information panel background out of view
    gsap.timeline()
        .to(moreInfoPanel, {
            height: 0,
            duration: 0.4,
            ease: Circ.EaseIn,
        }) // animate the the more information panel out of view
        .to(
            moreInfoBackground,
            {
                opacity: 0,
                duration: 0.3,
                ease: Circ.EaseInOut,
            },
            "-=30%"
        )
        .set(moreInfoBackground, { display: "none" });
}

// add the close on click of the more information panel background
moreInfoBackground.addEventListener("click", () => closeMoreInfoPanel());

// do not close the more information panel if user clicks on the panel itself
moreInfoPanel.addEventListener("click", (event) => {
    // stop the panel from closing
    event.stopPropagation();
});

// open the cart modal
cartBtn.addEventListener("click", () => {
    updateCart();
    if (!cartEmpty) {
        cart.showModal();
    }
});

/**
 * update the content of the cart:
 * update the list of items in the cart pop up and flag whether it is empty or not.
 *
 * Author: Mohak Shrivastava (A00445470)
 */
function updateCart() {
    // set the flag for empty cart to false by default
    cartEmpty = true;
    // empty the content of the cart pop up
    cartItemList.innerHTML = "";

    // loop thought the content of the cart
    for (const [itemID, quantity] of Object.entries(cartItems)) {
        // check if there is at least one quantity in the cart
        if (quantity != 0) {
            // since there is at least one item the cart set the flag for empty cart to false
            cartEmpty = false;
            // get the information for the item
            const item = items.find((el) => el._id == itemID);
            // create a list item for the item
            const row = document.createElement("li");
            // create the text to display the items in the cart
            const itemName = document.createElement("p");
            itemName.innerText = item.name;

            // create the section for item quantity
            const itemManagement = document.createElement("div");
            itemManagement.classList.add("itemManagement");

            // add the input to manage the quantity of the item
            const itemQuantity = document.createElement("input");
            itemQuantity.type = "number";
            itemQuantity.min = 0;
            itemQuantity.max = 10;
            itemQuantity.value = Number(quantity);

            // the total price for the item
            const itemTotalPrice = document.createElement("p");
            itemTotalPrice.innerText = `$${(
                item.price * Number(quantity)
            ).toFixed(2)}`;

            // monitor the change on the quantity for the item
            itemQuantity.onchange = () => {
                // if the item entered by the user is less than 0 set it to 0
                newValue = itemQuantity.value < 0 ? 0 : itemQuantity.value;
                cartItems[itemID] = newValue;

                // update the total price for the item
                itemTotalPrice.innerText = `$${(item.price * newValue).toFixed(
                    2
                )}`;

                // update the total price for all the items in the cart
                updateTotalPrice();
            };

            // append the item to the cart
            itemManagement.append(itemQuantity, itemTotalPrice);
            row.append(itemName, itemManagement);
            cartItemList.append(row);
        }
    }

    // if the empty cart flag remained true then display a warning for it
    if (cartEmpty) {
        cartItemList.innerText = "Cart is empty";
    } else {
        // otherwise update the total price for the cart
        updateTotalPrice();
    }
}

// clase the cart modal
cartClose.addEventListener("click", () => {
    cart.close();
});

// purchase items
cartPurchase.addEventListener("click", () => {
    if (!cartEmpty) {
        if (confirm("Purcahse items")) {
            location.reload();
        }
    }
});

/**
 * calculate the total price for all items in the cart.
 *
 * Author: Mohak Shrivastava (A00445470)
 */
function updateTotalPrice() {
    // the default initial price for the item to be 0
    let totalPrice = 0;

    // loop through the items in the cart
    for (const [itemID, quantity] of Object.entries(cartItems)) {
        // get the item information (to get the price per unit of the item)
        const item = items.find((el) => el._id == itemID);
        // update the total price
        totalPrice += Number(item.price) * Number(quantity);
    }

    // set the cart total price
    cartTotalPrice.innerHTML =
        totalPrice == 0 ? "" : `Total price: $${totalPrice.toFixed(2)}`;
}
