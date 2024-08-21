(function ($) {
  $.fn.replaceClass = function (pFromClass, pToClass) {
    return this.removeClass(pFromClass).addClass(pToClass);
  };
})(jQuery);

// Function to switch to light mode
function switch_mode_from_dark_to_light() {
  $(".is--dark-mode").replaceClass("is--dark-mode", "is--light-mode");
  localStorage.setItem("mode", "light");
}

// Function to switch to dark mode
function switch_mode_from_light_to_dark() {
  $(".is--light-mode").replaceClass("is--light-mode", "is--dark-mode");
  localStorage.setItem("mode", "dark");
}

// Set initial mode based on localStorage
$(document).ready(function () {
  var clicks = true;
  
  // Get references to the tabs for light and dark mode
  var lightTab = $("[data-theme='light']");
  var darkTab = $("[data-theme='dark']");

  // If user has an existing mode set
  let userMode = localStorage.getItem("mode");

  if (userMode === "light") {
    lightTab.addClass('w--current');
    darkTab.removeClass('w--current');
    switch_mode_from_dark_to_light();
    clicks = true;
  } else if (userMode === "dark") {
    darkTab.addClass('w--current');
    lightTab.removeClass('w--current');
    switch_mode_from_light_to_dark();
    clicks = false;
  }

  // Click handler for light tab
  lightTab.click(function () {
    if (!clicks) {
      switch_mode_from_dark_to_light();
      clicks = true;
    }
  });

  // Click handler for dark tab
  darkTab.click(function () {
    if (clicks) {
      switch_mode_from_light_to_dark();
      clicks = false;
    }
  });
});
