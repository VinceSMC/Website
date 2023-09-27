document.addEventListener('DOMContentLoaded', function() {
  let dropdownOptions = document.querySelectorAll('.lang-dropdown__option:not(.lang-dropdown__option--default)');
  let selectedLangDiv = document.querySelector('.lang-dropdown__option--default');
  let purchaseButton = document.querySelector('.purchase-btn');

  // Use global configuration
  const languageConfig = window.languageConfig || {};
  const defaultLanguage = window.defaultLanguage || "is--eng";

  // Initialize with default values
  function initializeDefaultLanguage() {
    let defaultConfig = languageConfig[defaultLanguage];
    if (defaultConfig) {
      selectedLangDiv.querySelector('.lang-dropdown__flag').className = 'lang-dropdown__flag ' + defaultLanguage;
      selectedLangDiv.querySelector('.lang-dropdown__text').textContent = defaultConfig.languageText;
      purchaseButton.setAttribute('href', window.location.origin + defaultConfig.languageLink);
    }
  }

  // Run initialization function
  initializeDefaultLanguage();

  // Event listeners for language options
  dropdownOptions.forEach(option => {
    option.addEventListener('click', function() {
      let langCode = option.getAttribute('data-lang');
      let langClass = 'is--' + langCode;
      let langConfig = languageConfig[langClass];

      if (langConfig) {
        // Update selected language text, flag, and data-lang attribute
        selectedLangDiv.querySelector('.lang-dropdown__flag').className = 'lang-dropdown__flag ' + langClass;
        selectedLangDiv.querySelector('.lang-dropdown__text').textContent = langConfig.languageText;
        selectedLangDiv.setAttribute('data-lang', langCode);

        // Update purchase button link
        purchaseButton.setAttribute('href', window.location.origin + langConfig.languageLink);
      }
    });
  });
});
