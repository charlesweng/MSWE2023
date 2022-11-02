class Book {
  name: string;
  author: string;
  link: string;
  image: string;

  constructor(name: string, author: string, link: string, image: string = "holder.js/100px180") {
    this.name = name;
    this.author = author;
    this.link = link;
    this.image = image;
  }
}

export default Book;