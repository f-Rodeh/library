let myLibrary = [];

function Book(title, author, pagesCount, readByUser) {
  this.title = title;
  this.author = author;
  this.pagesCount = pagesCount;
  this.readByUser  = readByUser;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}