import express from 'express';
import { Book } from './Book';

const api = express();

const data = [
  new Book("How To Build A Website", "Robert Half"),
  new Book("How To Write An Essay", "James Wayne"),
  new Book("How Make Money", "Richard Stocks"),
  new Book("How To Draw Beautiful Images", "Dorsy Jack"),
  new Book("How To Make Friends", "Dale Carnegie"),
  new Book("How To Be An Effective Communicator", "John Baptist"),
  new Book("How To Love God", "Jesus Christ"),
  new Book("How To Build A Boat", "Noa Ark"),
];

api.get("/randombook", (req, res) => {
  let randomIndex: number = Math.floor(Math.random() * data.length);
  let jsonObj: Object = data[randomIndex].toJSON();
  res.json(jsonObj).end();
});

export default api;