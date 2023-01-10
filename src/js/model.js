import { newId } from './helper';

export const state = {
  notes: [],
  categories: [],
};

// const testNote = {
//   title: 'It note',
//   text: `IT NOTEs is the main Lorem ipsum dolor sit amet consectetur
//   adipisicing elit. Dolorum, quisquam odio! Ea quod animi consequuntur
//   Wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww necessitatibus, impedit Lorem
//   ipsum dolor sit amet consectetur adipisicing elit. Impedit, mollitia
//   sunt placeat ea reiciendis non beatae harum at officia, nesciunt,`,
//   id: newId(),
//   category: 'IT notes',
//   date: new Date(),
// };

// state.notes.push(testNote);
export const addNote = function (note) {
  note.id = newId();
  note.date = new Date();

  state.notes.push(note);

  persistNote();
  return note;
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
  console.log(state.notes);
  state.notes.forEach(note => {
    if (note.category[0] === id) {
      note.category[2] = `No category`;
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
