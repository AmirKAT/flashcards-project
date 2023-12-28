import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from './CardForm';

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
    setCard({ front: "", back: "" });
  };

  const handleDone = () => {
    history.push(`/decks/${deckId}`);
  };

  const handleChange = (event) => {
    setCard({ ...card, [event.target.name]: event.target.value });
  };

  return (
    <CardForm
      card={card}
      deck={deck}
      deckId={deckId}
      isEditing={false}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleSecondaryAction={handleDone}
    />
  );
}

export default AddCard;
