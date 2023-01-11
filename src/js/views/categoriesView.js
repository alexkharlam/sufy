import View from './view';
import { newId } from '../helper';

class CategoriesView extends View {
  _parentElement = document.querySelector('.categories');
  _categoryInputBlock = document.querySelector('.category-input-block');
  _addCategoryBtn = document.querySelector('.new-category');
  _submitBtn = document.querySelector('.submit-category');
  _title = document.querySelector('.category-title');
  _colorsContainer = document.querySelector('.pick-color');
  _colorIcon = document.querySelectorAll('.color');
  _message = document.querySelector('.message');

  _currentColor = '#495057';

  constructor() {
    super();
    this._addCategoryBtn.addEventListener(
      'click',
      this.toggleWindow.bind(this, 'open')
    );

    this._colorsContainer.addEventListener(
      'click',
      this._setCurrentColor.bind(this)
    );
  }

  clearElements() {
    // clear all elements from categories list (except from create category)
    document
      .querySelectorAll('.category')
      .forEach(cat => cat.parentNode.removeChild(cat));
  }

  _setCurrentColor(e) {
    if (!e.target.classList.contains('color')) return;
    // set active class
    this._colorIcon.forEach(color => color.classList.remove('color-active'));
    e.target.classList.add('color-active');
    // set currentColor
    this._currentColor = e.target.style.background;
  }

  saveCategoryHandler(handler) {
    this._submitBtn.addEventListener(
      'click',
      this._saveCategory.bind(this, handler)
    );
  }

  _saveCategory(handler) {
    // getting data  (title and color)
    const data = {
      title: this._title.value,
      color: this._currentColor,
    };
    if (!data.title) return;
    // calling handler in the controller
    handler(data);
  }

  toggleWindow(toggleType = 'open') {
    // TODO: REFACTORING
    if (toggleType === 'close') this._categoryInputBlock.style.display = 'none';
    if (toggleType === 'open') this._categoryInputBlock.style.display = 'block';
    setTimeout(() => {
      this._categoryInputBlock.style.opacity = `${
        toggleType === 'close' ? '0' : '1'
      }`;
      this._categoryInputBlock.style.height = `${
        toggleType === 'close' ? '0%' : '340px'
      }`;
    }, 10);
    // focusing / clearing
    if (toggleType === 'open') this._title.focus();
    if (toggleType === 'close') this._title.value = '';
  }

  _createMarkup(category) {
    // creating markup for the render function in VIEW
    return `
    <a href="#${category.id}" data-catid="${category.id}" class="category" style="background: ${category.color}">${category.title}</>
      <div class="delete-category-container">
        <div class="delete-category"></div>
      </div>
    </a>`;
  }

  showMessage() {
    this._message.style.opacity = 1;
    setTimeout(() => {
      this._message.style.opacity = 0;
    }, 3000);
  }

  deleteCategoryHandler(handler) {
    this._parentElement.addEventListener('click', function (e) {
      if (!e.target.classList.contains('delete-category')) return;
      e.preventDefault();
      // getting id from the element
      const id = e.target.closest('.category').dataset.catid;
      // calling controller function
      handler(id);
    });
  }
}

export default new CategoriesView();
