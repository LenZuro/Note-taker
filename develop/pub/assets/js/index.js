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

const show = (elem) => {
    elem.style.display = "inline";
};

const hide = (elem) => {
    elem.style.display = "none";
};

let activeNotes = {};

const getNote = () => 
    fetch("/api/notes" , {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

const saveNote = (note) =>
    fetch("/api/notes" , {
        method: "POST",
        headers: {
            "Content-Type": "Application/json",
        },
    });

const deleteNote =  (id) =>
    fetch(`/api/notes/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "Application/json",
        },
    });