import React, { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';

function App() {
  const [allQuotes, setAllQuotes] = useState('');
  const [currentQuote, setCurrentQuote] = useState({
    quote: 'Random Quote',
    author: '',
  });

  // Get QuoteData using axios
  const url = 'https://type.fit/api/quotes';
  const getQuoteData = () => {
    axios
      .get(url)
      .then((response) => {
        const quoteData = response.data;
        setAllQuotes(quoteData);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getQuoteData();
  }, []);

  // New Quote Button onClick
  const randomIndex = Math.floor(Math.random() * allQuotes.length);
  const randomQuote = allQuotes[randomIndex];
  const newQuote = () => {
    setCurrentQuote({
      quote: randomQuote.text,
      author: randomQuote.author,
    });
  };

  // Share on Twitter
  const twitterUrl =
    'https://twitter.com/intent/tweet?text=' +
    '"' +
    currentQuote.quote +
    '" ' +
    currentQuote.author;

  return (
    <div className="app">
      <h1>Random Quote Generator</h1>
      <div id="quote-box">
        <div className="quote">
          <div className="text" id="text">
            <p>{currentQuote.quote}</p>
          </div>
          <div className="author" id="author">
            <p> &#8212; {currentQuote.author}</p>
          </div>
        </div>

        <div className="buttons">
          <button id="new-quote" onClick={newQuote}>
            New Quote
          </button>
          <button>
            <a
              id="tweet-quote"
              className="twitter-share-button"
              href={twitterUrl}
              target="top"
            >
              <i className="fab fa-twitter"></i>
              &nbsp;Tweet Quote
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
