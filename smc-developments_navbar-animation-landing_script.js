function handleScrollForNavbar() {
    // Threshold for .navigation
    const thresholdNavigation = window.innerHeight * 0.5;
    // Threshold for .navigation__mob (20% earlier)
    const thresholdNavigationMob = window.innerHeight * 0.3;

    const navbarContainer = document.querySelector(".wrapper__navigation-content--vrwnm");
    const navbarSection = document.querySelector(".wrapper__main-navigation--vrwnm");
    const navbarMobile = document.querySelector(".navigation__mob");

    if (window.scrollY >= thresholdNavigation) {
        navbarContainer.classList.add("animated");
        navbarSection.classList.add("fixed");
        navbarSection.classList.add("expanded");
    } else {
        navbarContainer.classList.remove("animated");
        navbarSection.classList.remove("fixed");
        navbarSection.classList.remove("expanded");
    }

    if (window.scrollY >= thresholdNavigationMob) {
        navbarMobile.classList.add("fixed");
        navbarMobile.classList.add("expanded");
    } else {
        navbarMobile.classList.remove("fixed");
        navbarMobile.classList.remove("expanded");
    }
}

window.addEventListener('scroll', handleScrollForNavbar, { passive: true });
