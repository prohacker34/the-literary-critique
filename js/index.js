
let baseUrl = 'http://localhost:3000/books';

fetch(baseUrl)
  .then(function(response) {
    if (!response.ok) {
      throw  error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(function(books) {
    console.log('Books fetched:', books);
    displayBooks(books);
  })
  .catch(function(error) {
    console.error('Error fetching books:', error);
  });







