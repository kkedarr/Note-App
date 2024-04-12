const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

//For the click event listener
addBtn.addEventListener("click", function() {
    addNote();
});

//Save button function
const saveNotes = () => {

    //to select content textareas
    const notes = document.querySelectorAll(".note .content");

    // to select title textareas
    const titles = document.querySelectorAll(".note .title");

    const data = [];
    notes.forEach((note, index) => {
        const content = note.value;
        const title = titles[index].value;
        console.log(title);
        if (content.trim() !== "") {
            data.push({ title, content});
        }
    });
    const titlesData = data.map((item) => item.title);
    console.log(titlesData);
    localStorage.setItem("titles", JSON.stringify(titlesData));

    const contentData = data.map((item) => item.title);
    console.log(titlesData);
    localStorage.setItem("notes", JSON.stringify(contentData));
};

//Add note button 
const addNote = (text = "", title = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="icons">
        <i class="save fas fa-save"
            style="color:blue">
        </i>
        <i class="trash fas fa-trash" 
             style="color:red"> 
         </i>
    </div>
    <div class="title-div"> 
        <textarea class="title" 
            placeholder="Note title ...">
        </textarea> 
    </div> 
    <textarea class="content" 
        placeholder="Note your thoughts here ...">
    </textarea>
    `;

    note.querySelector(".title").value = title;
    note.querySelector(".content").value = text;


    function handleTrashClick() {
        note.remove();
        saveNotes();
    }

    function handleSaveClick() {
        saveNotes();
    }

    const delBtn = note.querySelector(".trash");
    const saveButton = note.querySelector(".save");
    const textareas = note.querySelectorAll("textarea");

    delBtn.addEventListener("click", handleTrashClick);
    saveButton.addEventListener("click", handleSaveClick);
    main.appendChild(note);
    saveNotes();
};

//to load all notes saved in the local storage
function loadNotes() {
    const titlesData = JSON.parse(localStorage.getItem("titles")) || [];
    const  contentData = JSON.parse(localStorage.getItem("notes")) || [];

    for (let i = 0; i < Math.max(titlesData.length, contentData.length); i++) {
        addNote(contentData[i], titlesData[i]);
    }
}

loadNotes();