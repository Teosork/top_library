const library = [];

function Book(id, title, author, pages, read) {
    if (!new.target) {
        throw Error('Book must be called with new');
    }
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.bookInfo = function() {
    console.log(`${this.id}, ${this.title} by ${this.author}, ${this.pages} - ${this.read ? 'Read' : 'Not Read'}`);
};

Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

function addBookToLibrary(book) {
    library.push(book);
}

const testBook1 = new Book(crypto.randomUUID(), 'The Hobbit', 'J.R.R. Tolkien', 310, true);
const testBook2 = new Book(crypto.randomUUID(), 'The Lord of the Rings', 'J.R.R. Tolkien', 1178, false);
const testBook3 = new Book(crypto.randomUUID(), '1984', 'George Orwell', 328, true);

addBookToLibrary(testBook1);
addBookToLibrary(testBook2);
addBookToLibrary(testBook3);

const bookList = document.getElementById('bookList');
const addBookForm = document.getElementById('addBookForm');

library.forEach((book) => {
    let bookItem = document.createElement('div');
    bookItem.classList.add('book-item');
    bookItem.textContent = `${book.title} by ${book.author}, ${book.pages} pages - ${book.read ? 'Read' : 'Not Read'}`;

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        removeBookFromLibrary(book.id);
        bookList.removeChild(bookItem);
    });
    
    let toggleButton = document.createElement('button');
    toggleButton.classList.add('toggle-button');
    toggleButton.textContent = 'Toggle Read';
    toggleButton.addEventListener('click', function() {
        book.toggleRead();
        bookItem.textContent = `${book.title} by ${book.author}, ${book.pages} pages - ${book.read ? 'Read' : 'Not Read'}`;
        bookItem.appendChild(toggleButton);
        bookItem.appendChild(deleteButton);
    });

    bookItem.appendChild(toggleButton);
    bookItem.appendChild(deleteButton);
    bookList.appendChild(bookItem);
});

function removeBookFromLibrary(bookId) {
    const bookIndex = library.findIndex(book => book.id === bookId);
    if (bookIndex > -1) {
        library.splice(bookIndex, 1);
    }
}

addBookForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = this.elements['title'].value;
    const author = this.elements['author'].value;
    const pages = parseInt(this.elements['pages'].value);
    const read = this.elements['read'].checked;
    const id = crypto.randomUUID();

    const newBook = new Book(id, title, author, pages, read);
    addBookToLibrary(newBook);

    let bookItem = document.createElement('div');
    bookItem.classList.add('book-item');
    bookItem.textContent = `${newBook.title} by ${newBook.author}, ${newBook.pages} pages - ${newBook.read ? 'Read' : 'Not Read'}`;

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        removeBookFromLibrary(newBook.id);
        bookList.removeChild(bookItem);
    });
    
    let toggleButton = document.createElement('button');
    toggleButton.classList.add('toggle-button');
    toggleButton.textContent = 'Toggle Read';
    toggleButton.addEventListener('click', function() {
        newBook.toggleRead();
        bookItem.textContent = `${newBook.title} by ${newBook.author}, ${newBook.pages} pages - ${newBook.read ? 'Read' : 'Not Read'}`;
        bookItem.appendChild(toggleButton);
        bookItem.appendChild(deleteButton);
    });

    bookItem.appendChild(toggleButton);
    bookItem.appendChild(deleteButton);
    bookList.appendChild(bookItem);
    this.reset();
});