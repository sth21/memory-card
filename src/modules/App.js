import { useState, useEffect, useRef } from 'react';
import uniqid from 'uniqid';
import Card from './Card';
import Scoreboard from './Scoreboard';

export default function App() {
  const [ gameOver, setGameOver ] = useState(false);
  
  const [ currentScore, setCurrentScore ] = useState(0);

  const [ cards, setCards ] = useState([
    { name: "Walter White", imgSrc: "", hasBeenClicked: false, key: uniqid() },
    { name: "Jesse Pinkman", imgSrc: "", hasBeenClicked: false, key: uniqid() },
    { name: "Saul Goodman", imgSrc: "", hasBeenClicked: false, key: uniqid() },
    { name: "Hank Schrader", imgSrc: "", hasBeenClicked: false, key: uniqid() },
    { name: "Marie Schrader", imgSrc: "", hasBeenClicked: false, key: uniqid() },
    { name: "Skyler White", imgSrc: "", hasBeenClicked: false, key: uniqid() },
    { name: "Walter White Jr.", imgSrc: "", hasBeenClicked: false, key: uniqid() },
    { name: "Mike Ehrmantraut", imgSrc: "", hasBeenClicked: false, key: uniqid() }
  ]);

  const cardsArray = useRef();

  const handleClick = (e) => {
    const index = (e.target.children.length === 0) 
      ? parseInt(e.target.parentNode.dataset.index, 10)
      : parseInt(e.target.dataset.index, 10);
    let tempCards = [...cards];
    if (tempCards[index].hasBeenClicked) {
      tempCards = tempCards.map((card) => {
        let tempCard = card;
        tempCard.hasBeenClicked = false;
        return tempCard;
      });
      setCurrentScore(0);
    } else {
      tempCards[index].hasBeenClicked = true;
      setCurrentScore(currentScore + 1);
    }
    setCards(tempCards);
  };
  
  useEffect(() => {
    cardsArray.current = 
      cards
      .map((card) => ({ card, sortKey: Math.random() }))
      .sort((a, b) => a.sortKey - b.sortKey)
      .map(({ card }) => card)
      .map((card, index) => 
        <Card 
          name = { card.name } 
          imgSrc = { card.imgSrc } 
          handleClick = { handleClick } 
          index = { index }
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