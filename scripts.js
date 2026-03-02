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

function removeBookFromLibrary(bookId) {
    const bookIndex = library.findIndex(book => book.id === bookId);
    if (bookIndex > -1) {
        library.splice(bookIndex, 1);
    }
}

const bookList = document.getElementById('bookList');
const addBookForm = document.getElementById('addBookForm');

addBookForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = this.elements['title'].value;
    const author = this.elements['author'].value;
    const pages = parseInt(this.elements['pages'].value);
    const read = this.elements['read'].checked;
    const id = crypto.randomUUID();

    const newBook = new Book(id, title, author, pages, read);
    addBookToLibrary(newBook);

    let bookItem = document.createElement('li');
    bookItem.textContent = `${newBook.title} by ${newBook.author}, ${newBook.pages} pages - ${newBook.read ? 'Read' : 'Not Read'}`;
    bookList.appendChild(bookItem);
    this.reset();
});