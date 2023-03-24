{
  'use strict';

  const select = {
    templateOf: {
      menuBook: '#template-book',
    },
    containerOf: {
      list: '.books-list',
      filters: '.filters',
    },
    book: {
      image: '.book__image',
    }
  };
  const classNames = {
    favorite: 'favorite'
  };

  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.menuBook).innerHTML),
  };

  class BooksList {
    constructor() {
      const thisBooksList = this;

      thisBooksList.favoriteBooks = [];

      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
    }
    render() {
      const thisBooksList = this;

      for (let book of dataSource.books) {
        const generatedHTML = templates.books(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        thisBooksList.booksContainer.appendChild(generatedDOM);
      }
    }
    getElements() {
      const thisBooksList = this;

      thisBooksList.booksContainer = document.querySelector(select.containerOf.list);
    }
    initActions() {
      const thisBooksList = this;

      thisBooksList.booksContainer.addEventListener('dblclick', (event) => {
        event.preventDefault();
        const targetBook = event.target.offsetParent.getAttribute('data-id');
        if (!thisBooksList.favoriteBooks.includes(targetBook)) {
          event.target.offsetParent.classList.add(classNames.favorite);
          thisBooksList.favoriteBooks.push(targetBook);
        } else {
          event.target.offsetParent.classList.remove(classNames.favorite);
          thisBooksList.favoriteBooks.pop(targetBook);
        }
      });
    }
  }
  new BooksList();
}

