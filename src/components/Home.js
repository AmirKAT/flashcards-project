import React, { useEffect, useState } from "react";
import { listDecks, deleteDeck } from "../utils/api";
import { Link, useHistory } from "react-router-dom";

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    loadDecks();
  }, []);

  const loadDecks = () => {
    const abortController = new AbortController();
    listDecks(abortController.signal)
      .then(setDecks)
      .catch((error) => console.error(error));
    return () => abortController.abort();
  };

  const handleDelete = (deckId) => {
    const confirmDelete = window.confirm("Do you really want to delete this deck?");
    if (confirmDelete) {
      deleteDeck(deckId)
        .then(() => loadDecks())
        .catch((error) => console.error(error));
    }
  };

  return (
    <div>
      <Link to="/decks/new" className="btn btn-secondary mb-2">
        Create Deck
      </Link>
      {decks.map((deck) => (
        <div key={deck.id} className="card my-2">
          <div className="card-body">
            <h5 className="card-title">{deck.name}</h5>
            <p className="card-text">{deck.description}</p>
            <p className="card-text">{`${deck.cards.length} cards`}</p>
            <Link to={`/decks/${deck.id}`} className="btn btn-primary">
              View
            </Link>
            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mx-2">
              Study
            </Link>
            <button
              onClick={() => handleDelete(deck.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
