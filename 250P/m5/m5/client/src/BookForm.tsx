import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

type BookFormType = {
  bookName: string,
  author: string,
  bookLink: string,
  imageLink: string,
  handleOnChangeBookName: Function,
  handleOnChangeAuthor: Function,
  handleOnChangeLink: Function,
  handleOnChangeImageLink: Function,
  handleSubmit: Function
}

const BookForm = ({ bookName, author, bookLink, imageLink, handleOnChangeBookName,
  handleOnChangeAuthor, handleOnChangeLink, handleOnChangeImageLink, handleSubmit }: BookFormType) => {
  
  const [validated, setValidated] = useState(false);
  
  const handleSubmit2 = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() === true) {
      handleSubmit(event);
      setValidated(false);
    }
  }
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit2}>
      <Form.Group className="ms-3 mb-3 me-3" controlId="formBookName">
        <InputGroup hasValidation>
          <Form.Control required placeholder="Book Name" value={bookName} type="text" onChange={(event) => handleOnChangeBookName(event)}></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please give a book name.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group className="ms-3 mb-3 me-3" controlId="formAuthor">
        <InputGroup hasValidation>
          <Form.Control required placeholder="Author" value={author} type="text" onChange={(event) => handleOnChangeAuthor(event)}></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please give an author name.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group className="ms-3 mb-3 me-3" controlId="formLink">
        <Form.Control placeholder="Link (Optional)" value={bookLink} type="text" onChange={(event) => handleOnChangeLink(event)}></Form.Control>
      </Form.Group>
      <Form.Group className="ms-3 mb-3 me-3" controlId="formLink">
        <Form.Control placeholder="Image Link (Optional)" value={imageLink} type="text" onChange={(event) => handleOnChangeImageLink(event)}></Form.Control>
      </Form.Group>
      <Button className="ms-3" variant="primary" type="submit">Submit</Button>
    </Form>
  );
}

export default BookForm;