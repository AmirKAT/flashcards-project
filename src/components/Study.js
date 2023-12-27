import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showRestartPrompt, setShowRestartPrompt] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch((error) => console.error(error));

    return () => abortController.abort();
  }, [deckId]);

  useEffect(() => {
    setCards(deck.cards || []);
  }, [deck]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowNextButton(true);
  };

  const handleNextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
      setShowNextButton(false);
    } else {
      setShowRestartPrompt(true);
      setShowNextButton(false);
    }
  };

  const handleRestartDeck = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setShowRestartPrompt(false);
    setShowNextButton(false);
  };

  const renderCardContent = () => {
    if (cards.length <= 2) {
      return (
        <div>
          <p>Not enough cards</p>
          <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
            Add Cards
          </Link>
        </div>
      );
    } else if (currentCardIndex < cards.length) {
      const card = cards[currentCardIndex];
      return (
        <div>
          <h2>Card {currentCardIndex + 1} of {cards.length}</h2>
          <h3>{isFlipped ? "Back" : "Front"}</h3>
          <p>{isFlipped ? card.back : card.front}</p>
          <button className="btn btn-primary" onClick={handleFlip}>
            Flip
          </button>
          {showNextButton && (
            <button className="btn btn-primary" onClick={handleNextCard}>
              Next
            </button>
          )}
        </div>
      );
    } else if (showRestartPrompt) {
      return (
        <div>
          <p>Restart the deck?</p>
          <button className="btn btn-primary" onClick={handleRestartDeck}>
            Restart
          </button>
          <button className="btn btn-secondary" onClick={() => history.push("/")}>
            Home
          </button>
        </div>
      );
    }
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
            Study
          </li>
        </ol>
      </nav>
      <h1>{`Study: ${deck.name}`}</h1>
      {renderCardContent()}
    </div>
  );
}

export default Study;
