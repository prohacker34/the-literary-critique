
let baseUrl = 'http://localhost:3000/books';

fetch(baseUrl)
  .then(function(response) {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(function(books) {
    console.log( books);
    displayBooks(books);
  })
  .catch(function(error) {
    console.error( error);
  });

  function displayBooks(books) {
    const textDisplay = document.getElementById("shelf-display");
    let displayContent = '';

    books.forEach(book => {
      displayContent += `
        <div class="book">
          <p><strong>Title:</strong> ${book.title}</p>
          <p><strong>Author:</strong> ${book.author}</p>
          <p><strong>Genre:</strong> ${book.genre}</p>
          <div class="rating" data-book-id="${book.id}">
            <span class="star" data-value="1">★</span>
            <span class="star" data-value="2">★</span>
            <span class="star" data-value="3">★</span>
            <span class="star" data-value="4">★</span>
            <span class="star" data-value="5">★</span>
          </div>
        </div>
        <hr>
      `;
    });

    textDisplay.innerHTML = displayContent;
  }








