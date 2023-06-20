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

    const renderNote = () => {
        hide(noteSaveBtn);

        if (activeNotes.id) {
            noteTitle.setAttribute("readonly" , true);
            noteBody.setAttribute("readonly" , true);
            noteTitle.value = activeNotes.title;
            noteBody.value = activeNotes.body;
        }else{
            noteTitle.removeAttreibute("readonly");
            noteBody.removeAttreibute("readonly");
            noteTitle.value = "";
            noteBody.value = "";
        }
    };

    const handelNoteSave = () => {
        const newNote = {
            title: noteTitle.value,
            text: noteBody.value,
        };
        saveNote(newNote).then(() => {
            getAndRenderNotes();
            renderNote();
        });
    };

    const handelNoteDelete = (e) => {
        e.stopPropagation();

        const note = e.target;
        const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

        if (activeNotes.id === noteId) {
            activeNotes = {};
        }

        deleteNote(noteId).then(() => {
            getAndRenderNotes();
            renderNote();
        });
    };

    const handelNoteView = (e) => {
        e.preventDefault();
        activeNotes = JSON.parse(e.target.parentElement.getAttribute('data-note'));
        renderNote();
    };

    const handelNewNoteView = (e) => {
        activeNotes = {};
        renderNote();
    };

    const handelRenderSaveBtn = () => {
        if(!noteTitle.value.trim() || !noteBody.value.trim()){
            hide(noteSaveBtn);
        }else{
            show(noteSaveBtn);
        }
    };

    