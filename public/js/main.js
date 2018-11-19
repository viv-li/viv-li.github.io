document.body.classList.add('js-loading');

/* global mixitup */
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
document.querySelectorAll('.filter').forEach((function(filter) {
	filter.addEventListener('click', (function(event) {
		event.preventDefault();
		document.getElementById('portfolio').scrollIntoView(true, {behavior: "smooth"});
	}).bind(this));
}).bind(this));


/* Figure out if this is a touch device */
function hasTouch() {
    return 'ontouchstart' in document.documentElement
           || navigator.maxTouchPoints > 0
           || navigator.msMaxTouchPoints > 0;
}

// Test via a getter in the options object to see if the passive property is accessed
var supportsPassive = false;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassive = true;
    }
  });
  window.addEventListener("testPassive", null, opts);
  window.removeEventListener("testPassive", null, opts);
} catch (e) {}


if (!hasTouch()) {
    document.body.classList.add('not-touch');
} else {
	/* Add event listeners to show/hide portfolio mix overlay on touch devices */
	document.querySelectorAll('.mix').forEach((function(mix) {
		mix.addEventListener('touchstart', (function(event) {
			mix.classList.toggle('odd-touch');
		}).bind(this), supportsPassive ? { passive: true } : false);
	}).bind(this));
}