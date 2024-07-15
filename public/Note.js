let listnotes = JSON.parse(localStorage.getItem('notes')) || [];
let edit = false;
let editId = null;

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#Formulario")) {
        const formulario = document.querySelector("#Formulario");
        const nameInput = document.querySelector("#name");
        const contentInput = document.querySelector("#content");
        const labelInput = document.querySelector("#label");

        formulario.addEventListener("submit", validarFormulario);

        function validarFormulario(e) {
            e.preventDefault();

            if (nameInput.value === "" || contentInput.value === "" || labelInput.value === "") {
                alert("Todos los campos son obligatorios");
                return;
            }

            const objnotes = {
                id: edit ? editId : Date.now(),
                name: nameInput.value,
                content: contentInput.value,
                fechaCreacion: edit ? listnotes.find(note => note.id === editId).fechaCreacion : new Date(),
                fechaUltimaModificacion: new Date(),
                label: labelInput.value
            };

            if (edit) {
                editnote(objnotes);
                edit = false;
                editId = null;
            } else {
                addnote(objnotes);
            }
        }

        function addnote(note) {
            listnotes.push(note);
            localStorage.setItem('notes', JSON.stringify(listnotes));
            alert("Nota agregada");
            formulario.reset();
            window.location.href = 'home.html'; // Redirigir al home
        }

        function editnote(updatedNote) {
            listnotes = listnotes.map(note => note.id === updatedNote.id ? updatedNote : note);
            localStorage.setItem('notes', JSON.stringify(listnotes));
            alert("Nota editada");
            formulario.reset();
            window.location.href = 'home.html'; // Redirigir al home
        }

        // Check if there's a note to edit in localStorage
        const editNote = JSON.parse(localStorage.getItem('editNote'));
        if (editNote) {
            nameInput.value = editNote.name;
            contentInput.value = editNote.content;
            labelInput.value = editNote.label;
            edit = true;
            editId = editNote.id;
            localStorage.removeItem('editNote');
        }
    } else {
        shownotes();
    }
});

function shownotes() {
    const divnotes = document.querySelector(".div-notes");
    divnotes.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevas notas

    listnotes.forEach(note => {
        const { id, name, content, label } = note;

        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");

        const namePara = document.createElement("p");
        namePara.textContent = `Nombre: ${name}`;
        
        const contentPara = document.createElement("p");
        contentPara.textContent = `Contenido: ${content}`;
        
        const labelPara = document.createElement("p");
        labelPara.textContent = `Etiqueta: ${label}`;

        const editButton = document.createElement("button");
        editButton.onclick = () => editNoteForm(id);
        editButton.textContent = "Edit";
        editButton.classList.add("btn", "btn-edit");

        const removeButton = document.createElement("button");
        removeButton.onclick = () => removenote(id);
        removeButton.textContent = "Remove";
        removeButton.classList.add("btn", "btn-remove");

        noteDiv.appendChild(namePara);
        noteDiv.appendChild(contentPara);
        noteDiv.appendChild(labelPara);
        noteDiv.appendChild(editButton);
        noteDiv.appendChild(removeButton);

        divnotes.appendChild(noteDiv);
    });
}

function editNoteForm(id) {
    const note = listnotes.find(note => note.id === id);
    if (note) {
        localStorage.setItem('editNote', JSON.stringify(note));
        window.location.href = 'Newnote.html';
    }
}

function removenote(id) {
    listnotes = listnotes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(listnotes));
    shownotes();
}






