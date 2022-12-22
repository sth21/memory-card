import { useState, useEffect, useRef } from 'react';
import uniqid from 'uniqid';
import Card from './Card';
import Scoreboard from './Scoreboard';

export default function App() {
  const [ gameOver, setGameOver ] = useState(false);
  
  const [ currentScore, setCurrentScore ] = useState(0);

  const [ cards, setCards ] = useState([
    { name: "Walter White", imgSrc: "", hasBeenClicked: false, originalIndex: 0, key: uniqid() },
    { name: "Jesse Pinkman", imgSrc: "", hasBeenClicked: false, originalIndex: 1, key: uniqid() },
    { name: "Saul Goodman", imgSrc: "", hasBeenClicked: false, originalIndex: 2, key: uniqid() },
    { name: "Hank Schrader", imgSrc: "", hasBeenClicked: false, originalIndex: 3, key: uniqid() },
    { name: "Marie Schrader", imgSrc: "", hasBeenClicked: false, originalIndex: 4, key: uniqid() },
    { name: "Skyler White", imgSrc: "", hasBeenClicked: false, originalIndex: 5, key: uniqid() },
    { name: "Walter White Jr.", imgSrc: "", hasBeenClicked: false, originalIndex: 6, key: uniqid() },
    { name: "Mike Ehrmantraut", imgSrc: "", hasBeenClicked: false, originalIndex: 7, key: uniqid() }
  ]);

  const cardsArray = useRef();

  const handleClick = (e) => {

    // Acquire index linked to cards array
    const index = (e.target.children.length === 0) 
      ? parseInt(e.target.parentNode.dataset.index, 10)
      : parseInt(e.target.dataset.index, 10);
    let tempCards = [...cards];

    // Check if card has been clicked
    if (tempCards[index].hasBeenClicked) {
      // If card has been clicked, set currentScore to 0 and reset cards
      tempCards = tempCards.map((card) => {
        let tempCard = card;
        tempCard.hasBeenClicked = false;
        return tempCard;
      });
      setCurrentScore(0);
    } else {
      // If card has not been clicked, set clicked to true and increment current score
      tempCards[index].hasBeenClicked = true;
      setCurrentScore(currentScore + 1);
    }
    // Sort cards back into order so that originalIndex property remains true when sorting in useEffect
    setCards(tempCards.sort((a, b) => a.originalIndex - b.originalIndex));
  };
  
  useEffect(() => {
    // Shuffle cards
    cardsArray.current = 
      cards
      .map((card) => ({ card, sortKey: Math.random() }))
      .sort((a, b) => a.sortKey - b.sortKey)
      .map(({ card }) => card)
      .map((card) => 
        <Card 
          name = { card.name } 
          imgSrc = { card.imgSrc } 
          handleClick = { handleClick } 
          index = { card.originalIndex }
          key = { card.key }
        />);
  });

  return (
    <div className="App">
      { cardsArray.current }
      <Scoreboard currentScore = { currentScore } />
    </div>
  );
}