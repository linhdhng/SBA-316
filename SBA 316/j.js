// Cache at least one element using selectElementById.
// Cache at least one element using querySelector or querySelectorAll.
// Use the parent-child-sibling relationship to navigate between elements at least once (firstChild, lastChild, parentNode, nextElementSibling, etc.)
// Iterate over a collection of elements to accomplish some task.
//Create at least one element using createElement.
// Use appendChild and/or prepend to add new elements to the DOM.
// Use the DocumentFragment interface or HTML templating with the cloneNode method to create templated content. 
// Modify the HTML or text content of at least one element in response to user interaction using innerHTML, innerText, or textContent.
// Modify the style and/or CSS classes of an element in response to user interactions using the style or classList properties.
// Modify at least one attribute of an element in response to user interaction.
// Register at least two different event listeners and create the associated event handler functions.
// Use at least two Browser Object Model (BOM) properties or methods.
// Include at least one form and/or input with HTML attribute validation.
// Include at least one form and/or input with DOM event-based validation. (This can be the same form or input as the one above, but should include event-based validation in addition to the HTML attribute validation.)
// Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit).

// Cache at least one element using selectElementById.
// Cache at least one element using querySelector or querySelectorAll.
// Use the parent-child-sibling relationship to navigate between elements at least once (firstChild, lastChild, parentNode, nextElementSibling, etc.)
// Iterate over a collection of elements to accomplish some task.
//Create at least one element using createElement.
// Use appendChild and/or prepend to add new elements to the DOM.
// Use the DocumentFragment interface or HTML templating with the cloneNode method to create templated content. 
// Modify the HTML or text content of at least one element in response to user interaction using innerHTML, innerText, or textContent.
// Modify the style and/or CSS classes of an element in response to user interactions using the style or classList properties.
// Modify at least one attribute of an element in response to user interaction.
// Register at least two different event listeners and create the associated event handler functions.
// Use at least two Browser Object Model (BOM) properties or methods.
// Include at least one form and/or input with HTML attribute validation.
// Include at least one form and/or input with DOM event-based validation. (This can be the same form or input as the one above, but should include event-based validation in addition to the HTML attribute validation.)
// Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit).

function cardCarousel3d(carousels){
    var rotateHandler = function(evt) {
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
    for(var i = 0; i < carousels.length; i++) {
        let carousel = carousels[i];
        let inner = carousel.querySelector('.inner-carousel');
        let cards = carousel.querySelectorAll('.inner-carousel > div');
        var size = cards.length;
        var btnLeft = carousel.querySelector('.button-spin.counterclockwise');
        if(btnLeft !== null) {
            btnLeft.addEventListener("click", rotateHandler, false);
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
                child.addEventListener("click", function() {
                    if (this.id === 'signature') {
                      alert('You got the GOLDEN CARD!');
                    }
                    rotateHandler.call(this); // Call rotateHandler after the alert
                    }, false);
            } else if (zz === 360 - ry || zz === 0 - ry) {
                child.classList.add('counterclockwise');
                child.addEventListener("click", rotateHandler, false);
            }
        }
    }
}
  
  cardCarousel3d(document.querySelectorAll('.card-carousel'));

