document.addEventListener('DOMContentLoaded', function() {
    const loader = document.querySelector('.page-loader-wrapper');

    // Immediately exit if the loader doesn't exist
    if (!loader) return;

    // Ensure the content is initially hidden as specified in your CSS,
    // so there's no need to change visibility through JS for .page-loader-wrapper > * 

    // Start the fade-out effect
    loader.style.opacity = '0';

    // Listen for the end of the transition to then completely hide the loader
    loader.addEventListener('transitionend', function handleTransitionEnd(event) {
        // Ensure the event is for the opacity transition to avoid handling other transitions
        if (event.propertyName === 'opacity') {
            loader.style.display = 'none';
            loader.removeEventListener('transitionend', handleTransitionEnd); // Clean up after the transition
        }
    });
});
