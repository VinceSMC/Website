let duration = 400;
let menuShape = $(".menu_shape");
let menuShapeBG = $(".menu_shape-bg");
let menuLinkLiquid = $(".menu_link");
let currentLink = $(".menu_link.w--current");
let pageWrapper = $('.liquid_page-wrapper')


//For CMS Page Set Gallery to Current
if(window.location.pathname.includes('/survival-gallery/')){
    menuLinkLiquid.each(function(){
        if($(this).attr("is-cms-link")){
            $(this).addClass('w--current')
						currentLink = $(".menu_link.w--current");
        }
    })	
}

// On page load
pageWrapper.css('opacity', '1')
moveShape(currentLink);
$(".menu_link-bg").css("opacity", "0");
menuShape.css("opacity", "1");
menuLinkLiquid.css("pointer-events", "auto");


// On click
menuLinkLiquid.on("click", function (e) {
  // Page url
  e.preventDefault();
  setTimeout(() => {
    window.location = $(this).attr("href");
  }, duration);

	//page wrapper
	pageWrapper.css('opacity', '0')

  // menuShapeBG Stretch
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
  // menuShape move
  menuShape.css("transition", `all ${duration}ms`);
  moveShape($(this));
	
});

// Snap
function moveShape(target) {
  let linkWidth = target.innerWidth();
  let linkOffset = target.offset().left;
  let menuOffset = $(".menu").offset().left;
  let leftPosition = linkOffset - menuOffset;
  menuShape.css("left", leftPosition);
  menuShape.css("width", linkWidth);
}

// Resize
window.addEventListener("resize", function () {
  moveShape(currentLink);
});

// Back button safari
window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload();
  }
};