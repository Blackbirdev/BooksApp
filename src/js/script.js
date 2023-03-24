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
      image: '.book_image',
    }
  };

  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.menuBook).innerHTML),
  };

  class BooksList {
    constructor() {
      const thisBooksList = this;

      thisBooksList.getElements();
      thisBooksList.render();
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
  }
  new BooksList();
}

