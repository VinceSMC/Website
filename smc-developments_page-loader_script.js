window.addEventListener('load', function() {
    const loader = document.querySelector('.page-loader');
    const contentInsideWrapper = document.querySelectorAll('.page-loader-wrapper > *');

    // Make the content inside .liquid_page-wrapper visible
    contentInsideWrapper.forEach(item => {
        item.style.visibility = 'visible';
    });

    if (loader) {
        // Fade out the loader
        loader.style.opacity = '0';

        // After the transition, set display to none for the loader
        setTimeout(() => {
            loader.style.display = 'none';
        }, 200); // Matches the transition time in the CSS
    }
});
