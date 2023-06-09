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
    favorite: 'favorite',
    hidden: 'hidden',
  };

  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.menuBook).innerHTML),
  };

  class BooksList {
    constructor() {
      const thisBooksList = this;

      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];

      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
    }
    render() {
      const thisBooksList = this;

      for (let book of dataSource.books) {
        const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;
        book.ratingBgc = ratingBgc;
        book.ratingWidth = ratingWidth;

        const generatedHTML = templates.books(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        thisBooksList.booksContainer.appendChild(generatedDOM);
      }
    }
    getElements() {
      const thisBooksList = this;

      thisBooksList.booksContainer = document.querySelector(select.containerOf.list);
      thisBooksList.booksFilter = document.querySelector(select.containerOf.filters);
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

      thisBooksList.booksFilter.addEventListener('click', (event) => {
        const filter = event.target;

        if (filter.tagName == 'INPUT' && filter.type == 'checkbox' && filter.name == 'filter'
        ) {
          let filterValue = filter.value;
          console.log('filterValue:', filterValue);

          if (filter.checked == true) {
            thisBooksList.filters.push(filterValue);
          } else {
            thisBooksList.filters.splice(thisBooksList.filters.indexOf(filterValue), 1);
          }
          console.log('filters:', thisBooksList.filters);
        }
        thisBooksList.filterBooks();
      });
    }
    filterBooks() {
      const thisBooksList = this;

      for (let book of dataSource.books) {
        let hidden = false;
        const selected = document.querySelector('.book__image[data-id="' + book.id + '"]');

        for (let filter of thisBooksList.filters) {
          if (!book.details[filter]) {
            hidden = true;
            break;
          }
        }
        if (hidden == true) {
          selected.classList.add(classNames.hidden);
        } else {
          selected.classList.remove(classNames.hidden);
        }
      }
    }
    determineRatingBgc(rating) {
      const thisBooksList = this;

      thisBooksList.ratingBgc = '';

      if (rating <= 6) {
        thisBooksList.ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        thisBooksList.ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        thisBooksList.ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        thisBooksList.ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return thisBooksList.ratingBgc;
    }
  }
  new BooksList();
}

