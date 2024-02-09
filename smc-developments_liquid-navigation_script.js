$(document).ready(function() {
    let duration = 400;
    let menuShape = $(".menu_shape");
    let menuShapeBG = $(".menu_shape-bg");
    let menuLinkLiquid = $(".menu_link");
    let currentLink = $(".menu_link.w--current");
    let pageWrapper = $('.liquid_page-wrapper');
    let menuContainer = $(".menu__container");

    // Initial page load settings
    pageWrapper.css('opacity', '1');
    moveShape(currentLink);
    $(".menu_link-bg").css("opacity", "0");
    menuShape.css("opacity", "1");
    setGalleryCurrentIfApplicable(); // Check and set gallery current if applicable

    // Functionality when a menu link is clicked
    menuLinkLiquid.on("click", function(e) {
        e.preventDefault();

        setTimeout(() => {
            window.location = $(this).attr("href");
        }, duration);

        pageWrapper.css('opacity', '0');

        if ($(this).index() > currentLink.index()) {
            menuShape.css("justify-content", "flex-end");
        }

        if (currentLink.index() !== $(this).index()) {
            menuShapeBG.css("transition", `width ${duration / 2}ms`);
            menuShapeBG.css("width", "140%");
            setTimeout(() => {
                menuShapeBG.css("width", "100%");
            }, duration / 2);
        }

        menuShape.css("transition", `all ${duration}ms`);
        moveShape($(this));
    });

    // Readjust menu shape on window resize
    window.addEventListener("resize", function() {
        moveShape(currentLink);
    });

    // Handle back button in Safari
    window.onpageshow = function(event) {
        if (event.persisted) {
            window.location.reload();
        }
    };

    // Scroll-based menu fade and move
    let lastScrollTop = 0;
    $(window).scroll(function() {
        var currentScrollTop = $(this).scrollTop();

        if (currentScrollTop > lastScrollTop) {
            menuContainer.css({
                'opacity': '0',
                'transform': 'translateY(20px)',
                'transition': 'opacity 0.2s ease, transform 0.2s ease',
            });
        } else {
            menuContainer.css({
                'opacity': '1',
                'transform': 'translateY(0)',
                'transition': 'opacity 0.2s ease, transform 0.2s ease',
            });
        }

        lastScrollTop = currentScrollTop;
    });
});
