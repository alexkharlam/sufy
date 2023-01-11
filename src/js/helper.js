export const formatDate = function (date) {
  // formatting if date comes from local storage and got mutated
  if (date[date.length - 1] === 'Z') date = new Date(date);
  // formatting for view
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const hours = `${date.getHours()}`.padStart(2, '0');
  const minutes = `${date.getMinutes()}`.padStart(2, '0');
  return `${day}.${month}.${year}  |  ${hours}:${minutes}`;
};

// function that creates new ID for each note or category
export const newId = function (type = 'note') {
  const localName = type === 'category' ? 'lastCatId' : 'lastNoteID';

  if (!localStorage.getItem(localName)) localStorage.setItem(localName, '0');
  let curID = +localStorage.getItem(localName);
  const newID = `${++curID}`.padStart(6, '0');
  localStorage.setItem(localName, newID);
  return newID;
};

// generate random number
export const GenerateRandomNum = function (end) {
  return Math.floor(Math.random() * end);
};
