 class Book {
	constructor() {
	}
	initByJsonObj(jsonBook) {
		if (!jsonBook) {
			return;
		}
		this.id 				= jsonBook.id;
		this.isbn 				= jsonBook.isbn;
		this.title 				= jsonBook.title;
		this.author 			= jsonBook.author;
		this.description 		= jsonBook.description;
		this.numberOfPages 		= jsonBook.numberOfPages;
		this.priceAmount 		= jsonBook.price.amount;
		this.priceCurrency 		= jsonBook.price.currency;
		this.smallImagePath 	= jsonBook.images.small;
		this.mediumImagePath 	= jsonBook.images.medium;
		this.largeImagePath 	= jsonBook.images.large;
	}
	loadImage(imageType, callback) {
		let targetImage;
		switch(imageType) {
			case 'small':
				this.smallImage = new Image();
				this.smallImage.src = this.smallImagePath;
				targetImage = this.smallImage;
				break;
			case 'medium':
				this.mediumImage = new Image();
				this.mediumImage.src = this.mediumImagePath;
				targetImage = this.mediumImage;
				break;
			case 'large':
				this.largeImage = new Image();
				this.largeImage.src = this.largeImagePath;
				targetImage = this.largeImage;
				break;
		}
		targetImage.addEventListener('load', callback(targetImage));
		targetImage.addEventListener('error', callback(error));
	}
	jsonFormat() {
		return `{
			isbn: ${this.isbn},
		    title: ${this.title},
		    author: ${this.author},
		    description: ${this.description},
		    numberOfPages: ${this.numberOfPages},
		    price: {
		      amount: ${this.priceAmount},
		      currency: ${this.priceCurrency}
		    },
		    images: {
		      small: ${this.smallImagePath},
		      medium: ${this.mediumImagePath},
		      large: ${this.largeImagePath}
		    },
		    id: ${this.id}
		}`;
	}
}

// -----------------------
// 	test code
// -----------------------
// const json = {
//     "isbn": "0441104029",
//     "title": "Children of Dune (Dune Chronicles, Book Three)",
//     "author": "Frank Herbert",
//     "description": "<div>The desert planet of Arrakis has begun to grow green and lush. The life-giving spice is abundant. The nine-year-old royal twins, possesing their father's supernatural powers, are being groomed as Messiahs.<br><p> But there are those who think the Imperium does not need messiahs...</p></div>",
//     "numberOfPages": "416",
//     "price": {
//       "amount": 7.99,
//       "currency": "USD"
//     },
//     "images": {
//       "small": "/uploads/covers/0441104029_sm.jpg",
//       "medium": "/uploads/covers/0441104029_md.jpg",
//       "large": "/uploads/covers/0441104029_lg.jpg"
//     },
//     "id": 1
//   };
// const book = new Book();
// book.initByJsonObj(json);
// console.log(book.jsonFormat());
