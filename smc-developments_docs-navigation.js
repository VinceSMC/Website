$(window).ready(() => {
    var tabHeight = $(".wrapper__table-of-content_tabs-sub-tab_link--uitra").first().outerHeight();
    
    $(".wrapper__table-of-content_tabs-tab--uitra").click(e => {
        var goTo = $(e.currentTarget).attr("tab");
        if (typeof goTo !== 'undefined' && goTo !== false) {
            $([document.documentElement, document.body]).animate({
                scrollTop: ($("#" + goTo).offset().top - 150)
            }, 500);
        }
    });

    $(".wrapper__table-of-content_tabs-sub-tab_link--uitra").click(e => {
        var goTo = $(e.currentTarget).attr("tab");
        if (typeof goTo !== 'undefined' && goTo !== false) {
            $([document.documentElement, document.body]).animate({
                scrollTop: ($("#" + goTo).offset().top - 160)
            }, 500);
        }
    });
    
    var allTabs = $(".wrapper__main-content_content--uitra").find(".tab__content");
    var activeSub;

    $(window).scroll(() => {
        var visibleTabs = [];
        allTabs.each((k, v) => {
            if ($(v).inView()) {
                visibleTabs.push($(v));
            }
        });
        
        var firstVis = visibleTabs[0];
        if (firstVis) {
            var id = firstVis.attr("id");
            var tabLink = $("#tabs-container").find(".wrapper__table-of-content_tabs-tab--uitra[tab='" + id + "']");
            if (!tabLink.hasClass("active")) {
                $("#tabs-container").find(".wrapper__table-of-content_tabs-tab--uitra, .wrapper__table-of-content_tabs-sub-tab_link--uitra, .wrapper__table-of-content_tabs-sub-tab--uitra").removeClass("active subactive");
                $("#tabs-container").find(".wrapper__table-of-content_tabs-sub-tab--uitra").removeAttr("style");
                
                tabLink.addClass("active");
                var subContainer = $("#tabs-container").find(".wrapper__table-of-content_tabs-sub-tab--uitra[sub='" + id + "']");
                var subContainerHeight = subContainer.find(".wrapper__table-of-content_tabs-sub-tab_link--uitra").length * tabHeight;
                subContainer.css("height", subContainerHeight + "px").addClass("active");
                $("#tabs-container").find(".wrapper__table-of-content_tabs-sub-tab_link--uitra[sub='" + id + "']").addClass("subactive");
            }
        }
        
        var visibleSubTabs = [];
        if (firstVis) {
            var subTabs = $("#" + firstVis.attr("id")).find("[data-subheading]");
            subTabs.each((k, v) => {
                var dist = ($(v).offset().top - $(window).scrollTop());
                if (dist > 0 && dist < 170) {
                    visibleSubTabs.push($(v));
                }
            });
            var firstVisSub = visibleSubTabs[0];
        }

        if (firstVisSub) {
            var id = firstVisSub.attr("id");
            var subTabLink = $("#tabs-container").find(".wrapper__table-of-content_tabs-sub-tab_link--uitra[tab='" + id + "']");
            if (!subTabLink.hasClass("active")) {
                $("#tabs-container").find(".wrapper__table-of-content_tabs-sub-tab_link--uitra").removeClass("active");
                subTabLink.addClass("active");
                activeSub = firstVisSub;
            }
        }

        if (activeSub) {
            var dist = ($(activeSub).offset().top - $(window).scrollTop());
            if (dist > 170) {
                var id = activeSub.attr("id");
                var subTabLink = $("#tabs-container").find(".wrapper__table-of-content_tabs-sub-tab_link--uitra[tab='" + id + "']");
                subTabLink.removeClass("active");
                var prevSubTabLink = subTabLink.prev();
                if (prevSubTabLink.hasClass(.wrapper__table-of-content_tabs-sub-tab_link--uitra")) {
                    prevSubTabLink.addClass("active");
                    var prevId = prevSubTabLink.attr("tab");
                    activeSub = $("#" + prevId);
                } else {
                    activeSub = 0;
                }
            }
        }
    });
});

$.fn.inView = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};
