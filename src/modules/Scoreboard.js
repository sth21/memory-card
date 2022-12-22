import { useState, useEffect } from 'react';

export default function Scoreboard(props) {
    const [ highScore, setHighScore ] = useState(0);

    useEffect(() => {
        if (props.currentScore > highScore) setHighScore(props.currentScore);
    }, [props.currentScore, highScore]);

    return (
        <div>
            <p>{ "Current Score: " + props.currentScore }</p>
            <p>{ "High Score: " + highScore }</p>
        </div>
    );
}