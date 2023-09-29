document.addEventListener('DOMContentLoaded', function() {

    // Attach click event to all changelog__social-share buttons
    const shareButtons = document.querySelectorAll('.changelog__social-share');
    shareButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const overlay = document.querySelector('.changelog__modal-overlay');
            overlay.style.display = 'flex';
            setTimeout(() => overlay.classList.add('show-modal'), 10);

            // Get the dynamic link from the closest parent .changelog__wrapper's .modal__shareable-link href attribute
            const dynamicLink = this.closest('.changelog__wrapper').querySelector('.modal__shareable-link').href;

            // Change the text inside the modal to the link
            const linkText = document.querySelector('.modal__link-text');
            linkText.textContent = dynamicLink;
        });
    });

    // Function to hide the modal when overlay or close SVG is clicked
    document.querySelector('.changelog__modal-overlay').addEventListener('click', function(e) {
        if (e.target === this || e.target.closest('.modal__close')) {
            const overlay = document.querySelector('.changelog__modal-overlay');
            overlay.classList.remove('show-modal');
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
