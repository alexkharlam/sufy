import * as model from './model';
import categoriesView from './views/categoriesView';
import notesView from './views/notesView';
import createNoteView from './views/createNoteView';
import navView from './views/navView';

const controlNotes = function () {
  if (!model.state.notes) return;
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
  createNoteView.clearCategoriesList();

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
    // add category to list inside of create note window
    controlCategoriesList();
  } catch (err) {
    console.error(err);
    categoriesView.showMessage();
  }
};

const controlSaveNote = function (note) {
  // adding note to the state
  const newNoteData = model.addNote(note);
  // render note
  notesView.render(newNoteData);
};

const controlDeleteNote = function (id) {
  // deleting from state
  model.deleteNote(id);
  // rendering
  controlNotes();
};

const controlDeleteCategory = function (id) {
  // hecking if need to go to main page
  const urlId = document.URL;
  if (urlId.split('#')[1] === id) {
    console.log('url');
    window.location.hash = '';
  }

  // delete from state
  model.deleteCategory(id);
  // clear existing categories

  // render categories
  controlCategories();
  // delete from list in notesview
  controlCategoriesList();
  // render notes
  controlNotes();
};

const controlHashChange = function (id, type = 'openCategory') {
  if (type === 'openNote') {
    const note = model.state.notes.find(note => note.id === id);
    return;
  }

  controlNotes();
  navView.setCurrentCategory(
    model.state.categories.find(category => category.id === id)
  );
};

const controlHash = function () {
  const urlId = document.URL.split('#')[1];
  const cat = model.state.categories.find(cat => cat.id === urlId);
  if (!cat) return;
  console.log(cat);
  if (urlId.startsWith('cat')) {
    navView.setCurrentCategory(cat);
  }
};

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
  // hashcnage
  notesView.hashChangeHandler(controlHashChange);
};
init();
