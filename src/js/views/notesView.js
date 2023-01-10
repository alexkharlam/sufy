import View from './view';
import { formatDate } from '../helper';

class NotesView extends View {
  _parentElement = document.querySelector('.notes');

  hashChangeHandler(handler) {
    window.addEventListener('hashchange', function (e) {
      const id = e.newURL.split('#')[1];
      // if (id.startsWith('cat')) return handler();
      return handler(id);
    });
  }

  _createMarkup(data) {
    data.text = `${data.text}`.replaceAll(' ', '&nbsp');
    data.text = `${data.text}`.replaceAll('\n', '<br>');
    return `   
      <a href="#${data.id}" class="note-preview" style="background: ${
      data.category[1] ? data.category[1] : '#7048e8'
    }">
        <div class="preview-text-block">
          <h3 class="preview-title">${data.title}</h3>
          <p class="preview-text">${data.text}</p>
        </div>
        <div class="preview-info">
          <div class="preview-category">${
            data.category[2] ? data.category[2] : 'No category'
          }</div>
          <div class="preview-date">${formatDate(data.date)}</div>
        </div>
      </a>
      `;
  }

  clearNotesView() {
    document
      .querySelectorAll('.note-preview')
      .forEach(note => note.parentNode.removeChild(note));
  }
}

export default new NotesView();
