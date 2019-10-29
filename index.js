const express = require('express');

const server = express();
server.use(express.json());

const users = ['kelly', 'dani', 'maycon', 'allan'];
const books = ['harry potter', 'legacy', 'learning javascript', 'docker for you'];

function checkUsersInArray(req, res, next){
  const user = users[req.params.indexUser];
  if(!user){
    return res.status(400).json({error: `Index user doesn't exists`});
  }
  req.user = user;
  return next();
}

function checkBooksInArray(req, res, next){
  const book = books[req.params.indexBook];
  if(!book){
    return res.status(400).json({error: `Index book doesn't exists`});
  }
  req.book = book;
  return next();
}

server.get('/', (req, res) => {
  return res.json('Hello Word');
});

server.get('/users/', (req, res) => {
  return res.json(users);
});

server.get('/users/:indexUser', checkUsersInArray, (req, res) => {
  // const id = req.params.indexUser;
  // return res.json(users[id]);
  return res.json(req.user);
});

server.get('/books/', (req, res) => {
  return res.json(books);
});

server.get('/books/:indexBook', checkBooksInArray, (req, res) => {
  return res.json(req.book);
});

server.get('/users/:indexUser/books/:indexBook', checkUsersInArray, checkBooksInArray, (req, res) => {
 // const user = req.user;
 // const book = req.book
  return res.json({ users: req.user, books: req.book });
});

//access http://localhost:3000/country?country=Brazil
//access http://localhost:3000/country?country=Brazil&city=Sao-Paulo
//access http://localhost:3000/country?country=Brazil&city=Sao-Paulo&county=Sao-Paulo
server.get('/country/', (req, res) => {
  return res.json(req.query);
});

server.listen(3000);

