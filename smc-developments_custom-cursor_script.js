document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.custom-cursor');
    let isScrolling = false;
    let isRafPending = false;

    const BUFFER = 5;  // adjust this value to change how close the cursor needs to be to the edge to hide

    cursor.style.transition = 'background-color 0.1s, opacity 0.1s, transform 0.1s'; // Quicker animation

    function getBackgroundColor(el) {
        const bgColor = window.getComputedStyle(el).backgroundColor;
        if (bgColor !== 'transparent' && bgColor !== 'rgba(0, 0, 0, 0)') {
            return bgColor;
        } else if (el.parentElement) {
            return getBackgroundColor(el.parentElement);
        }
        return 'white';
    }

    document.addEventListener('mousemove', function(e) {
        if (isRafPending) return;

        isRafPending = true;

        window.requestAnimationFrame(() => {
            handleMouseMove(e);
            isRafPending = false;
        });
    });

    function handleMouseMove(e) {
        const visibleTop = window.scrollY;
        const visibleBottom = window.scrollY + window.innerHeight;

        if (e.pageX <= BUFFER || e.pageX >= window.innerWidth - BUFFER || e.pageY - visibleTop <= BUFFER || e.pageY >= visibleBottom - BUFFER) {
            cursor.style.opacity = 0;
            cursor.style.transform = 'translate(-50%, -50%) scale(0)';
            return;
        }

        if (isScrolling) {
            cursor.style.opacity = 1;
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            isScrolling = false;
        }

        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';

        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (!el) return;

        if (el.classList.contains('is--clickable')) {
            cursor.style.backgroundColor = '#3863ff';
        } else {
            const bgColor = getBackgroundColor(el);
            const rgb = bgColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

            if (!rgb) return;

            const [r, g, b] = [parseInt(rgb[1]), parseInt(rgb[2]), parseInt(rgb[3])];
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;

            if (brightness > 128) {
                cursor.style.backgroundColor = '#12141d';
            } else {
                cursor.style.backgroundColor = 'white';
            }
        }
    }

    document.addEventListener('scroll', function() {
        isScrolling = true;
        cursor.style.opacity = 0;
        cursor.style.transform = 'translate(-50%, -50%) scale(0)';
    }, { passive: true }); // Improved scroll performance
});
