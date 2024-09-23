import React, { useState, useEffect } from 'react';
import StartGame from './StartGame';
import Header from './Header';
import Results from './Results';

function GameLogic() {
    const [difficulty, setDifficulty] = useState(''); // State for game difficulty
    const [score, setScore] = useState(0); // State for current score
    const [highScore, setHighScore] = useState(0); // State for high score
    const [gameStarted, setGameStarted] = useState(false); // State to track if the game has started
    const [gameOver, setGameOver] = useState(false); // State to track if the game is over
    const [numberOfCards, setNumberOfCards] = useState(0); // State for number of cards based on difficulty
    const [data, setData] = useState([]); // State for card data
    const [clickedPokemon, setClickedPokemon] = useState([]); // State for clicked Pokémon names
    const [shuffling, setShuffling] = useState(false); // State to track if cards are shuffling
    const [won, setWon] = useState(false); // State to track if the player won
    const [loading, setLoading] = useState(false); // State to track if data is loading

    // Fetch Pokémon card data when number of cards changes
    useEffect(() => {
        if (numberOfCards > 0) {
            setLoading(true);
            fetch(`https://api.pokemontcg.io/v2/cards?pageSize=100`)
                .then(response => response.json())
                .then(json => {
                    const allPokemonData = json.data.map(card => ({
                        name: card.name,
                        image: card.images.small
                    }));
                    const selectedPokemonData = shuffleArray(allPokemonData).slice(0, numberOfCards);
                    setData(selectedPokemonData);
                    setLoading(false);
                    console.log(selectedPokemonData);
                })
                .catch(error => {
                    console.error(error);
                    setLoading(false);
                });
        }
    }, [numberOfCards]);

    // Set number of cards based on difficulty
    useEffect(() => {
        switch (difficulty) {
            case 'easy':
                setNumberOfCards(4);
                console.log('Set to Easy');
                setGameStarted(true);
                break;
            case 'medium':
                setNumberOfCards(8);
                console.log('Set to Medium');
                setGameStarted(true);
                break;
            case 'hard':
                setNumberOfCards(12);
                console.log('Set to Hard');
                setGameStarted(true);
                break;
            default:
                break;
        }
    }, [difficulty]);

    // Update high score if game is over and current score is higher
    useEffect(() => {
        if (gameOver && score > highScore) {
            setHighScore(score);
        }
    }, [gameOver, score, highScore]);

    // Handle card click event
    const handleCardClick = (name) => {
        if (clickedPokemon.includes(name)) {
            setGameOver(true);
            setWon(false);
        } else {
            setClickedPokemon([...clickedPokemon, name]);
            setScore(score + 1);
            if (clickedPokemon.length + 1 === numberOfCards) {
                setGameOver(true);
                setWon(true);
            } else {
                triggerShuffle();
            }
        }
    };

    // Trigger card shuffle animation
    const triggerShuffle = () => {
        setShuffling(true);
        setTimeout(() => {
            setData(shuffleArray([...data]));
            setShuffling(false);
        }, 600);
    };

    // Shuffle array elements
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // Restart the game
    const restartGame = () => {
        setGameOver(false);
        setGameStarted(false);
        setDifficulty('');
        setNumberOfCards(0);
        setScore(0);
        setClickedPokemon([]);
        setWon(false);
    };

    return (
        <>
            <Header score={score} highScore={highScore} />

            {!gameStarted && !gameOver && (
                <StartGame setDifficulty={setDifficulty} />
            )}

            {gameStarted && !gameOver && !loading && (
                <div className={`card-container ${shuffling ? 'shuffling' : ''}`}>
                    {data.map((pokemon, index) => (
                        <div key={index} className={`card ${shuffling ? 'flipping' : ''}`} onClick={() => handleCardClick(pokemon.name)}>
                            <div className="card-inner">
                                <div className="card-front">
                                    <img src={pokemon.image} alt={pokemon.name} />
                                </div>
                                <div className="card-back">
                                    <img src="/cardback.png" alt="Pokemon Card Back" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {loading && (
                <div className="loading-text">Loading...</div>
            )}

            {gameOver && (
                <Results score={score} highScore={highScore} restartGame={restartGame} won={won} />
            )}
        </>
    );
}

export default GameLogic;