(function() {
    document.addEventListener('DOMContentLoaded', function() {
        tippy('#tooltip-top', {
            animation: 'scale',
            duration: 150,
            arrow: true,
            delay: [0, 50],
            arrowType: 'sharp',
            theme: 'light',
            boundary: 'scrollParent',
            maxWidth: 220,
            interactive: false,
        });

        tippy('#tooltip-top-interactive', {
            animation: 'scale',
            duration: 150,
            arrow: true,
            delay: [0, 50],
            arrowType: 'sharp',
            theme: 'light',
            boundary: 'scrollParent',
            maxWidth: 220,
            interactive: true,
        });

        tippy('.tippy-back', {
            animation: 'scale',
            placement: 'right',
            duration: 150,
            arrow: true,
            delay: [0, 50],
            arrowType: 'sharp',
            theme: 'light',
            boundary: 'scrollParent',
            maxWidth: 220,
            offset: "0, 10",
        });
    });
})();
