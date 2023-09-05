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
        var visibleTabs = [];
        allTabs.each((k, v) => {
            if ($(v).inView()) {
                visibleTabs.push($(v));
            }
        });
        var firstVis = visibleTabs[0];
        if (firstVis) {
            if (!$("#tabs-container").find(".tab-link[tab='" + firstVis.attr("id") + "']").hasClass("active")) {
                $("#tabs-container").find(".tab-link").removeClass("active");
                $("#tabs-container").find(".tab-link-sub").removeClass("subactive");
                $("#tabs-container").find(".tab-link-sub").removeClass("active");
                $("#tabs-container").find(".sub-container").removeClass("active");
                $("#tabs-container").find(".sub-container").removeAttr("style");
                $("#tabs-container").find(".tab-link[tab='" + firstVis.attr("id") + "']").addClass("active");
                $("#tabs-container").find(".tab-link-sub[sub='" + firstVis.attr("id") + "']").addClass("subactive");
                if ($("#tabs-container").find(".sub-container")) {
                    var subNum = $("#tabs-container").find(".sub-container[sub='" + firstVis.attr("id") + "']").find(".tab-link-sub").length;
                    $("#tabs-container").find(".sub-container[sub='" + firstVis.attr("id") + "']").css("height", (tabHeight * subNum) + "px");
                    $("#tabs-container").find(".sub-container[sub='" + firstVis.attr("id") + "']").addClass("active");          
                }
            }
        }
        var visibleSubTabs = [];
        if (firstVis) {
            var subTabs = $("#" + firstVis.attr("id")).find(".docs__sub-heading");
            subTabs.each((k, v) => {
                var dist = ($(v).offset().top - $(window).scrollTop());
                if (dist > 0 && dist < 170) {
                    visibleSubTabs.push($(v));
                }
            });
            var firstVisSub = visibleSubTabs[0];
        }
        if (firstVisSub) {
            if (!$("#tabs-container").find(".tab-link-sub[tab='" + firstVisSub.attr("id") + "']").hasClass("active")) {
                $("#tabs-container").find(".tab-link-sub").removeClass("active");
                $("#tabs-container").find(".tab-link-sub[tab='" + firstVisSub.attr("id") + "']").addClass("active");
                activeSub = firstVisSub;
            }
        }
        if (activeSub) {
            var dist = ($(activeSub).offset().top - $(window).scrollTop());
            if (dist > 170) {
                $("#tabs-container").find(".tab-link-sub[tab='" + activeSub.attr("id") + "']").removeClass("active");
                if ($("#tabs-container").find(".tab-link-sub[tab='" + activeSub.attr("id") + "']").prev().hasClass("tab-link-sub")) {
                    $("#tabs-container").find(".tab-link-sub[tab='" + activeSub.attr("id") + "']").prev().addClass("active");
                    var prevId = $("#tabs-container").find(".tab-link-sub[tab='" + activeSub.attr("id") + "']").prev().attr("tab");
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
