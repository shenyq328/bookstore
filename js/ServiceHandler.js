class ServiceHandler {
	constructor() {

	}
	newRequest(type, url, data, callback) {
		const xhr = new XMLHttpRequest();
		xhr.open(type, url, true);

		xhr.addEventListener('load', (res) => {
			const data = JSON.parse(xhr.responseText);
			callback(null, data);
		});

		xhr.addEventListener('error', (err) => {
			callback(err);
		});

		xhr.send(data);
	}
	getBookList(callback) {
		return this.newRequest('get', 'http://devrealms.com:3003/api/books', null, (err, data) => {
			callback(err, data);
		});
	}
	getBook(bookId, callback) {
		return this.newRequest('get', `http://devrealms.com:3003/api/books/${bookId}`, null, callback);
	}
	addBook(book, callback) {
		return this.newRequest('post', 'http://devrealms.com:3003/api/books', book.jsonFormat(), callback);
	}
	updateBook(book, callback) {
		return this.newRequest('put', `http://devrealms.com:3003/api/books/${book.jsonFormat}`, book.jsonFormat(), callback);
	}
	deleteBook(book, callback) {
		//TODO: 
	}
}
