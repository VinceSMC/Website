window.addEventListener('load', function() {
    const loader = document.querySelector('.page-loader');
    // Assuming you might toggle visibility via a class in CSS:
    // .page-loader-wrapper.visible > * { visibility: visible; }
    const wrapper = document.querySelector('.page-loader-wrapper');
    if (wrapper) {
        wrapper.classList.add('visible'); // This assumes you have corresponding CSS.
    }

    if (loader) {
        loader.style.opacity = '0';
        loader.addEventListener('transitionend', function onTransitionEnd() {
            this.style.display = 'none';
            this.removeEventListener('transitionend', onTransitionEnd); // Clean up after itself
        });
    }
});
