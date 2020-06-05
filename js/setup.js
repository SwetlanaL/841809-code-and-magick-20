'use strict';

var DATA_WIZARDS = {
  COUNT: 4,
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green'],
};

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
userDialog.querySelector('.setup-similar').classList.remove('hidden');

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
      eyesColor: getRandomElement(DATA_WIZARDS.EYES_COLOR)
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
