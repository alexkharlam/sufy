import { newId } from './helper';

// state - holder for notes and categories
export const state = {
  notes: [],
  categories: [],
};

export const addNote = function (note) {
  // adding id and date data
  note.id = newId();
  note.date = new Date();
  // adding to the state
  state.notes.push(note);
  // sync with local storage
  persistNote();
  // returning, so the controller can use id and date
  return note;
};

export const deleteNote = function (id) {
  // finding index using id TODO: optmization
  const idx = state.notes.findIndex(note => note.id === id);
  // deleting
  state.notes.splice(idx, 1);
  // sync with local storage
  persistNote();
};

export const addCategory = function (category) {
  try {
    // error handling (NOT allowed to have the same category title)
    if (state.categories.some(cat => cat.title === category.title))
      throw new Error('Category with this title already exists');
    // creating id
    category.id = `cat${newId('category')}`;
    // adding to state
    state.categories.push(category);
    // sync with local storage
    persistCategories();
    return category;
  } catch (err) {
    throw err;
  }
};

export const deleteCategory = function (id) {
  // getting idx of the category
  const idx = state.categories.findIndex(cat => cat.id === id);
  // deleting
  state.categories.splice(idx, 1);
  // sync with local storage
  persistCategories();
  // clear categories from notes
  state.notes.forEach(note => {
    if (note.category[0] === id) {
      note.category[2] = `No category`;
      note.category[1] = '#7048e8';
    }
  });
  // sync with local storage
  persistNote();
};

// *******************************************************
// LOCAL STORAGE FUNCTIONS
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
};
initStorageCategories();
