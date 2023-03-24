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
      thisBooksList.booksImage = document.querySelectorAll(select.book.image);
    }

    initActions() {
      const thisBooksList = this;

      const bookImage = document.querySelectorAll(select.book.image);
      for (let image of bookImage) {
        image.addEventListener('dblclick', (event) => {
          event.preventDefault();
          image.classList.add(classNames.favorite);

          const targetBook = image.getAttribute('data-id');
          thisBooksList.favoriteBooks.push(targetBook);
        });
      }
    }
  }

  new BooksList();
}

