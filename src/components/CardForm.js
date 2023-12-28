import React from 'react';
import { Link } from "react-router-dom";

function CardForm({ card, deck, cardId, deckId, isEditing, handleChange, handleSubmit, handleSecondaryAction }) {
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>Deck {deckId}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {isEditing ? `Edit Card ${cardId}` : "Add Card"}
          </li>
        </ol>
      </nav>
      <h1>{isEditing ? `Edit Card ${cardId}` : `${deck.name}`}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">
            Front
          </label>
          <textarea
            id="front"
            name="front"
            className="form-control"
            rows="3"
            value={card.front}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">
            Back
          </label>
          <textarea
            id="back"
            name="back"
            className="form-control"
            rows="3"
            value={card.back}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary ml-2"
          onClick={handleSecondaryAction}
        >
          {isEditing ? "Cancel" : "Done"}
        </button>
      </form>
    </div>
  );
}

export default CardForm;
