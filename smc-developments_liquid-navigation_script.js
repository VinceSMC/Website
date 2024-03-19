let duration = 400;
let menuShape = $(".menu_shape");
let menuShapeBG = $(".menu_shape-bg");
let menuLinkLiquid = $(".menu_link");
let currentLink = $(".menu_link.w--current");
let pageWrapper = $('.liquid_page-wrapper');
let menuContainer = $(".menu__container"); // .menu__container is the main container holding the menu

// Check if current page is CMS page, if so, set gallery to current
if (window.location.pathname.includes('/survival-gallery/') || window.location.pathname.includes('/skyblock-gallery/')) {
    menuLinkLiquid.each(function() {
        if ($(this).attr("is-cms-link")) {
            $(this).addClass('w--current');
            currentLink = $(".menu_link.w--current");
        }
    });
}

// Initial page load settings
pageWrapper.css('opacity', '1');
moveShape(currentLink);
$(".menu_link-bg").css("opacity", "0");
menuShape.css("opacity", "1");

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

// Function to adjust the shape of the menu based on target
function moveShape(target) {
    let linkWidth = target.innerWidth();
    let linkOffset = target.offset().left;
    let menuOffset = $(".menu").offset().left;
    let leftPosition = linkOffset - menuOffset;
    menuShape.css("left", leftPosition);
    menuShape.css("width", linkWidth);
}

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

    // Only apply effects if window width is greater than 478px
    if ($(window).width() > 478) {
        // Scroll down
        if (currentScrollTop > lastScrollTop) {
            menuContainer.css({
                'opacity': '0',
                'transform': 'translateY(20px)', // Adjust this value as per your needs
                'transition': 'opacity 0.2s ease, transform 0.2s ease',
            });
        } 
        // Scroll up
        else {
            menuContainer.css({
                'opacity': '1',
                'transform': 'translateY(0)', // Adjust this value as per your needs
                'transition': 'opacity 0.2s ease, transform 0.2s ease',
            });
        }
    }

    lastScrollTop = currentScrollTop;
});
