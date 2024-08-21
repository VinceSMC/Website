(function ($) {
  $.fn.replaceClass = function (pFromClass, pToClass) {
    return this.removeClass(pFromClass).addClass(pToClass);
  };
})(jQuery);

var clicks = true;
$(".wrapper__light-switch--lnnbg").click(function (evt) {
  if (clicks) {
    switch_mode_from_dark_to_light();
    clicks = false;
    localStorage.setItem("mode", "light");
  } else {
    switch_mode_from_light_to_dark();
    clicks = true;
    localStorage.setItem("mode", "dark");
  }
});

// If user has existing mode set
if (localStorage.getItem("mode")) {
  let userMode = localStorage.getItem("mode");
  if (userMode == "light") {
    $(".wrapper__light-switch--lnnbg").click();
  }
}

function switch_mode_from_dark_to_light() {
  $(".is--dark-mode").replaceClass("is--dark-mode", "is--light-mode");
}

function switch_mode_from_light_to_dark() {
  $(".is--light-mode").replaceClass("is--light-mode", "is--dark-mode");
}
