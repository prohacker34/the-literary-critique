
let baseUrl = 'http://localhost:3000/books';

const addBookForm = document.getElementById('add-book-form');
addBookForm.addEventListener('submit', event => {
  event.preventDefault();

  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const genre = document.getElementById('genre').value.trim();


  if (!title || !author || !genre) {
    alert('Please fill out all fields.');
    return;
  }

  const newBook = { title, author, genre };
  fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBook),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(book => {
      console.log(book);
      alert('Book successfully added!');
      addBookForm.reset();
      fetchBooks();
    })
    .catch(error => {
      console.error( error);
    });
});





