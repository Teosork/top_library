const library = [];

function Book(id,title, author, pages, read) {
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
    console.log( `${this.id},${this.title} by ${this.author}, ${this.pages} - ${this.read ? 'Read' : 'Not Read'}` );
};

Book.prototype.toggleRead = function() {
this.read = !this.read;
};

const book1 = new Book(`${crypto.randomUUID()}`, 'The Hobbit', 'J.R.R. Tolkien', 310, true);
const book2 = new Book(`${crypto.randomUUID()}`, 'The Lord of the Rings', 'J.R.R. Tolkien', 1178, false);

function addBookToLibrary(book) {
    library.push(book);
}

function removeBookFromLibrary(bookId) {
    const bookIndex = library.findIndex(book => book.id === bookId);
    if (index > -1) {
        library.splice(bookIndex, 1);
    }
}

addBookToLibrary(book1);
addBookToLibrary(book2);

console.log(library);
book1.bookInfo();
book2.bookInfo();

book1.toggleRead();
book1.bookInfo();