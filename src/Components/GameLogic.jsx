import React, {useState, useEffect} from 'react';
import StartGame from './StartGame';
import Header from './Header';
import Results from './Results';

function GameLogic() {
    const [difficulty, setDifficulty] = useState('')
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [numberOfCards, setNumberOfCards] = useState(0);

    useEffect(() => {
        switch(difficulty) {
            case 'easy':
                setNumberOfCards(4)
                console.log('Set to Easy')
                setGameStarted(true)
                break;
            case 'medium':
                setNumberOfCards(8)
                console.log('Set to Medium')
                setGameStarted(true)
                break;
            case 'hard':
                setNumberOfCards(12)
                console.log('Set to Hard')
                setGameStarted(true)
                break;
        }
    }, [difficulty])

    useEffect(() => {
        switch(gameStarted) {
            case true:
                console.log(numberOfCards, gameStarted)
        }
    }, [gameStarted])

    useEffect(() => {
        if (gameStarted === false && gameOver === false) {
            setScore(0)
        }
    })

    const restartGame = () => {
        setGameOver(false)
        setGameStarted(false)
        setDifficulty('')
    }

    return (
        <>
            <Header score={score} highScore={highScore}/>

            {!gameStarted && (
            <StartGame setDifficulty={setDifficulty}/>
            )}

            {gameStarted && !gameOver && (
                <>
                <div>
                    <button onClick={() => setScore(10)}>Set Score 10</button>
                    <button onClick={() => restartGame()}>Game Over</button>
                </div>
                </>
            )}

            {gameOver && (
                <Results 
                setGameOver={setGameOver} 
                setGameStarted={setGameStarted} 
                />
            )}
        </>
    );
}

export default GameLogic;