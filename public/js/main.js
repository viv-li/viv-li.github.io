/* global Modernizr, mixitup */

document.body.classList.add('js-loading');

var elMixGrid = document.getElementById('portfolio-mix-grid');
var mixer = mixitup(elMixGrid);

/* Make filter scroll to top when they are clicked */
document.querySelectorAll('.filter').forEach(function(filter) {
	filter.addEventListener('click', function() {
		setTimeout(function () {
      document.getElementById('portfolio').scrollIntoView(true, {behavior: "smooth"});
    }, 300);
	}, Modernizr.passiveeventlisteners ? { passive: true } : false);
});

/* Figure out if this is a touch device */
function hasTouch() {
    return 'ontouchstart' in document.documentElement
           || navigator.maxTouchPoints > 0
           || navigator.msMaxTouchPoints > 0;
}

/* Apply CSS classes to handle hover effects on touch devices or those that don't support hover media queries */
if (!hasTouch()) {
  document.body.classList.add('no-touch');
}  else {
  /* Add event listeners to show/hide portfolio mix overlay on touch devices */
	document.querySelectorAll('.mix').forEach(function(mix) {
    mix.addEventListener('click', function() {
      mix.classList.toggle('odd-touch');
    }, Modernizr.passiveeventlisteners ? { passive: true } : false);
  });

  /* Set timeout for mix buttons click so fill effect happens */
  document.querySelectorAll('.button').forEach(function(button) {
    button.addEventListener('click', function(event) {
      event.stopPropagation(); // Don't undo the overlay
      event.preventDefault();
      var linkUrl = event.target.getAttribute('href');
      setTimeout(function(url) { window.location = url; }, 300, linkUrl);
    });
  });
}

document.body.classList.remove('js-loading');
