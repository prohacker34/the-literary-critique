
let baseUrl = 'http://localhost:5500/books';

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

function deleteBook(bookId) {
  fetch(`${baseUrl}/${bookId}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }return response.json();

    }).then(() => {
    console.log(`Book with ID ${bookId} deleted.`);
    fetchBooks();})
    .catch(error => {
      console.error(error);
    });
}
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
    let displayContent

    books.forEach(book => {
      displayContent += `
        <div class="book">
          <p><strong>Title:</strong> ${book.title}</p>
          <p><strong>Author:</strong> ${book.author}</p>
          <p><strong>Genre:</strong> ${book.genre}</p>
         <button class="delete-book" data-book-id="${book.id}">Delete</button>
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

  const ratingElements = document.querySelectorAll('.rating');
  ratingElements.forEach(ratingElement => {
    const stars = ratingElement.querySelectorAll('.star');
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const bookId = ratingElement.getAttribute('data-book-id');
        const ratingValue = star.getAttribute('data-value');
        setRating(bookId, ratingValue, stars);
      });
    });
  });
}

function setRating(bookId, ratingValue, stars) {
  stars.forEach(star => {
    if (parseInt(star.getAttribute('data-value')) <= ratingValue) {
      star.classList.add('selected');
    } else {
      star.classList.remove('selected');
    }
  });
  fetch(`${baseUrl}/${bookId}/rating`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rating: ratingValue }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error( error);
    });
}






