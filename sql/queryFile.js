// File sql.js

const { QueryFile } = require('pg-promise');
const { join: joinPath } = require('path');

// Helper for linking to external query files:
function sql(file) {
  const fullPath = joinPath(__dirname, file); // generating full path;
  return new QueryFile(fullPath, { minify: true });
}

module.exports = {
  // external queries for todo:
  todo: {
    getList: sql('todo/getList.sql'),
    getTask: sql('todo/getTask.sql'),
    getTabsHeader: sql('todo/getTabsHeader.sql'),
    updateListName: sql('todo/updateListName.sql'),
    updateTaskTitle: sql('todo/updateTaskTitle.sql'),
    createNewList: sql('todo/createNewList.sql'),
    createNewTask: sql('todo/createNewTask.sql'),
    createNewNote: sql('todo/createNewNote.sql'),
    getNoteContents: sql('todo/getNoteContents.sql'),
    updateNoteContent: sql('todo/updateNoteContent.sql'),
    updateNoteTitle: sql('todo/updateNoteTitle.sql'),
    deleteNote: sql('todo/deleteNote.sql'),

    // search: sql("users/search.sql"),
    // report: sql("users/report.sql"),
  },
};
