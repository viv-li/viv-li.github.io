function hasTouch(){return"ontouchstart"in document.documentElement||0<navigator.maxTouchPoints||0<navigator.msMaxTouchPoints}hasTouch()?(document.querySelector(".button").addEventListener("click",function(t){t.preventDefault();var e=t.target.getAttribute("href");setTimeout(function(t){window.open(t,"_blank")},300,e)}),document.querySelector(".back-home").addEventListener("click",function(t){var e;t.preventDefault(),setTimeout(function(t){window.location=t},300,"/")})):document.body.classList.add("no-touch");