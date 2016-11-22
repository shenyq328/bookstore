class Bookstore {
	constructor() {
		this.booklist = [];
	}
	loadBookList (books) {
		if (!books) {
			return;
		}

		const promises = books.map((book) => {
			this.addBook(book);
		});

		Promise
			.all(promises)
			.then((data) => {
				console.log('All books were add to the book store.');
			})
			.catch((e) => {
				console.log(e);
			})

	}
	addBook(book) {
		if (!book) {
			return;
		}
		let newBook = new Book();
		newBook.initByJsonObj(book);
		this.booklist.push(newBook);
	}
	deleteBook(book) {
		console.log("The book id for deleted book", book.id);
		let delIndex;
		this.booklist.forEach(function(_book, _idx) {
			if (_book.id === book.id) {
				delIndex = _idx;
				return;
			}
		});

		if (Number.isInteger(delIndex)) {
			this.booklist.splice(delIndex, 1);
		}
	}
	updateBook() {

	}
	markMatchedBooks(term) {
		this.booklist.forEach((book) => {
			if (term.length === 0) {
				book.marked = false;
				return;
			}

			if (book.title.indexOf(term) > -1) {
				book.marked = true;
			} else {
				book.marked = false;
			}
		});
	}
	loadBookImg(book, callback) {
		book.loadImage('small', callback);
	}

}