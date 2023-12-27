import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";

function AddCard() {
  const [card, setCard] = useState({ front: "", back: "" });
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    };
    fetchData();
  }, [deckId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createCard(deckId, card);
    setCard({ front: "", back: "" }); // Reset form
  };

  const handleDone = () => {
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
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h1>{`${deck.name}: Add Card`}</h1>
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
          onClick={handleDone}
        >
          Done
        </button>
      </form>
    </div>
  );
}

export default AddCard;
