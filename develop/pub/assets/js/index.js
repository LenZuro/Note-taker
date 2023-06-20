let noteTitle; 
let noteBody;
let noteSaveBtn;
let newNoteBtn;
let noteList;

if (window.location.pathname === "/notes") {
    noteTitle = document.querySelector('.note-title');
    noteBody = document.querySelector(".note-body");
    noteSaveBtn = document.querySelector(".save-button");
    newNoteBtn = document.querySelector(".new-note");
    noteList = document.querySelector(".list-container .listgroup")
}