import View from './view';
import { formatDate } from '../helper';

class NotesView extends View {
  _parentElement = document.querySelector('.notes');

  hashChangeHandler(handler) {
    window.addEventListener('hashchange', function (e) {
      const id = e.newURL.split('#')[1];
      // if hash doesn't starts with 'cat', it means that hash is NOTE ID, so passing the second argument of open note instead of sort by category
      if (id.startsWith('0')) return handler(id, 'openNote');
      // calling controller function
      return handler(id);
    });
  }

  _createMarkup(data) {
    // replacing all \n and empty spaces, so html can correctly show note
    data.text = `${data.text}`.replaceAll(' ', '&nbsp');
    data.text = `${data.text}`.replaceAll('\n', '<br>');
    // markup of note preview
    return `   
      <a href="#${data.id}" data-id="${
      data.id
    }" class="note-preview" style="background: ${
      // if note doesn't have category, default background color
      data.category[1] ? data.category[1] : '#7048e8'
    }">
        <div class="preview-text-block">
          <h3 class="preview-title">${data.title}</h3>
          <p class="preview-text">${data.text}</p>
        </div>
        <div class="preview-info">
         <div class="delete-note-btn">remove</div>
          <div class="preview-category">${
            // if note doesn't have category, default title is 'No category'
            data.category[2] ? data.category[2] : 'No category'
          }</div>
          <div class="preview-date">${formatDate(data.date)}</div>
        </div>
      </a>
      `;
  }

  clearNotesView() {
    // clearing all notes elements, except for create note btn
    document
      .querySelectorAll('.note-preview')
      .forEach(note => note.parentNode.removeChild(note));
  }

  deleteNoteHandler(handler) {
    this._parentElement.addEventListener('click', function (e) {
      if (!e.target.classList.contains('delete-note-btn')) return;
      // getting id
      const id = e.target.closest('.note-preview').dataset.id;
      // calling the controller function
      handler(id);
    });
  }
}

export default new NotesView();
