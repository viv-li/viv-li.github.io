
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

document.querySelectorAll('.filter').forEach((function(filter) {
	filter.addEventListener('click', (function(event) {
		document.getElementById('portfolio').scrollIntoView(true, {behavior: "smooth"});
	}).bind(this));
}).bind(this));