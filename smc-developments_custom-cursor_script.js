document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.custom-cursor');
    let isScrolling = false;
    let isRafPending = false;

    cursor.style.transition = 'background-color 0.2s, opacity 0.3s, transform 0.3s';

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
        const cursorRect = cursor.getBoundingClientRect();

        const maxX = window.innerWidth - cursorRect.width / 2;
        const maxY = window.innerHeight + window.scrollY - cursorRect.height / 2;

        const clampedX = Math.min(Math.max(e.pageX, cursorRect.width / 2), maxX);
        const clampedY = Math.min(Math.max(e.pageY, cursorRect.height / 2 + window.scrollY), maxY);

        cursor.style.left = clampedX + 'px';
        cursor.style.top = clampedY + 'px';

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
        cursor.style.display = 'none';  // Make sure the cursor is hidden across browsers
    }, { passive: true }); 

    // Display the cursor again when moving the mouse
    document.addEventListener('mousemove', function() {
        cursor.style.display = '';
    }, { passive: true });
});
