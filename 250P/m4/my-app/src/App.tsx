import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Book from './Book';
import BookCards from './BookCards';
import BookForm from './BookForm';


const initialListItems = [
  new Book("HTML and CSS: Design and Build Websites", "John Duckett", "https://www.amazon.com/HTML-CSS-Design-Build-Websites/dp/1118008189", "https://d1b14unh5d6w7g.cloudfront.net/1118008189.01.S001.LXXXXXXX.jpg?Expires=1666719658&Signature=cR4zqtEcmASkS3RtzVLU0rrOFOtqwEjN1YPGSMYgsrjyRVeArq3TR1EN2rs5yec168a9Wkky9vQKvpato6sTe4~Lp5LqZi2O6WaZYEe2758H-ICNJMynG2QIj6-uqVJ6DqBqrvDDwVDF~SZH5Bzc9x8wzYFGMHkos7gyUxKklPA_&Key-Pair-Id=APKAIUO27P366FGALUMQ"),
  new Book("Modern Full-Stack Development Using TypeScript, React, Node.js, Webpack and Docker", "Frank Zammetti", "https://link.springer.com/book/10.1007/978-1-4842-5738-8", "https://m.media-amazon.com/images/P/1484257375.01._SCLZZZZZZZ_SX500_.jpg")
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