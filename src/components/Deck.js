import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";

function Deck() {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const loadedDeck = await readDeck(deckId, abortController.signal);
        setDeck(loadedDeck);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    return () => abortController.abort();
  }, [deckId]);

  const handleDeleteDeck = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this deck? This action cannot be undone.");
    if (confirmDelete) {
      try {
        await deleteDeck(deckId);
        history.push("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteCard = async (cardId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this card?");
    if (confirmDelete) {
      try {
        await deleteCard(cardId);
        // Reload the deck to update the cards list after deletion
        const updatedDeck = await readDeck(deckId);
        setDeck(updatedDeck);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div className="mb-4">
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">Edit</Link>
        <Link to={`/decks/${deckId}/study`} className="btn btn-primary ml-2">Study</Link>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary ml-2">Add Cards</Link>
        <button className="btn btn-danger ml-2" onClick={handleDeleteDeck}>Delete</button>
      </div>
      <h2>Cards</h2>
      {deck.cards && deck.cards.length === 0 ? (
        <p>No cards available. Add cards to the deck.</p>
      ) : (
        <div>
          {deck.cards && deck.cards.map((card) => (
            <div key={card.id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{card.front}</h5>
                <p className="card-text">{card.back}</p>
                <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary">Edit</Link>
                <button className="btn btn-danger ml-2" onClick={() => handleDeleteCard(card.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Deck;
