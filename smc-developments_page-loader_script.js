window.addEventListener('load', function() {
    const wrapper = document.querySelector('.liquid_page-wrapper');

    if (wrapper) {
        // Fade out the wrapper smoothly
        wrapper.style.transition = 'opacity 150ms ease-in-out';
        wrapper.style.opacity = '0';

        // After the transition, hide the wrapper
        setTimeout(() => {
            wrapper.style.display = 'none';
        }, 150); // Matches the transition time
    }
});
