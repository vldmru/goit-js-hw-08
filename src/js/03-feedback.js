import throttle from 'lodash.throttle';

const listEl = {
  form: document.querySelector('.feedback-form'),
  inputEmail: document.querySelector('.feedback-form input'),
  textareaInput: document.querySelector('.feedback-form textarea'),
};

const STORAGE_KEY = 'feedback-form-state';

listEl.form.addEventListener('submit', onFormSubmit);
listEl.form.addEventListener('input', throttle(onFormInput, 500));

populateInputData();

const dataObj = {};

function onFormInput() {
  dataObj.email = listEl.inputEmail.value;
  dataObj.message = listEl.textareaInput.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataObj));
}

function onFormSubmit(event) {
  event.preventDefault();

  console.log(populateInputData());

  localStorage.removeItem(STORAGE_KEY);
  event.target.reset();
}

function populateInputData() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedData) {
    listEl.inputEmail.value = savedData.email;
    listEl.textareaInput.value = savedData.message;
    return savedData;
  }
}