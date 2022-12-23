import Card from './Card';

export default function List(props) {
    // Shuffle cards
    const cardsArr = () => 
        props.cards
        .map((card) => ({ card, sortKey: Math.random() }))
        .sort((a, b) => a.sortKey - b.sortKey)
        .map(({ card }) => card)
        .map((card) => (
          <Card 
              name = { card.name } 
              imgSrc = { card.imgSrc } 
              handleClick = { props.handleClick } 
              index = { card.originalIndex }
              key = { card.key }
          />
        )
    );

    return (
        <div className="cards">
            { cardsArr() }
        </div>
    );
};