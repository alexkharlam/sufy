import View from './view';
import { formatDate } from '../helper';

class NavView extends View {
  _parentElement = document.querySelector('.nav');
  _currentCategory = document.querySelector('.current-category');

  setCurrentCategory(data) {
    if (!data) {
      this._currentCategory.textContent = 'all';
      this._currentCategory.style.background = '#fff';
      this._currentCategory.style.color = '#000';
      return;
    }
    this._currentCategory.textContent = data.title;
    this._currentCategory.style.background = data.color;
    this._currentCategory.style.color = '#fff';
  }
}

export default new NavView();
