$(window).ready(() => {
    var tabHeight = $(".tab-link-sub").first().outerHeight();
    $(".tab-link").click(e => {
        var goTo = $(e.currentTarget).attr("tab");
        if (typeof goTo !== 'undefined' && goTo !== false) {
            $([document.documentElement, document.body]).animate({
                scrollTop: ($("#" + goTo).offset().top - 150)
            }, 500);
        }
    });

    $(".tab-link-sub").click(e => {
        var goTo = $(e.currentTarget).attr("tab");
        if (typeof goTo !== 'undefined' && goTo !== false) {
            $([document.documentElement, document.body]).animate({
                scrollTop: ($("#" + goTo).offset().top - 160)
            }, 500);
        }
    });
  
    var allTabs = $(".docs__category__content").find(".tab__content");
    var activeSub;
    $(window).scroll(() => {
        ... [rest of your code]
    });
});

$.fn.inView = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};
