const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    return [this.title, this.author, this.pages, this.read].toString();
};

const OutPutElem = document.getElementById("book");

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
    changeButton();
}

function displayBooks() {
  OutPutElem.textContent = '';  // Clear the output element before displaying books
  for (let i = 0; i < myLibrary.length; i++) {
    let createElem = document.createElement('tr');
    createElem.className = "bookRow";
    for(let j = 0; j < 4; j++) {
      let createTd = document.createElement('td');
      if (j !== 3) {
        createTd.textContent = Object.values(myLibrary[i])[j];
        createElem.appendChild(createTd);
      } else {
        let createTdWithButton = document.createElement('button');
        createTdWithButton.className = "dynamicButton";
        createTdWithButton.setAttribute("data-index", i);
        if (Object.values(myLibrary[i])[3] === "Read") {
          createTdWithButton.textContent = Object.values(myLibrary[i])[3];
          createTdWithButton.style.backgroundColor = "green";
          createTdWithButton.style.color = "white";
        } else {
          createTdWithButton.textContent = Object.values(myLibrary[i])[3];
          createTdWithButton.style.backgroundColor = "red";
          createTdWithButton.style.color = "white";
        }
        createTd.appendChild(createTdWithButton); 
      }
      createElem.appendChild(createTd);
    }
    OutPutElem.appendChild(createElem);
    // Call the function to create and add the remove button
    addRemoveButton(createElem, i);
  }
}

// Function to create and add the remove button (need to study)
function addRemoveButton(parentElement, index) {
  let removeButtonParent = document.createElement('td');
  let removeButton = document.createElement('button');
  removeButton.textContent = "Remove";
  removeButton.setAttribute("data-index", index);
  removeButton.id = "removeButton";

  removeButton.addEventListener('click', handleClick);

  removeButtonParent.appendChild(removeButton);
  parentElement.appendChild(removeButtonParent);
}

// Click event handler
function handleClick(event) {
  // Retrieve the data-index value from the clicked button
  const dataIndex = event.target.getAttribute('data-index');

  // Convert the string to a number if needed
  const index = parseInt(dataIndex, 10);

  // Log the index or perform actions based on the index
  myLibrary.splice(index, 1);

  // Find the closest 'tr' element (or adjust based on your HTML structure)
  const parentElement = event.target.closest('tr');

  // Remove the parent element from the DOM
  if (parentElement) {
    parentElement.remove();
  }
}
Object.setPrototypeOf(addBookToLibrary.prototype, Book.prototype);

// To Change the button between Not read and read

function changeButton(){
  const getButtonAll = document.querySelectorAll(".dynamicButton");

  getButtonAll.forEach(function (getButton){
    getButton.addEventListener("click", function(){
      const dataIndexReadButton = getButton.getAttribute("data-index");
      const intIndex = parseInt(dataIndexReadButton, 10);
      const buttonText = getButton.textContent;
      if (buttonText === "Read") {
        getButton.textContent = "Not Read";
        getButton.style.backgroundColor = "red";
        getButton.style.color = "white";
        myLibrary[intIndex].read = "Not Read";
      } else if (buttonText === "Not Read") {
        getButton.textContent = "Read";
        getButton.style.backgroundColor = "green";
        getButton.style.color = "white";
        myLibrary[intIndex].read = "Read";
      }
    });
  });
}


//Create a Form inside dialog and add book using the form (need to study)

const dialog = document.getElementById("Book_Form");
const showButton = document.querySelector("dialog + button");
const closeButton = document.getElementById("submitBtn");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pageInput = document.getElementById("page");
const readInput = document.querySelector("input[name='Choice']:checked");


// open the dialog
showButton.addEventListener("click", () => {
  dialog.showModal();
})

dialog.addEventListener("close", (e) => {
    dialog.returnValue === "default"
      ? "No return value."
      : `ReturnValue: ${dialog.returnValue}.`; // Have to check for "default" rather than empty string
});

//Close dialog
closeButton.addEventListener("click", (event) => {
  event.preventDefault();
  const readInput = document.querySelector("input[name='Choice']:checked");
  let book = {
    title : titleInput.value,
    author : authorInput.value,
    page : pageInput.value
  }
  addBookToLibrary(book.title, book.author, book.page, readInput.value);
  dialog.close();
});