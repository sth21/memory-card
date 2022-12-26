/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import Scoreboard from './Scoreboard';
import List from './List';

export default function App() {

  // State variables
  const [ gameOver, setGameOver ] = useState(false);

  const [ roundOver, setRoundOver ] = useState(false);
  
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

  const roundTwoCards = [
    { name: "Chuck McGill", imgSrc: "", hasBeenClicked: false, originalIndex: 8, key: uniqid() },
    { name: "Kim Wexler", imgSrc: "", hasBeenClicked: false, originalIndex: 9, key: uniqid() },
    { name: "Gustavo Fring", imgSrc: "", hasBeenClicked: false, originalIndex: 10, key: uniqid() },
    { name: "Nacho Varga", imgSrc: "", hasBeenClicked: false, originalIndex: 11, key: uniqid() },
    { name: "Howard Hamlin", imgSrc: "", hasBeenClicked: false, originalIndex: 12, key: uniqid() },
    { name: "Lalo Salamanca", imgSrc: "", hasBeenClicked: false, originalIndex: 13, key: uniqid() },
  ];

  // Functions

  const resetCards = (currentCards) => {
    return currentCards.map((card) => {
      card.hasBeenClicked = false;
      return card;
    });
  };

  const handleClick = (e) => {

    // Acquire index linked to cards array
    const index = (e.target.children.length === 0) 
      ? parseInt(e.target.parentNode.dataset.index, 10)
      : parseInt(e.target.dataset.index, 10);
    let tempCards = [...cards];

    // Card == clicked
    if (tempCards[index].hasBeenClicked) {
      // currentScore == 0, reset cards
      tempCards = resetCards(tempCards);
      setCurrentScore(0);
    } else {
      // If card != clicked, set clicked == true, and current score ++
      tempCards[index].hasBeenClicked = true;
      setCurrentScore((prevCurrentScore) => prevCurrentScore + 1);
    }

    // Check if round or game is over
    if (tempCards.every((card) => card.hasBeenClicked))
      (tempCards.length > 8) ? setGameOver(true) : setRoundOver(true);

    // Sort cards into order so that originalIndex property == true when sorting in useEffect
    setCards(tempCards.sort((a, b) => a.originalIndex - b.originalIndex));
  };

  // Effects

  // End 1st round
  useEffect(() => {
    if (roundOver === false) return;
    console.log("Round Over");
    setCards((prevCards) => resetCards(prevCards).concat(roundTwoCards));
  }, [ roundOver ]);

  // End game
  useEffect(() => {
    if (gameOver === false) return;
    console.log("Game over");
    setCards((prevCards) => resetCards(prevCards).slice(0, 8));
    setRoundOver(false);
    setGameOver(false);
  }, [ gameOver ]);

  return (
    <div className="app">
      <h1>Memory Card Game</h1>
      <Scoreboard currentScore = { currentScore } />
      <List cards={ cards } handleClick={ handleClick } />
    </div>
  );
}