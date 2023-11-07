document.addEventListener('DOMContentLoaded', function() {
  // Function to open the modal
  function openModal(modalValue) {
    const overlay = document.querySelector('.info__modal-overlay');
    const modals = document.querySelectorAll('.info__modal-content');

    // Hide all modals first
    modals.forEach((modal) => {
      modal.style.display = 'none'; // Hide immediately, no transition
      modal.classList.remove('active');
    });

    // Find the matching modal content and show it
    const activeModal = Array.from(modals).find((modal) => modal.getAttribute('data-info-modal-content') === modalValue);
    if (activeModal) {
      // Set display to flex immediately to take up space for transition to happen
      activeModal.style.display = 'flex';

      // Delay the addition of 'active' class for the opacity transition
      setTimeout(() => {
        overlay.classList.add('active');
        activeModal.classList.add('active');
      }, 10); // Short delay to ensure display:flex is rendered before transition
    }
    overlay.style.display = 'flex'; // Set overlay to flex to enable transition
  }

  // Function to close the modal
  function closeModal() {
    const overlay = document.querySelector('.info__modal-overlay');
    const modals = document.querySelectorAll('.info__modal-content');

    overlay.classList.remove('active');
    modals.forEach((modal) => {
      modal.classList.remove('active');
      // Delay hiding the modal to allow for the opacity transition
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300); // This should match the transition duration
    });

    // Delay hiding the overlay to allow for the opacity transition
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 300); // This should match the transition duration
  }

  // Event listener for opening modals
  document.body.addEventListener('click', function(event) {
    if (event.target.matches('[data-info-modal]')) {
      const modalValue = event.target.getAttribute('data-info-modal');
      openModal(modalValue);
    }
  });

  // Event listener for closing the modal when the overlay is clicked
  document.querySelector('.info__modal-overlay').addEventListener('click', function(event) {
    if (event.target === this) {
      closeModal();
    }
  });

  // Prevent event propagation to overlay from modal content
  document.querySelectorAll('.info__modal-content').forEach(modalContent => {
    modalContent.addEventListener('click', function(event) {
      event.stopPropagation();
    });
  });

  // Event listener for any close buttons within the modal content
  document.querySelectorAll('[data-modal-close]').forEach(closeButton => {
    closeButton.addEventListener('click', closeModal);
  });

  // New functionality to change text color on hover
  const modalTriggers = document.querySelectorAll('[data-info-modal]');

  const changeTextColor = (hoveredElement, color) => {
    const infoText = document.querySelector(`[data-info-hover="${hoveredElement.getAttribute('data-info-modal')}"]`);
    if (infoText) {
      infoText.style.color = color;
    }
  };

  modalTriggers.forEach(trigger => {
    trigger.addEventListener("mouseenter", function() {
      changeTextColor(this, 'var(--swatch-vibrant--purple)'); // Change the color on hover
    });
    trigger.addEventListener("mouseleave", function() {
      changeTextColor(this, ''); // Remove the color on mouse leave
    });
  });
});
