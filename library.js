const myLibrary = [];
const shelves = document.querySelector("table");
const newBookButton = document.getElementById("newBook");
const confirmButton = document.getElementById("confirmBtn");
const dialog = document.querySelector("dialog");
const title = document.getElementById("title");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    /*this.read = read;
    this.info = function() {
        if (this.read) {
            return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
        }
        else {
            return `${this.title} by ${this.author}, ${this.pages} pages, already read`;
        }
    }*/
}

function addBookToLibrary(Book) {
    myLibrary.push(Book);
}

function displayBooks(myLibrary) {
    myLibrary.forEach((book) => {
        let row = shelves.insertRow();
        let cell = row.insertCell();
        cell.textContent = book.title;
        //cell.textContent = book.info();
    })
}

newBookButton.addEventListener("click", () => {
    dialog.showModal();
})

title.addEventListener("change", () => {
    confirmButton.value = title.value;
})

dialog.addEventListener("close", (e) => {
    let newTitle = dialog.returnValue;
    let newBook = new Book(newTitle);
    addBookToLibrary(newBook);
    displayBooks(myLibrary);
})


confirmButton.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close(title.value);
})

let book1 = new Book("book1");
addBookToLibrary(book1);

displayBooks(myLibrary);