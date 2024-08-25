document.addEventListener('DOMContentLoaded', function() {

    // Attach click event to all elements with the "data-social-share" attribute
    const shareButtons = document.querySelectorAll('[data-social-share]');
    shareButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // prevent default action if it's an anchor or a button inside a form
            const overlay = document.querySelector('.changelog__modal-overlay');
            overlay.style.display = 'flex';
            setTimeout(() => overlay.classList.add('is--visible'), 10);

            // Get the dynamic link from the element with "data-modal-shareable-link" attribute within the closest parent with "data-link-share"
            const dynamicLink = this.closest('[data-link-share]').querySelector('[data-modal-shareable-link]').href;

            // Change the text inside the modal to the link
            const linkText = document.querySelector('.modal__link-text');
            linkText.textContent = dynamicLink;
        });
    });

    // Function to hide the modal when overlay or close SVG is clicked
    document.querySelector('.changelog__modal-overlay').addEventListener('click', function(e) {
        if (e.target === this || e.target.closest('.modal__close')) {
            const overlay = document.querySelector('.changelog__modal-overlay');
            overlay.classList.remove('is--visible');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300);
        }
    });

    // Code to copy the CMS link
    const copyButton = document.querySelector('.modal__copy-button');
    copyButton.addEventListener('click', function() {
        const link = document.querySelector('.modal__link-text').textContent;
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = link;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        // Change button text to "Copied!" and revert after 1 second
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = originalText;
        }, 1000);
    });
});
