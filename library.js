const myLibrary = [];
const shelves = document.querySelector("table");
const newBookButton = document.getElementById("newBook");
const confirmButton = document.getElementById("confirmBtn");
const dialog = document.querySelector("dialog");
const title = document.getElementById("title");
const author = document.getElementById("author");
const numberOfPages = document.getElementById("numberOfPages");
const read = document.getElementById("read");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(Book) {
    myLibrary.push(Book);
}

function clearDisplay() {
    let rows = shelves.rows.length;
    for (let i=0; i<rows; i++) {
        shelves.deleteRow(0);
    }
}

function displayBooks() {
    clearDisplay();

    for (let i=0; i<myLibrary.length; i++) {
        let book = myLibrary[i];
        let row = shelves.insertRow();
        row.setAttribute("row-index", `${i}`);

        let cell = row.insertCell();
        cell.textContent = `${book.title} by ${book.author}, ${book.pages} pages`;

        readOption = document.createElement("button");
        readOption.textContent = "Read";
        readOption.setAttribute("id", `read-option-button-${i}`);
        readOption.addEventListener("click", readOptionButtonHandler);
        row.appendChild(readOption);

        removeButton = document.createElement("button");
        removeButton.textContent = "Remove Book";
        removeButton.setAttribute("id", "remove-button");
        removeButton.addEventListener("click", removeButtonHandler);
        row.appendChild(removeButton);

    }
}

let readOptionButtonHandler = function() {
    let index = this.id.charAt(this.id.length - 1);
    let book = myLibrary[index];
    if (this.textContent === "Read") {
        this.textContent = "Unread";
        book.read = false;
    }
    else {
        this.textContent = "Read";
        book.read = true;
    }
}

let removeButtonHandler = function() {
    let row = this.parentElement;
    let rowIndex = row.getAttribute("row-index");
    shelves.deleteRow(rowIndex);
    myLibrary.splice(rowIndex, 1);
    // remove from Library now
}

newBookButton.addEventListener("click", () => {
    dialog.showModal();
})

title.addEventListener("change", () => {
    confirmButton.value = newBook;
})

dialog.addEventListener("close", (e) => {
    displayBooks(myLibrary);
})

confirmButton.addEventListener("click", (event) => {
    event.preventDefault();
    let newBook = new Book(title.value, author.value, numberOfPages.value, read.checked);
    addBookToLibrary(newBook);
    dialog.close(newBook);
})