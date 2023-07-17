const cardContainer = document.querySelector('main');
const newCardButton = document.querySelector('.card.new');
const infoModal = document.querySelector('.book-info-modal');
const dismissButton = document.querySelector('.book-info-modal .dismiss-modal');

let hungerGames = new Book('The hunger games', 'Suzzane Collins', 384, true)
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

  const status = addElementToCard(card, 'div');
  status.classList.add('read-status');
  if( this.readByUser ) status.classList.add('read');
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  book.display();
}

function addElementToCard(parent, type, content){
  const element = document.createElement(type);
  if( content ){
    element.textContent = content;
  }
  parent.appendChild(element);
  return element;
}

newCardButton.addEventListener('click', () =>{
  addBookToLibrary(hungerGames);
})

dismissButton.addEventListener('click', () => {
  infoModal.remove();
})

infoModal.addEventListener('click', (e) => {
  if(e.target === infoModal){
    infoModal.remove();
  }
})