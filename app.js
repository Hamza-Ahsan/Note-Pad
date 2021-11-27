console.log("Notes App");
showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function () {
  let noteTxt = document.getElementById("noteTxt");
  let addTitle = document.getElementById('addTitle')
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  let obj = {
    title: addTitle.value,
    note: noteTxt.value
  }
  noteObj.push(obj);
  localStorage.setItem("notes", JSON.stringify(noteObj));
  // console.log(noteObj);
  noteTxt.value = "";
  addTitle.value = ''
  showNotes();
});

function showNotes() {
  let showNotes = document.getElementById("showNotes");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  let html = "";
  noteObj.forEach(function (element, index) {
    html += `
      <div class="noteCard card my-2 mx-2" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Note ${index + 1, element.title}</h5>
        <p id='editText' class="card-text">${element.note}</p>
        <button onClick='delNote()' class="btn btn-danger">Delete</button>
        <button id=${index} onClick='editNote()' class="btn btn-secondary">Edit Note</button>
      </div>
    </div>`;
  });
  if (noteObj.length != 0) {
    showNotes.innerHTML = html;
  } else {
    showNotes.innerHTML = `<h5>Nothing to show please enter the note to show<h5/>`;
  }
}

function delNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  noteObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(noteObj));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value;
  let noteCard = document.getElementsByClassName("noteCard");
  Array.from(noteCard).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (inputVal.includes(cardTxt)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    // console.log(cardTxt);
  });
});

function editNote() {
  localStorage.getItem('notes')
  let editText = document.getElementById("editText");
  addEventListener('click', function(){
    let textLength = document.getElementsByClassName('textarea').length
    if(textLength == 0){
      let html = editText.innerHTML
      editText.innerHTML = `<textarea id='textarea' class="textarea form-control is-invalid" required>${html}</textarea>`
    }

    let textarea = document.getElementById('textarea')
    textarea.addEventListener('blur', function(){
      editText.innerHTML = textarea.value
      localStorage.setItem('notes', textarea.value)
    })
  })
}