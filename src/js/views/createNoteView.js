import View from './view';
import { formatDate } from '../helper';

class CreateNoteView extends View {
  _openModalBtn = document.querySelector('.open-modal-create');
  _submitBtn = document.querySelector('.submit-note');
  _title = document.querySelector('.create-note-title');
  _text = document.querySelector('.create-note-text');
  _category = document.querySelector('.select-category-block');
  _message = document.querySelector('.message-create-note');
  _parentElement = document.querySelector('.create-note-window');
  _categoriesList = document.querySelector('.select-category-block');
  _outline = document.querySelector('.outline');

  constructor() {
    super();
    this._openModalBtn.addEventListener('click', this._openModal.bind(this));
    window.addEventListener('keydown', this._closeModalEsc.bind(this));
  }

  createNoteHandler(handler) {
    this._submitBtn.addEventListener(
      'click',
      this._createNote.bind(this, handler)
    );
  }

  _createNote(handler, e) {
    e.preventDefault();
    // get title, text and category data
    const data = {
      title: this._title.value,
      text: this._text.value,
    };
    // adding the array of category data
    data.category = `${this._category.value}`.split('/');
    // check if they are not empty (if they are, show message and return function)
    if (!data.title || !data.text) {
      this._showMessage();
      return;
    }
    // close window
    this._closeModal();
    // call controller function
    handler(data);
    // clear fields
    this._title.value = this._text.value = '';
  }

  _showMessage() {
    this._message.style.opacity = '1';
    setTimeout(() => {
      this._message.style.opacity = '0';
    }, 3000);
  }

  _openModal() {
    this._outline.style.display = 'block';
    this._parentElement.style.display = 'block';

    setTimeout(() => {
      this._parentElement.style.opacity = '1';
      this._parentElement.style.transform = 'translate(-50%, -50%)';
    }, 10);
    // focus on field
    this._title.focus();
    this._outline.addEventListener('click', this._closeModal.bind(this));
  }

  _closeModalEsc(e) {
    if (e.key !== 'Escape') return;
    this._closeModal();
  }

  _closeModal() {
    this._outline.style.display = 'none';
    this._parentElement.style.transform = 'translate(-50%, -57%)';
    this._parentElement.style.opacity = '0';

    setTimeout(() => {
      this._parentElement.style.display = 'none';
    }, 400);
  }

  renderCategoryList(category) {
    // adding category to the list (value is a string of data divided by /)
    const markup = `<option class="select-category" value="${category.id}/${category.color}/${category.title}">${category.title}</option>`;
    // render
    this._categoriesList.insertAdjacentHTML('beforeend', markup);
  }

  clearCategoriesList() {
    // clear options list
    document
      .querySelectorAll('.select-category')
      .forEach(cat => cat.parentNode.removeChild(cat));
  }
}

export default new CreateNoteView();
