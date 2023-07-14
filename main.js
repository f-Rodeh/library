let myLibrary = [];

function Book(title, author, pagesCount, readByUser) {
  this.title = title;
  this.author = author;
  this.pagesCount = pagesCount;
  this.readByUser  = readByUser;
}

Book.prototype.display = function (){
  const card = document.createElement('div');
  card.classList.add('card');
  cardContainer.appendChild(card);

  addElementToCard(card, 'h1', this.title);
  addElementToCard(card, 'h2', this.author);
  addElementToCard(card, 'span', this.pagesCount + ' pages');
  addElementToCard(card, 'div')
    .classList.add('read-status');
}

let hungerGames = new Book('The hunger games', 'Suzzane Collins', 384, true)

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const cardContainer = document.querySelector('main');

function displayLibrary() {
  for (const book of myLibrary) {
    book.display();
  }
}

function addElementToCard(parent, type, content){
  const element = document.createElement(type);
  if( content ){
    element.textContent = content;
  }
  parent.appendChild(element);
  return element;
}