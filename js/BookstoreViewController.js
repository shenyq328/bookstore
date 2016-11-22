class BookstoreViewController {
	constructor() {
		this.bookstore = new Bookstore();
		this.serviceHandler = new ServiceHandler();
		this.attachSearchListener();
		this.attachAddListener();
	}

	attachSearchListener() {
		const form = document.querySelector('#search-form');
		form.addEventListener('submit', this.searchBook.bind(this), false)
	}
	attachAddListener() {
		const form = document.querySelector('#add-form');
		form.addEventListener('submit', this.addBookToStore.bind(this), false)
	}

	//Use Promise to synchronize the following tasks:
	//1. get book data from service
	//2. load the data to bookstore model
	//3. render the books to the page
	loadBookstore() {
		this.getBookListFromService()
			.then(this.bookstore.loadBookList.bind(this.bookstore))
			.then(this.renderBooks.bind(this))
			.catch((err) => {console.log(err);});
	}

	getBookListFromService() {
		return new Promise(
			(resolve, reject) => {
				const books = this.serviceHandler.getBookList((err, books) => {
					if (!err) {
						resolve(books);
					} else {
							reject(err);
					}
				});
			}
		);
	}

	renderBooks() {
		const el = document.querySelector('#book-list');
		el.innerHTML = '';
		this.bookstore.booklist.forEach((book) => {
			this.addBookToPage.bind(this, el, book)();
		});
	}

	addBookToPage(parent, book) {
		const li = document.createElement('li');
		const divBook = document.createElement('div');
		const bookMedia = document.createElement('a');
		const bookImage = document.createElement('img');//new Image();
		bookImage.src = 'http://devrealms.com:3003' + book.mediumImagePath;
		bookMedia.appendChild(bookImage);
		divBook.appendChild(bookMedia);

		const divBookBody = document.createElement('div');
		const title = document.createElement('h3');
		title.innerHTML = book.title;
		const author = document.createElement('h5');
		author.innerHTML = 'by ' + book.author;
		divBookBody.appendChild(title);
		divBookBody.appendChild(author);

		divBook.appendChild(divBookBody);

		li.appendChild(divBook);

		const deleteButton = document.createElement('a');
		deleteButton.href = '#';
		deleteButton.book = book;
		deleteButton.innerHTML = '[del]';
		deleteButton.addEventListener('click', this.deleteBook.bind(this), false)


		if (book.marked) {
			li.classList.add('marked');
		}

		li.appendChild(deleteButton);

		parent.appendChild(li);
	}

	addBookToStore(e) {
		e.preventDefault();
		const bookJson = {
			isbn:`${document.querySelector('#isbn').value}`,
		    title: `${document.querySelector('#title').value}`,
		    author: `${document.querySelector('#author').value}`,
		    description: `${document.querySelector('#description').value}`,
		    numberOfPages: `${document.querySelector('#numberOfPages').value}`,
		    price: {
		      amount: `${document.querySelector('#priceAmount').value}`,
		      currency: `${document.querySelector('#priceCurrency').value}`
		    },
		    images: {
		      small: `${document.querySelector('#cover').value}`,
		      medium: '',
		      large: ''
		    },
		    id: ''
		};
		const book = new Book();
		book.initByJsonObj(bookJson);
		this.serviceHandler.addBook(book, (err) => {
			if (!err) {
				const el = document.querySelector('#book-list');
				this.addBookToPage(el, book);
			}
		});
	}

	deleteBook(e) {
		const book = e.srcElement.book
		this.bookstore.deleteBook(book);
		this.serviceHandler.deleteBook(book, null);
		this.renderBooks();
	}

	searchBook(e) {
		e.preventDefault();
		const searchTerm = document
						.querySelector('#search-field')
						.value;
		this.bookstore.markMatchedBooks(searchTerm);
		this.renderBooks();
	}

	loadBookImg(book) {

	}
}