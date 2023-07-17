const cardContainer = document.querySelector('main');
const newCardButton = document.querySelector('.card.new');
const pageContainer = document.querySelector('.page-container');
const infoModal = document.querySelector('.book-info-modal');

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

HTMLElement.prototype.addInput = function(type, id, label, placeholder) {
  const inputLabel = document.createElement('label');
  inputLabel.textContent = label;
  inputLabel.htmlFor = id;

  const inputElement = document.createElement('input');
  inputElement.type = type;
  inputElement.id = id;
  if( placeholder ) inputElement.placeholder = placeholder;

  if ( type === 'checkbox') {
    this.appendChild(inputElement);
    this.appendChild(inputLabel);
  } else {
    this.appendChild(inputLabel);
    this.appendChild(inputElement);
  }
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
  addInfoModal();
  addBookToLibrary(hungerGames);
})

function addInfoModal() {
  const modal = document.createElement('div');
  const content = generateModalContent('New book');
  const actions = generateModalActions('Add to library', 'Cancel');

  modal.classList.add('book-info-modal');
  content.classList.add('book-info-content');
  actions.classList.add('buttons')

  content.addInput('checkbox', 'read-by-user', "I've read this book");
  content.appendChild(actions);
  modal.appendChild(content);

  modal.addEventListener('click', (e) => {
    if( e.target === modal) modal.remove();
  })

  actions.lastChild.addEventListener('click', () => modal.remove())

  console.log(modal);
  pageContainer.appendChild(modal);
}

function generateModalContent( modalTitle ) {
  const root = document.createElement('form');
  const title = document.createElement('h1');
  title.textContent = modalTitle;

  const inputGrid = document.createElement('div');
  inputGrid.addInput('text', 'title', 'Title:', 'The Hunger Games');
  inputGrid.addInput('text', 'author', 'Author:', 'Suzanne Collins');
  inputGrid.addInput('number', 'pages', 'Pages:', '386');
  inputGrid.classList.add('input-grid')

  root.appendChild(title);
  root.appendChild(inputGrid);
  return root;
}

function generateModalActions( primaryTitle, dismissTitle ) {
  const root = document.createElement('div');
  const primary = document.createElement('button');
  const dismiss = document.createElement('button');

  primary.classList.add('primary');
  primary.textContent = primaryTitle;
  primary.type = 'submit';

  dismiss.classList.add('dismiss')
  dismiss.textContent = dismissTitle;
  dismiss.type = 'button';

  root.appendChild(primary);
  root.appendChild(dismiss);
  return root;
}