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

// Modal generator
function Modal(title, content = [], actions = {}) {
  this.title = title;
  this.content = content;
  this.actions = actions;
}

function ModalAction(name, action){
  this.name = name;
  this.action = action;
}

HTMLElement.prototype.addInputPair = function (type, id, label, placeholder){
  type === 'checkbox' ? this.append(
    createInput(type, id),
    createLabel(id, label)
  ) :
  this.append(
    createLabel(id, label), 
    createInput(type, id, placeholder)
  )
}

Modal.prototype.toNode = function() {
  const root = createElement('div', '', 'modal');
  const content = this.content;
  content.classList.add('content');

  // append actions to content
  const actionsContainer = createElement('div', '', 'actions');
  for (const key in this.actions) {
    if (Object.hasOwnProperty.call(this.actions, key)) {
      actionsContainer.append(this.actions[key].toNode(key))
    }
  }
  content.append(actionsContainer)
  root.append(this.content);
  return root;
}

ModalAction.prototype.toNode = function(cls, type = 'button'){
  const root = createElement('button', this.name, cls);
  root.type = type;
  root.addEventListener('click', () => {
    this.action();
  })
  return root
}

function createLabel(id, content) {
  const label = createElement('label', content);
  label.htmlFor = id;
  return label;
}

function createInput(type, id, placeholder = '') {
  const input = createElement('input');
  input.type = type;
  input.id = id;
  input.placeholder = placeholder;
  return input
}

function createElement(type, content, cls) {
  const element = document.createElement(type);
  element.textContent = content;
  element.classList.add(cls);
  return element;
}

// My modal
const newBookForm = document.createElement('form');
const inputGrid = createElement('div', '', 'input-grid');
inputGrid.addInputPair('text', 'title', 'Title:', 'The Hunger Games');
inputGrid.addInputPair('text', 'author', 'Author:', 'Suzanne Collins');
inputGrid.addInputPair('number', 'pages', 'Pages:', '384');

newBookForm.append(inputGrid);
newBookForm.addInputPair('checkbox', 'read-by-user', "I've read this book");

const inputBook = new Modal('New Book');
inputBook.content = newBookForm;
inputBook.actions.primary = new ModalAction('Add to library', addBookToLibrary);
inputBook.actions.dismiss = new ModalAction('Cancel');
