/* global Modernizr, mixitup */

document.body.classList.add('js-loading');

var elMixGrid = document.getElementById('portfolio-mix-grid');

var mixer = mixitup(elMixGrid, {
  animation: {
    effects: 'scale stagger(50ms)' // Set a 'stagger' effect for the loading animation
  },
  load: {
    filter: 'none' // Ensure all targets start from hidden (i.e. display: none;)
  }
});

// Add a class to the container to remove 'visibility: hidden;' from targets. This
// prevents any flicker of content before the page's JavaScript has loaded.
elMixGrid.classList.add('mixitup-ready');

// Show all targets in the container

mixer.show()
  .then(function() {
    // Remove the stagger effect for any subsequent operations
    mixer.configure({
      animation: {
        effects: 'scale',
        nudge: 'true'
      }
    });
  });

document.body.classList.remove('js-loading');

/* Make filter scroll to top when they are clicked */
document.querySelectorAll('.filter').forEach(function(filter) {
	filter.addEventListener('click', function() {
		document.getElementById('portfolio').scrollIntoView(true, {behavior: "smooth"});
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
   "click".split(" ").forEach(function(event){
      mix.addEventListener(event, function() {
        mix.classList.toggle('odd-touch');
      }, Modernizr.passiveeventlisteners ? { passive: true } : false);
    });
  });
}