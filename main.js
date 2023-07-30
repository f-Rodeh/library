const cardContainer = document.querySelector('main');
const newCardButton = document.querySelector('.card.new');
const pageContainer = document.querySelector('.page-container');
const infoModal = document.querySelector('.book-info-modal'); 

let myLibrary = [];

class Book {
  constructor(title, author, pagesCount, readByUser){
    this.title = title ;
    this.author = author ;
    this.pagesCount = pagesCount ;
    this.readByUser = readByUser ;
    this.domReference = null ;
  }

  display(){
    const card = createElement('div', '', 'card');
    const cardFooter = createCardFooter(this);
    card.append(
      createElement('h1', this.title),
      createElement('h2', this.author),
      createElement('span', this.pagesCount + ' pages'),
      cardFooter
    );
    this.domReference = card;
    cardContainer.append(card);
  }

  delete(){
    this.domReference.remove();
  }
}

for (let i = 0; i < myLibrary.length; i++) {
  myLibrary[i].display(i)
}

function createCardFooter(book) {
  const root = createElement('div', '', 'card-footer');
  const status = createElement('div', '', 'read-status');
  if(book.readByUser){
    status.classList.add('read');
  }
  status.addEventListener('click', changeReadStatus)
  root.append(
    createIcon('trash-outline', deleteCard),
    status
  )
  return root;
}

function assignIndices(){
  const footers = document.querySelectorAll('.card-footer');
  let i = 0;
  footers.forEach(element => {
    element.dataset.cardIndex = i;
    i++
  });
}

function createIcon(name, action) {
  const icon = createElement('ion-icon');
  icon.name = name;
  if (action) icon.addEventListener('click', action.bind(icon));
  return icon;
}

function deleteCard() {
  if(!confirm('Remove this book from your library?')) return;
  assignIndices();
  const parent = this.parentNode;
  const index = parent.dataset.cardIndex;
  myLibrary[index].delete();
  myLibrary.splice(index, 1);
}

function changeReadStatus() {
  assignIndices();
  const parent = this.parentNode;
  const index = parent.dataset.cardIndex;
  myLibrary[index].readByUser = !myLibrary[index].readByUser; // toggle status in array
  this.classList.toggle('read');
}

class Modal {
  constructor(title, type){
    this.content = createElement(type, '', 'content');
    this.title = createElement('h1', title);
    this.actions = createElement('div', '', 'actions');
  }

  build(){
    this.content.insertBefore(this.title, this.content.firstElementChild);
    this.content.append(this.actions);
  }

  display(){
    this.build();
    const root = createElement('div', '', 'modal');
    root.append(this.content);
  
    root.addEventListener('click', (e) => {
      if(e.target === root) this.dismiss();
    })
  
    this.domReference = root;
    pageContainer.append(root);
  }

  dismiss(){
    deleteValues();
    this.domReference.remove()
  }
}

class ModalAction {
  constructor(name, action) {
    this.name = name;
    this.action = action;
  }
  toNode(cls, type = 'button') {
    const root = createElement('button', this.name, cls);
    root.type = type;
    root.addEventListener('click', this.action);
    return root;
  }
}

HTMLElement.prototype.addInputPair = function (type, id, label, placeholder = ''){
  const input = createInput(type, id, placeholder);
  type === 'checkbox' 
    ? this.append(input, createLabel(id, label)) 
    : this.append( createLabel(id, label), input );
  return input;
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