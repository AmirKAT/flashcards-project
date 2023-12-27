import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../components/Home"; // Import Home component
import Study from "../components/Study"; // Import Study component
import CreateDeck from "../components/CreateDeck"; // Import CreateDeck component
import Deck from "../components/Deck"; // Import Deck component
import EditDeck from "../components/EditDeck"; // Import EditDeck component
import AddCard from "../components/AddCard"; // Import AddCard component
import EditCard from "../components/EditCard"; // Import EditCard component

function Layout() {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/decks/new" component={CreateDeck} />
          <Route exact path="/decks/:deckId" component={Deck} />
          <Route path="/decks/:deckId/study" component={Study} />
          <Route path="/decks/:deckId/edit" component={EditDeck} />
          <Route path="/decks/:deckId/cards/new" component={AddCard} />
          <Route path="/decks/:deckId/cards/:cardId/edit" component={EditCard} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default Layout;
