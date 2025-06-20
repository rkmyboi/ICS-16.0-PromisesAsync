/**
 * Author: Rishi Kaul
 * ICS4U Project 16.0 – Async/Promises
 * 
 * I went above and beyond the standard example by using a real-world asynchronous API call.
 * Instead of just simulating delay with setTimeout, this app fetches a random joke from a public API,
 * handles async data with Promises, and includes loading and error handling in the UI.
 * This shows practical use of .then() / .catch() with a real async operation.
 */

import { useEffect, useState } from 'react';

function App() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch a random joke from the public joke API (asynchronous call)
    const fetchJoke = () => {
      return fetch('https://official-joke-api.appspot.com/jokes/random')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => `${data.setup} — ${data.punchline}`);
    };

    fetchJoke()
      .then(jokeText => {
        setJoke(jokeText);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch joke. Please try again.');
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'Arial' }}>
      <h1>Asynchronous Joke Generator</h1>
      {loading && <p>Loading joke...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && <p>{joke}</p>}
    </div>
  );
}

export default App;
