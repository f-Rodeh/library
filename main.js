const cardContainer = document.querySelector('main');
const newCardButton = document.querySelector('.card.new');
const pageContainer = document.querySelector('.page-container');
const infoModal = document.querySelector('.book-info-modal'); 

let hungerGames = new Book('The hunger games', 'Suzzane Collins', 384, true);
let dorianGray = new Book('The picture of Dorian Gray', 'Oscar Wilde', 384, false);
let wutheringHeights = new Book('Wuthering Heights', 'Emily Bronte', 426, false);
let myLibrary = [hungerGames, dorianGray, wutheringHeights];

function Book(title, author, pagesCount, readByUser) {
  this.title = title;
  this.author = author;
  this.pagesCount = pagesCount;
  this.readByUser  = readByUser;
  this.domReference = null;
}

Book.prototype.display = function (index){
  const card = createElement('div', '', 'card')
  cardContainer.append(card);

  card.append(
    createElement('h1', this.title),
    createElement('h2', this.author),
    createElement('span', this.pagesCount + ' pages')
  );

  const status = createElement('div', '', 'read-status');
  if( this.readByUser ) status.classList.add('read');

  status.append(
    createIcon('trash-outline', deleteCard, index),
    createIcon('sync-outline')
  )
  status.classList.add('card-indexed');

  card.append(status)
  this.domReference = card;
}
for (let i = 0; i < myLibrary.length; i++) {
  myLibrary[i].display(i)
}

function assignIndices(){
  const elements = document.querySelectorAll('.card-indexed');
  let i = 0;
  elements.forEach(element => {
    if(element.classList.contains('new')) return;

    element.dataset.cardIndex = i;
    i++
  });
}

Book.prototype.delete = function() {
  this.domReference.remove();
}

function createIcon(name, action, index) {
  const icon = createElement('ion-icon');
  icon.name = name;
  if (action) icon.addEventListener('click', action.bind(icon));
  return icon;
}

function deleteCard() {
  assignIndices();
  const parent = this.parentNode;
  const index = parent.dataset.cardIndex;
  myLibrary[index].delete();
  myLibrary.splice(index, 1);
}

// modal generation
function Modal(title, type) {
  this.content = createElement(type, '', 'content');
  this.title = createElement('h1', title);
  this.actions = createElement('div', '', 'actions');
}

Modal.prototype.build = function() {
  this.content.insertBefore(this.title, this.content.firstElementChild);
  this.content.append(this.actions);
}

Modal.prototype.display = function() {
  const root = createElement('div', '', 'modal');
  root.append(this.content);

  root.addEventListener('click', (e) => {
    if(e.target === root) this.dismiss();
  })

  this.domReference = root;
  pageContainer.append(root);
}

Modal.prototype.dismiss = function() {
  deleteValues();
  this.domReference.remove()
}

function ModalAction(name, action){
  this.name = name;
  this.action = action;
}

HTMLElement.prototype.addInputPair = function (type, id, label, placeholder = ''){
  const input = createInput(type, id, placeholder);
  type === 'checkbox' 
    ? this.append(input, createLabel(id, label)) 
    : this.append( createLabel(id, label), input );
  return input;
}

ModalAction.prototype.toNode = function(cls, type = 'button'){
  const root = createElement('button', this.name, cls);
  root.type = type;
  root.addEventListener('click', this.action)
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
  input.name = id;
  return input
}

function createElement(type, content, cls) {
  const element = document.createElement(type);
  element.textContent = content;
  if(cls) element.classList.add(cls);
  return element;
}

// My modal
const newBookModal = new Modal('New Book', 'form');
newBookModal.content.method = 'get';

const addBookAction = new ModalAction('Add to library', addBookToLibrary);
const dismissAction = new ModalAction('Cancel', newBookModal.dismiss.bind(newBookModal));

newBookModal.actions.append(
  addBookAction.toNode('primary'),
  dismissAction.toNode('dismiss')
)

const inputGrid = createElement('div', '', 'input-grid');
const title = inputGrid.addInputPair('text', 'title', 'Title:', 'The Hunger Games');
const author = inputGrid.addInputPair('text', 'author', 'Author:', 'Suzanne Collins');
const pages = inputGrid.addInputPair('number', 'pages', 'Pages:', '384');

newBookModal.content.append(inputGrid);
const readByUser = newBookModal.content.addInputPair('checkbox', 'read-by-user', "I've read this book");
newBookModal.build();

// call the modal
newCardButton.addEventListener('click', () =>{
 newBookModal.display();
})

function addBookToLibrary() {
  if(!(title.value && author.value && pages.value)){
    return;
  }
  const book = new Book(
    title.value,
    author.value,
    pages.value,
    readByUser.checked
  )
  console.log(book)
  myLibrary.push(book);
  book.display();
  newBookModal.dismiss();
}

function deleteValues() {
  title.value = '';
  author.value = '';
  pages.value = '';
  readByUser.checked = false;
}