let changeLogSvg = $('[data-name="changelog-icon"]');

function clean_parse_html(){
    $('.w-richtext').children('p').each(function() {                
        if(this.innerHTML.indexOf('&lt;') == 0 && this.innerHTML.match(/&gt;$/) != null) {
            this.innerHTML = this.innerText.replace(/\u00A0/g, '');
        }      
        if(!($(this).children().length > 0)){
            $(this).remove();
        }
    });
}

function insertSVG(){
    $('.wrapper__changelog-item--hfbsw').each(function(){
        if(!($(this).children('[data-name="changelog-icon"]').length)){
            $(this).prepend(changeLogSvg.clone());
        }
    });
}

function filterCategories() {
    // Select all elements that have the data-category-active attribute
    const activeElements = document.querySelectorAll('[data-category-active]');

    activeElements.forEach(activeElement => {
        // Get the active category from the current element
        const activeCategory = activeElement.getAttribute('data-category-active').trim();

        // Find the parent element that contains the category divs
        const parentElement = activeElement.parentElement;

        // Get all category divs within the parent element
        const categoryDivs = parentElement.querySelectorAll('[data-category]');

        // Loop through all category divs
        categoryDivs.forEach(div => {
            // Get the category from the current div
            const category = div.getAttribute('data-category').trim();

            // Show the div if it matches the active category, otherwise hide it
            if (category === activeCategory) {
                div.style.display = 'flex'; // Show the div
            } else {
                div.style.display = 'none';  // Hide the div
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    clean_parse_html();
    insertSVG();
    filterCategories();
});

window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
    'cmsload',
    (listInstances) => {
        const [listInstance] = listInstances;

        listInstance.on('renderitems', (renderedItems) => {
            clean_parse_html();
            insertSVG();
            filterCategories(); // Apply the filter after new items are rendered
        });
    },
]);
