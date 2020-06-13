'use strict';

var DATA_WIZARDS = {
  COUNT: 4,
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALL_COLOR: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5'],
};

var setupSimilarWizards = document.querySelector('.setup-similar');
var userDialog = document.querySelector('.setup');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var nameInput = userDialog.querySelector('.setup-user-name');
var coatColor = userDialog.querySelector('.wizard-coat');
var eyesColor = userDialog.querySelector('.wizard-eyes');
var fireballColor = userDialog.querySelector('.setup-fireball-wrap');
var inputCoats = userDialog.querySelectorAll('input[name="coat-color"]');
var inputEyes = userDialog.querySelectorAll('input[name="eyes-color"]');
var inputFireballs = userDialog.querySelectorAll('input[name="fireball-color"]');

function showSimilarWizards() {
  setupSimilarWizards.classList.remove('hidden');
}

var renderWizardTemplate = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.names + '\n' + wizard.surnames;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var getRandomElement = function (array) {
  for (var i = 0; i < array.length; i++) {
    var randomIndex = Math.floor(Math.random() * array.length);
    var randomElement = array[randomIndex];
  }
  return randomElement;
};

var generateRandomWizards = function () {
  var randomWizards = [];
  for (var i = 0; i < DATA_WIZARDS.COUNT; i++) {
    randomWizards.push({
      names: getRandomElement(DATA_WIZARDS.NAMES),
      surnames: getRandomElement(DATA_WIZARDS.SURNAMES),
      coatColor: getRandomElement(DATA_WIZARDS.COAT_COLOR),
      eyesColor: getRandomElement(DATA_WIZARDS.EYES_COLOR),
    });
  }
  return randomWizards;
};

var renderWizards = function () {
  var fragment = document.createDocumentFragment();
  var similarWizards = generateRandomWizards();
  for (var i = 0; i < similarWizards.length; i++) {
    fragment.appendChild(renderWizardTemplate(similarWizards[i]));
  }
  similarListElement.appendChild(fragment);
};

renderWizards();

var onUserDialogEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onUserDialogEscPress);
};

var closePopup = function () {
  if (document.activeElement !== nameInput) {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onUserDialogEscPress);
  }
};

userDialogOpen.addEventListener('click', function () {
  openPopup();
  showSimilarWizards();
});

userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
    showSimilarWizards();
  }
});

userDialogClose.addEventListener('click', function () {
  closePopup();
});

userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

// changing colors of coat, eyes and fireball
// Вопрос Анастасии: почему value у инпутов меняются, но в форме, при ее отпарвке, остаются значения из html?
function getOrderCounter(array) {
  var counter = 1;
  return function () {
    if (counter >= array.length) {
      counter = 0;
    }
    return array[counter++];
  };
}
var getCoatColor = getOrderCounter(DATA_WIZARDS.COAT_COLOR);
var getEyesColor = getOrderCounter(DATA_WIZARDS.EYES_COLOR);
var getFireballColor = getOrderCounter(DATA_WIZARDS.FIREBALL_COLOR);

coatColor.addEventListener('click', function () {
  coatColor.style.fill = getCoatColor();
  inputCoats.value = coatColor.style.fill;
});

eyesColor.addEventListener('click', function () {
  eyesColor.style.fill = getEyesColor();
  inputEyes.value = eyesColor.style.fill;
});

fireballColor.addEventListener('click', function () {
  fireballColor.style.background = getFireballColor();
  inputFireballs.value = fireballColor.style.background;
});

// form validation:
nameInput.addEventListener('invalid', function () {
  var warningMessage;
  if (nameInput.validity.tooShort) {
    warningMessage = 'Имя должно быть длиннее';
  } else if (nameInput.validity.tooLong) {
    warningMessage = 'Имя должно быть короче и содержать 25 символов максимум';
  } else if (nameInput.validity.valueMissing) {
    warningMessage = 'Обязательно укажите имя своего волшебника';
  } else {
    warningMessage = '';
  }
  nameInput.setCustomValidity(warningMessage);
});
