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
function displayBooks(myLibrary) {
    clearDisplay();

    myLibrary.forEach((book) => {
        let row = shelves.insertRow();
        let cell = row.insertCell();
        cell.textContent = `${book.title} by ${book.author}, ${book.pages} pages`;
        cell.textContent += (book.read) ? " read" : " unread";
    })
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
    console.log(newBook);
    dialog.close(newBook);
})


displayBooks(myLibrary);