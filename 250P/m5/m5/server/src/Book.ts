export interface IBook {
  title: string;
  author: string;
  imageLink: string;
  link: string;
  toJSON(): Object;
}

export class Book implements IBook {
  title: string;
  author: string;
  imageLink: string;
  link: string;
  constructor(title: string, author: string, 
    link: string = "#",
    imageLink: string = "https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-03.png"
    ) {
      this.title = title;
      this.author = author;
      this.imageLink = imageLink;
      this.link = link;
  }
  
  toJSON(): Object {
    return {
      "title": this.title,
      "author": this.author,
      "imageLink": this.imageLink,
      "link": this.link
    };
  }
}