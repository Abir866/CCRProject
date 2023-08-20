/*
  Purpose: The purpose of this file is to provide some functions to help with form data in submit_pic.php

  Authors: Gobind Preet Singh
*/

/*
  Purpose: getElementById in three lines below returns the element in the Document object that has the id same as parameter.

  Parameter: it takes one parameter, here they are either 'image', 'file-error', or 'file-name' all of which are a string 
  containing the id of the element to be returned.
*/

// global, image element where you upload image
const imageElement = document.getElementById('image');
// global, dom element where any errors wth uploaded file show up
const fileErr = document.getElementById('file-error');
// global, dom element that displays the uploaded file's name
const fileName = document.getElementById('file-name');

/*
  Purpose: addEventListener adds a function to a html element that runs based on a specific event.

  Parameter: 1. 'change' - a string representing the type of event, in this case the event is when the 
                html element changes
             2. anonymous function executed everytime the event occurs
                Purpose: Change the text of the html element with id 'file-name' to reflect the file uploaded to 'image-element'

                Parameters: none
                
  Author: Gobind Preet Singh
*/

imageElement.addEventListener('change', () => {
    fileName.textContent = this.files[0].name;
});
  
/*
Purpose: This function is used to validate the file type of image

Parameters: None

Return Values: true if the file type of the image is valid and false if the file type is invalid.

Author: Gobind Preet Singh
*/
function ValidateFileType() {
  // regex to denote the correct file type
  regex = new RegExp('\.*\.(jpg|jpeg|png)');

  // check current filename against regex
  if (!regex.test(img.value.split('\\').pop())) {
    // if file type is wrong reflect in fileErr
    fileErr.innerHTML = '<br><br> Please upload files having extensions: <b> jpg, png, jpeg </b> only.';
    return false;
  } else {
    // else let fileErr be empty
    fileErr.innerHTML = '';
    return true;
  }
}