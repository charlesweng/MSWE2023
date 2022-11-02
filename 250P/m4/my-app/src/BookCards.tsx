import { Button, Card, Row } from "react-bootstrap";
import Book from "./Book"

type BookCardType = {
  listItems: Book[]
}

const BookCard = (card: Book, index: number) => {
  return (
    <Card style={{ width: '18rem' }} className="ms-3 me-3 mb-3">
      <Card.Img variant="top" src={card.image} />
      <Card.Body>
        <Card.Title>{card.name}</Card.Title>
        <Card.Text>
          {card.author}
        </Card.Text>
        <a href={(card.link === '') ? '#' : card.link}>
          <Button variant="primary">Buy</Button>
        </a>
      </Card.Body>
    </Card>
  );
}

const BookCards = ({ listItems }: BookCardType) => {
  return (
    <div className="container-fluid">
      <Row md={3}>
        {listItems.map(BookCard)}
      </Row>
    </div>
  );
}

export default BookCards;