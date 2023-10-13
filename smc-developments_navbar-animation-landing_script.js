function handleScrollForNavbar() {
    const threshold = window.innerHeight * 0.5;  
    const navbarContainer = document.querySelector(".navigation__container");
    const navbarSection = document.querySelector(".navigation.is--landing");

    if (window.scrollY >= threshold) {
        navbarContainer.classList.add("animated");
        navbarSection.classList.add("fixed");
        navbarSection.classList.add("expanded");
    } else {
        navbarContainer.classList.remove("animated");
        navbarSection.classList.remove("fixed");
        navbarSection.classList.remove("expanded");
    }
}

window.addEventListener('scroll', handleScrollForNavbar, { passive: true });
