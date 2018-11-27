/* global Modernizr, mixitup */

document.body.classList.add('js-loading');

var elMixGrid = document.getElementById('portfolio-mix-grid');

var mixer = mixitup(elMixGrid);
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