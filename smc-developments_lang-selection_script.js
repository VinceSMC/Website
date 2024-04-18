document.addEventListener('DOMContentLoaded', function() {
  let dropdownOptions = document.querySelectorAll('.wrapper__language-option--8c7b8:not(.wrapper__language-option--8c7b8--default)');
  let selectedLangDiv = document.querySelector('.wrapper__language-option--8c7b8--default');
  let purchaseButton = document.querySelector('.button__minecraft--8c7b8');

  // Use global configuration
  const languageConfig = window.languageConfig || {};
  const defaultLanguage = window.defaultLanguage || "is--eng";

  // Initialize with default values
  function initializeDefaultLanguage() {
    let defaultConfig = languageConfig[defaultLanguage];
    if (defaultConfig) {
      selectedLangDiv.querySelector('.div__language-flag--8c7b8').className = 'div__language-flag--8c7b8 ' + defaultLanguage;
      selectedLangDiv.querySelector('.text__language-option--8c7b8').textContent = defaultConfig.languageText;
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
        selectedLangDiv.querySelector('.div__language-flag--8c7b8').className = 'div__language-flag--8c7b8 ' + langClass;
        selectedLangDiv.querySelector('.text__language-option--8c7b8').textContent = langConfig.languageText;
        selectedLangDiv.setAttribute('data-lang', langCode);

        // Update purchase button link
        purchaseButton.setAttribute('href', window.location.origin + langConfig.languageLink);
      }
    });
  });
});
