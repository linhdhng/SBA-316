// Use the parent-child-sibling relationship to navigate between elements at least once (firstChild, lastChild, parentNode, nextElementSibling, etc.)
//Create at least one element using createElement.
// Use appendChild and/or prepend to add new elements to the DOM.
// Use the DocumentFragment interface or HTML templating with the cloneNode method to create templated content. 
// Modify the HTML or text content of at least one element in response to user interaction using innerHTML, innerText, or textContent.
// Modify the style and/or CSS classes of an element in response to user interactions using the style or classList properties.
// Modify at least one attribute of an element in response to user interaction.
// Include at least one form and/or input with HTML attribute validation.

function cardCarousel3d(carousels){
    function rotateHandler(evt) { // Create an event handler function to rotate the carousel
        var carousel = this.parentElement;
        if(carousel.classList.contains('card-carousel') === false){
            var carousel = carousel.parentElement;
        }
        
        var rotate_int = parseInt(carousel.dataset.rotateInt || 0);
        if(this.classList.contains('counterclockwise')){
            rotate_int += 1;
        } else if(this.classList.contains('clockwise')){
            rotate_int -= 1;
        }
        carousel.dataset.rotateInt = rotate_int;

        animate_slider(carousel);
    }

    for (var i = 0; i < carousels.length; i++) {
        let carousel = carousels[i];
        let inner = carousel.querySelector('.inner-carousel');
        let cards = carousel.querySelectorAll('.inner-carousel > div'); // Cache element using querySelectorAll
        var size = cards.length;
        var panelSize = inner.clientWidth;
        var translateZ = Math.round((panelSize / 2) / Math.tan(Math.Pi / size)) * 1.7;
        var btnLeft = carousel.querySelector('.button-spin.counterclockwise');
        if(btnLeft !== null) {
            btnLeft.addEventListener("click", rotateHandler, false); // Event listener #1 rotate the carousel on click 
        }
        var btnRight = carousel.querySelector('.button-spin.clockwise');
        if(btnRight !== null) {
            btnRight.addEventListener("click", rotateHandler, false);  
        }
        
        animate_slider(carousel);
    }
    
    function animate_slider(carousel){
        var rotate_int = parseInt(carousel.dataset.rotateInt || 0);
        var inner = carousel.querySelector('.inner-carousel');
        var cards = carousel.querySelectorAll('.inner-carousel > div');
        var size = cards.length;
        var panelSize = inner.clientWidth;
        var translateZ = Math.round( ( panelSize / 2 ) / Math.tan( Math.PI / size ) ) * 1.7;
        var rotateY = 0;
        var ry =  360 / size;
        rotateY = ry * rotate_int;
    
        for(var i = 0; i < size; i++){
            var z = (rotate_int * ry) + (i * ry);
            var child = cards[i];
            child.style.transform = "rotateY(" + z + "deg) translateZ(" + translateZ + "px) rotateY(" + (-z).toString() + "deg)";
            child.classList.remove('clockwise');
            child.classList.remove('front');
            child.classList.remove('counterclockwise');
            child.removeEventListener("click", rotateHandler, false);
            var zz = z % 360;
            if(zz === 0) {
                child.classList.add('front');
            } else if (zz === ry || zz === -360 + ry) {
                child.classList.add('clockwise');
                child.addEventListener("click", function() { // Event listener #2 with handler function to create an alert when the signed card appears
                    let card = this;
                    rotateHandler.call(card) // Call rorateHandler to rotate the carousel first
                    if (card.id === "signature") {// Chose the card with id "signature"
                        setTimeout(function() { // BOM method #1
                            alert('YOU GOT A SIGNED CARD!'); // BOM method #2
                            var userInput = prompt("Do you want to save this card? (Yes/No)");
                            if (userInput !== null && userInput.toLowerCase() === "yes") {
                                // Perform form submission or any action
                                var password = prompt("Enter a new password for secured download:");
                                checkPassword(password); //input with DOM event-based validation.
                            } else {
                                alert("Continue the game.");
                            }
                        }, 1000); // Delay alert
                    }
                }, false);
            } else if (zz === 360 - ry || zz === 0 - ry) {
                child.classList.add('counterclockwise');
                child.addEventListener("click", rotateHandler, false);
            }
        }
    }

    function checkPassword(password) { // Validate the password field
        let valid = false;
        password = password.trim();
    
        if (!isRequired(password)) {
          alert("Password cannot be blank.");
        } else if (!isPasswordSecure(password)) {
          alert("Password must have at least 8 characters that include at least 1 lowercase character, 1 uppercase character, 1 number, and 1 special character in (!@#$%^&*)");
        } else {
          valid = true;
        }
    
        if (valid) {
          alert("Password is valid! Card download successful.");
        }
    }
    
    function isRequired(value) {
        return value.trim() !== '';
    }
    
    function isPasswordSecure(password) {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return pattern.test(password);
    }
}
  
let result = document.querySelectorAll('.card-carousel')
cardCarousel3d(result);


