const body = document.body;
const customScrollbarThumb = document.querySelector(".custom-scrollbar-thumb");

// Adjust the height of the thumb based on the content height
const adjustScrollbarHeight = () => {
    const totalHeight = body.scrollHeight;
    const viewportHeight = window.innerHeight;
    const percentageVisible = viewportHeight / totalHeight;
    
    customScrollbarThumb.style.height = `${percentageVisible * 100}vh`;
};

// Adjust the position of the thumb based on the scroll position
const adjustScrollbarPosition = () => {
    const totalHeight = body.scrollHeight - window.innerHeight;
    const percentageScrolled = window.pageYOffset / totalHeight;

    customScrollbarThumb.style.transform = `translateY(${percentageScrolled * (window.innerHeight - customScrollbarThumb.offsetHeight)}px)`;
};

// Call these functions on initial load, on scroll, and on window resize
adjustScrollbarHeight();
window.addEventListener("scroll", adjustScrollbarPosition);
window.addEventListener("resize", adjustScrollbarHeight);
