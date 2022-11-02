import { Button, Form } from "react-bootstrap";

type BookForm = {
  bookName: string,
  author: string,
  bookLink: string,
  handleOnChangeBookName: Function,
  handleOnChangeAuthor: Function,
  handleOnChangeLink: Function,
  handleSubmit: Function
}

const BookForm = ({ bookName, author, bookLink, handleOnChangeBookName, 
  handleOnChangeAuthor, handleOnChangeLink, handleSubmit}: BookForm) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBookName">
        <Form.Control value={bookName} type="text" onChange={(event) => handleOnChangeBookName(event)}></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAuthor">
        <Form.Control value={author} type="text" onChange={(event) => handleOnChangeAuthor(event)}></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formLink">
        <Form.Control value={bookLink} type="text" onChange={(event) => handleOnChangeLink(event)}></Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={() => handleSubmit()}>Submit</Button>
    </Form>
  );
}

/* <div>
      <input value={name} onChange={(event) => handleOnChange(event)} placeholder="Add Something To List Below"></input>
      <Button className='ms-3' variant="primary" onClick={() => handleSubmit()}>Submit</Button>
    </div> */

export default BookForm;