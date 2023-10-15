document.addEventListener("DOMContentLoaded", function() {
    
    // Finsweet Initialization
    var projectsGrid = new FsLibrary('.collection__card-wrapper');

    // Link update based on hidden text component
    const links = document.querySelectorAll('[data-custom-path]');
    links.forEach(link => {
        const hiddenTextComponent = link.querySelector('.hidden-component');
        if (hiddenTextComponent) {
            const cmsName = hiddenTextComponent.textContent.trim().toLowerCase();
            link.href = `/docs/plugins/supreme${cmsName}`;
        }
    });

    // Hover effect on collection card content
    const collectionCardContent = document.querySelectorAll('.collection__card-content');
    collectionCardContent.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const overlay = card.querySelector('.collection__card-overlay');
            if (overlay) {
                overlay.style.opacity = "1";
            }
        });
        card.addEventListener('mouseleave', function() {
            const overlay = card.querySelector('.collection__card-overlay');
            if (overlay) {
                overlay.style.opacity = "0";
            }
        });
    });

    // Define our filter groups
    var myFilters = [
        {
            filterWrapper: ".search__block-input",
            filterType: "exclusive"
        },
        {
            filterWrapper: ".search__block-select",
            filterType: "exclusive"
        },
        {
            filterWrapper: ".dropdown-options",
            filterType: "exclusive",
            filterBy: "filter-by"
        }
    ];

    // Initial filter setup
    projectsGrid.filter({
        filterArray: myFilters,
        activeClass: 'is--active',
        animation: {
            enable: true,
            duration: 200,
            easing: 'ease-out',
            effects: 'fade translate(0px,20px)'
        }
    });

    var dropdownOptionsDiv = document.querySelector(".dropdown-options");

    // Check for dropdown enabled
    if (!configuration.dropdownEnabled && dropdownOptionsDiv) {
        dropdownOptionsDiv.style.pointerEvents = "none"; // Disables mouse interactions
        dropdownOptionsDiv.style.opacity = "0.25"; // Makes it semi-transparent to indicate it's disabled (optional)
    } else {
        var dropdownFilter = document.querySelector('.dropdown-filter');
    
        dropdownFilter.addEventListener('mouseenter', function() {
            dropdownOptionsDiv.style.display = "block";
        });

        dropdownFilter.addEventListener('mouseleave', function() {
            dropdownOptionsDiv.style.display = "none";
        });
    }

    dropdownOptionsDiv.addEventListener('mousedown', function(e) {
        if (e.target && e.target.matches(".sort__button")) {
            
            // Add is--active class to clicked filter and remove from others
            var sortButtons = document.querySelectorAll(".dropdown-options .sort__button");
            sortButtons.forEach(btn => btn.classList.remove("is--active"));
            e.target.classList.add("is--active");
            
            // Close dropdown
            dropdownOptionsDiv.style.display = "none";

            // Reapply filters
            projectsGrid.filter({
                filterArray: myFilters,
                activeClass: 'is--active',
                animation: {
                    enable: true,
                    duration: 200,
                    easing: 'ease-out',
                    effects: 'fade translate(0px,20px)'
                }
            });
        }
    });

    // Update Dropdown Text for Dropdown Buttons Only
    document.querySelectorAll('.sort__button.is--dropdown-button').forEach(button => {
        button.addEventListener('click', function() {
            var textContent = this.textContent.trim();
            var dropdownTextDirect = document.querySelector(".custom-dropdown .dropdown__filter-context-wrapper .dropdown__filter-text");
            if(dropdownTextDirect) {
                dropdownTextDirect.textContent = textContent;
            }
        });
    });

    // Setting default filter by emulating a full click event
    function setDefaultFilter() {
        var defaultFilterButton = document.querySelector('.sort__button[filter-by="' + configuration.defaultFilter + '"]');
        if(defaultFilterButton) {
            defaultFilterButton.click();
        }
    }
    setDefaultFilter();

});
