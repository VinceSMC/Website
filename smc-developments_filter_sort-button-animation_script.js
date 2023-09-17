document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".sort__button");

    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay for staggered effect (optional)
                let delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.style.transform = "translateX(0)";
                    entry.target.style.opacity = "1";  /* Set the opacity to 100% when in view */
                }, delay);
                observer.unobserve(entry.target); // stop observing this element once it's animated
            }
        });
    });

    buttons.forEach((btn, index) => {
        // Add data-delay for staggered effect (optional)
        btn.dataset.delay = index * 50; // increment delay by 50ms for each item
        observer.observe(btn);
    });
});