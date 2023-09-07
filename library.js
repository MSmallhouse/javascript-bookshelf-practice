const shelves = document.querySelector("table");
const newBookButton = document.getElementById("newBook");
const confirmButton = document.getElementById("confirmBtn");

const dialog = document.querySelector("dialog");
const formTitle = document.getElementById("title");
const formAuthor = document.getElementById("author");
const formNumberOfPages = document.getElementById("numberOfPages");
const formRead = document.getElementById("read");

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBookToLibrary(book) {
        this.books.push(book);
    }

    clearDisplay() {
        let rows = shelves.rows.length;
        for (let i=0; i<rows; i++) {
            shelves.deleteRow(0);
        }
    }

    displayBooks() {
        this.clearDisplay();

        for (let i=0; i<this.books.length; i++) {
            let book = this.books[i];
            let row = shelves.insertRow();
            row.setAttribute("row-index", `${i}`);

            let cell = row.insertCell();
            cell.textContent = `${book.title} by ${book.author}, ${book.pages} pages`;

            let readOption = document.createElement("button");
            readOption.textContent = "Read";
            readOption.setAttribute("id", `read-option-button-${i}`);
            readOption.addEventListener("click", readOptionButtonHandler);
            row.appendChild(readOption);

            let removeButton = document.createElement("button");
            removeButton.textContent = "Remove Book";
            removeButton.setAttribute("id", "remove-button");
            removeButton.addEventListener("click", removeButtonHandler);
            row.appendChild(removeButton);
        }
    }
}

const myLibrary = new Library();

let readOptionButtonHandler = function() {
    let index = this.id.charAt(this.id.length - 1);
    let book = myLibrary.books[index];
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
    myLibrary.books.splice(rowIndex, 1);
    // remove from Library now
}

newBookButton.addEventListener("click", () => {
    dialog.showModal();
})

formTitle.addEventListener("change", () => {
    confirmButton.value = newBook;
})

dialog.addEventListener("close", (e) => {
    myLibrary.displayBooks();
})

confirmButton.addEventListener("click", (event) => {
    event.preventDefault();
    let newBook = new Book(formTitle.value, formAuthor.value, formNumberOfPages.value, formRead.checked);
    myLibrary.addBookToLibrary(newBook);
    dialog.close(newBook);
})