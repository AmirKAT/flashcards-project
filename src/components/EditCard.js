import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readCard, updateCard } from "../utils/api";

function EditCard() {
  const [card, setCard] = useState({ front: "", back: "" });
  const { deckId, cardId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const loadedCard = await readCard(cardId);
      setCard(loadedCard);
    };
    fetchData();
  }, [cardId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard(card);
    history.goBack();
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  const handleChange = (event) => {
    setCard({ ...card, [event.target.name]: event.target.value });
  };

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
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h1>Edit Card {cardId}</h1>
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
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditCard;
