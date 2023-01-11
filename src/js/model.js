import { newId } from './helper';

export const state = {
  notes: [],
  categories: [],
};

export const addNote = function (note) {
  note.id = newId();
  note.date = new Date();

  state.notes.push(note);

  persistNote();
  return note;
};

export const deleteNote = function (id) {
  const idx = state.notes.findIndex(note => note.id === id);
  state.notes.splice(idx, 1);
  persistNote();
};

export const addCategory = function (category) {
  try {
    // error handling (same name)
    if (state.categories.some(cat => cat.title === category.title))
      throw new Error('Category with this title already exists');
    // creating id
    category.id = `cat${newId('category')}`;
    // adding to state
    state.categories.push(category);
    // adding to local storage
    persistCategories();
    return category;
  } catch (err) {
    throw err;
  }
};

export const deleteCategory = function (id) {
  const idx = state.categories.findIndex(cat => cat.id === id);
  state.categories.splice(idx, 1);
  persistCategories();

  // clear categories from notes
  state.notes.forEach(note => {
    if (note.category[0] === id) {
      note.category[2] = `No category`;
      note.category[1] = '#7048e8';
    }
  });
  persistNote();
  console.log(state.notes);
};

const persistNote = function () {
  localStorage.setItem('notes', JSON.stringify(state.notes));
};

const persistCategories = function () {
  localStorage.setItem('categories', JSON.stringify(state.categories));
};

const initStorageNotes = function () {
  if (!localStorage.getItem('notes')) return;
  state.notes = JSON.parse(localStorage.getItem('notes'));
};
initStorageNotes();

const initStorageCategories = function () {
  if (!localStorage.getItem('categories')) return;
  state.categories = JSON.parse(localStorage.getItem('categories'));
  // localStorage.clear('categories');
};
initStorageCategories();
