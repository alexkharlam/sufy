import * as model from './model';
import categoriesView from './views/categoriesView';
import notesView from './views/notesView';
import createNoteView from './views/createNoteView';
import navView from './views/navView';

const controlNotes = function () {
  if (!model.state.notes) return;
  //  clear view
  notesView.clearNotesView();
  // render notes
  model.state.notes.forEach(note => notesView.render(note));
};

const controlCategories = function () {
  if (!model.state.categories) return;
  // clear categoriesview
  categoriesView.clearElements();
  // render categories
  model.state.categories.forEach(cat => categoriesView.render(cat));
};

// controlling categories list inside of create note window
const controlCategoriesList = function () {
  // clear list
  createNoteView.clearCategoriesList();
  // render list
  model.state.categories.forEach(category =>
    createNoteView.renderCategoryList(category)
  );
};

const controlSaveCategory = function (category) {
  try {
    // adding data to the state
    const newCategoryData = model.addCategory(category);
    // render categories
    categoriesView.render(newCategoryData);
    // close window
    categoriesView.toggleWindow('close');
    // add category to the categories list inside of create note window
    controlCategoriesList();
  } catch (err) {
    console.error(err);
    categoriesView.showMessage();
  }
};

const controlSaveNote = function (note) {
  // add note to the state
  const newNoteData = model.addNote(note);
  // render note
  notesView.render(newNoteData);
};

const controlDeleteNote = function (id) {
  // deleting from state
  model.deleteNote(id);
  // render notes
  controlNotes();
};

const controlDeleteCategory = function (id) {
  // checking if we are currently on this category page and need to go to the homepage
  const urlId = document.URL;
  if (urlId.split('#')[1] === id) {
    window.location.hash = '';
  }

  // delete from state
  model.deleteCategory(id);
  // render categories
  controlCategories();
  // delete from categories list in notesview
  controlCategoriesList();
  // re-render notes (if note had this category, it's sets to 'No category')
  controlNotes();
};

const controlHashChange = function (id, type = 'openCategory') {
  // checking for type of hash, default - openCategory
  // TODO: Not done yet - opening full size note functionality when clicking on the note
  if (type === 'openNote') {
    // const note = model.state.notes.find(note => note.id === id);
    return;
  }
  // render notes
  controlNotes();
  // set current category
  navView.setCurrentCategory(
    model.state.categories.find(category => category.id === id)
  );
};

// control hash and current category window while page first loads
const controlHash = function () {
  // get urlID TODO: use not document.url, but window.location(replace anywhere)
  const urlId = document.URL.split('#')[1];
  const cat = model.state.categories.find(cat => cat.id === urlId);
  if (!cat) return;
  if (urlId.startsWith('cat')) {
    navView.setCurrentCategory(cat);
  }
};

// init function, calls other functions
const init = function () {
  // control Renders
  controlCategories();
  controlNotes();
  controlCategoriesList();
  controlHash();
  // handlers
  categoriesView.saveCategoryHandler(controlSaveCategory);
  createNoteView.createNoteHandler(controlSaveNote);
  categoriesView.deleteCategoryHandler(controlDeleteCategory);
  notesView.deleteNoteHandler(controlDeleteNote);
  notesView.hashChangeHandler(controlHashChange);
};
init();
