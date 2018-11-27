/* Figure out if this is a touch device */
function hasTouch() {
    return 'ontouchstart' in document.documentElement
           || navigator.maxTouchPoints > 0
           || navigator.msMaxTouchPoints > 0;
}

/* Apply CSS classes to handle hover effects on touch devices or those that don't support hover media queries */
if (!hasTouch()) {
  document.body.classList.add('no-touch');
}  else { /* Set 300ms timeouts for all buttons with CSS fill transition effect */
	/* Main go to website button */
	document.querySelector('.button').addEventListener('click', function(event) {
	  event.preventDefault();
	  var linkUrl = event.target.getAttribute('href');
	  setTimeout(function(url) { window.open(url, '_blank'); }, 300, linkUrl);
	});

	/* Back home button */
	document.querySelector('.back-home').addEventListener('click', function(event) {
	  event.preventDefault();
	  var linkUrl = '/';
	  setTimeout(function(url) { window.location = url; }, 300, linkUrl);
	});
}
