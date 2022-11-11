import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Book from './Book';
import BookCards from './BookCards';
import BookForm from './BookForm';


const initialListItems = [
  new Book("HTML and CSS: Design and Build Websites", "John Duckett", "https://www.amazon.com/HTML-CSS-Design-Build-Websites/dp/1118008189", "https://miro.medium.com/max/677/0*PsYVjTk-F17_ZJ1d"),
  new Book("Modern Full-Stack Development Using TypeScript, React, Node.js, Webpack and Docker", "Frank Zammetti", "https://link.springer.com/book/10.1007/978-1-4842-5738-8", "https://m.media-amazon.com/images/P/1484257375.01._SCLZZZZZZZ_SX500_.jpg"),
] as Book[];

function App() {
  const [listItems, setListItems] = useState(initialListItems);
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [link, setLink] = useState("");
  const [imageLink, setImageLink] = useState("");


  const handleOnChangeBookName = (event: any) => {
    setBookName(event.target.value);
  }
  const handleOnChangeAuthor = (event: any) => {
    setAuthor(event.target.value);
  }
  const handleOnChangeLink = (event: any) => {
    setLink(event.target.value);
  }
  const handleOnChangeImageLink = (event: any) => {
    setImageLink(event.target.value);
  }

  const handleSubmit = (event: any) => {
    const newListItems = listItems.concat(
      new Book(bookName, author, link, (imageLink === "") ? "holder.js/100px180" : imageLink)
    );
    setListItems(newListItems);
    setBookName('');
    setAuthor('');
    setLink('');
    setImageLink('');
  }

  return (
    <div className='grid'>
      <h1 className='mx-auto text-center'>Simple Website Built With React</h1>
      <p className='ms-3'>This html document allows you to add whatever you type in to an ordered list below.</p>
      <BookForm bookName={bookName} author={author} bookLink={link} imageLink={imageLink}
        handleOnChangeBookName={handleOnChangeBookName}
        handleOnChangeAuthor={handleOnChangeAuthor}
        handleOnChangeLink={handleOnChangeLink}
        handleOnChangeImageLink={handleOnChangeImageLink}
        handleSubmit={handleSubmit}
      />
      <hr></hr>
      <BookCards listItems={listItems}/>
    </div>
  );
}

export default App;