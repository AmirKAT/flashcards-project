import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readCard, updateCard } from "../utils/api";
import CardForm from './CardForm';

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
    <CardForm
      card={card}
      cardId={cardId}
      deckId={deckId}
      isEditing={true}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleSecondaryAction={handleCancel}
    />
  );
}

export default EditCard;
