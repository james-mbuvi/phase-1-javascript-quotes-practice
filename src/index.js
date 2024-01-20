// document.addEventListener('DOMContentLoaded', function() {
//     const quoteList = document.getElementById('quote-list');
//     const newQuoteForm = document.getElementById('new-quote-form');
  
//     // Function to fetch and render quotes
//     function fetchAndRenderQuotes() {
//       fetch('http://localhost:3000/quotes?_embed=likes')
//         .then(response => response.json())
//         .then(quotes => renderQuotes(quotes));
//     }
  
//     // Function to render quotes
//     function renderQuotes(quotes) {
//       quoteList.innerHTML = '';
//       quotes.forEach(quote => {
//         const li = document.createElement('li');
//         li.classList.add('quote-card');
//         li.innerHTML = `
//           <blockquote class="blockquote">
//             <p class="mb-0">${quote.quote}</p>
//             <footer class="blockquote-footer">${quote.author}</footer>
//             <br>
//             <button class='btn-success' data-quote-id="${quote.id}">Likes: <span>${quote.likes.length}</span></button>
//             <button class='btn-danger' data-quote-id="${quote.id}">Delete</button>
//           </blockquote>
//         `;
//         li.querySelector('.btn-success').addEventListener('click', likeQuote);
//         li.querySelector('.btn-danger').addEventListener('click', deleteQuote);
//         quoteList.appendChild(li);
//       });
//     }
  
//     // Function to handle quote liking
//     function likeQuote(event) {
//       const quoteId = event.target.dataset.quoteId;
//       const userId = 1; // Hardcoded user ID for simplicity
  
//       fetch('http://localhost:3000/likes', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify({ quoteId, userId })
//       })
//       .then(response => response.json())
//       .then(fetchAndRenderQuotes);
//     }
  
//     // Function to handle quote deletion
//     function deleteQuote(event) {
//       const quoteId = event.target.dataset.quoteId;
  
//       fetch(`http://localhost:3000/quotes/${quoteId}`, {
//         method: 'DELETE'
//       })
//       .then(fetchAndRenderQuotes);
//     }
  
//     // Event listener for submitting new quote form
//     newQuoteForm.addEventListener('submit', function(event) {
//       event.preventDefault();
  
//       const quote = event.target.quote.value;
//       const author = event.target.author.value;
  
//       fetch('http://localhost:3000/quotes', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify({ quote, author })
//       })
//       .then(response => response.json())
//       .then(fetchAndRenderQuotes);
  
//       // Clear form fields
//       event.target.reset();
//     });
  
//     // Fetch and render quotes on page load
//     fetchAndRenderQuotes();
//   });
  





















































document.addEventListener('DOMContentLoaded', function () {
    const quoteList = document.getElementById('quote-list');
    const newQuoteForm = document.getElementById('new-quote-form');

    // Function to fetch and render quotes
    function fetchAndRenderQuotes() {
      fetch('http://localhost:3000/quotes?_embed=likes')
        .then(response => response.json())
        .then(quotes => renderQuotes(quotes));
    }

    // Function to render quotes in the list
    function renderQuotes(quotes) {
      quoteList.innerHTML = '';
      quotes.forEach(quote => {
        const li = document.createElement('li');
        li.classList.add('quote-card');
        li.innerHTML = `
          <blockquote class="blockquote">
            <p class="mb-0">${quote.quote}</p>
            <footer class="blockquote-footer">${quote.author}</footer>
            <br>
            <button class='btn-success' onclick="likeQuote(${quote.id})">Likes: <span>${quote.likes.length}</span></button>
            <button class='btn-danger' onclick="deleteQuote(${quote.id})">Delete</button>
          </blockquote>
        `;
        quoteList.appendChild(li);
      });
    }

    // Function to submit new quote
    newQuoteForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const newQuote = document.getElementById('new-quote').value;
      const author = document.getElementById('author').value;

      if (newQuote && author) {
        createQuote(newQuote, author);
      }
    });

    // Function to create a new quote
    function createQuote(quote, author) {
      fetch('http://localhost:3000/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ quote, author, likes: [] })
      })
        .then(response => response.json())
        .then(() => {
          fetchAndRenderQuotes();
          newQuoteForm.reset();
        });
    }

    // Function to delete a quote
    window.deleteQuote = function (quoteId) {
      fetch(`http://localhost:3000/quotes/${quoteId}`, {
        method: 'DELETE'
      })
        .then(() => fetchAndRenderQuotes());
    };

    // Function to like a quote
    window.likeQuote = function (quoteId) {
      fetch(`http://localhost:3000/quotes/${quoteId}`)
        .then(response => response.json())
        .then(quote => {
          const updatedLikes = [...quote.likes, { "id": 1, "username": "pouros" }];
          return fetch(`http://localhost:3000/quotes/${quoteId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({ likes: updatedLikes })
          });
        })
        .then(() => fetchAndRenderQuotes());
    };

    // Fetch and render quotes on page load
    fetchAndRenderQuotes();
  });