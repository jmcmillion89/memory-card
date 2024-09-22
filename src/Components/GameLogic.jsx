import React, { useState, useEffect } from 'react';
import StartGame from './StartGame';
import Header from './Header';
import Results from './Results';

function GameLogic() {
    const [difficulty, setDifficulty] = useState('');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [numberOfCards, setNumberOfCards] = useState(0);
    const [data, setData] = useState([]);
    const [clickedPokemon, setClickedPokemon] = useState([]);

    useEffect(() => {
        if (numberOfCards > 0) {
            fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
                .then(response => response.json())
                .then(json => {
                    const shuffledData = json.results.sort(() => 0.5 - Math.random());
                    const selectedData = shuffledData.slice(0, numberOfCards);
                    return Promise.all(selectedData.map(pokemon => fetch(pokemon.url).then(res => res.json())));
                })
                .then(pokemonDetails => {
                    const pokemonData = pokemonDetails.map(pokemon => ({
                        name: pokemon.name,
                        image: pokemon.sprites.front_default
                    }));
                    setData(pokemonData);
                    console.log(pokemonData);
                })
                .catch(error => console.error(error));
        }
    }, [numberOfCards]);

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
                setGameStarted(false);
                break;
        }
    }, [difficulty]);

    useEffect(() => {
        if (score === numberOfCards && gameStarted) {
            setGameOver(true);
            if (score > highScore) {
                setHighScore(score);
            }
        }});

    const handleCardClick = (pokemonName) => {
        if (clickedPokemon.includes(pokemonName)) {
            setGameOver(true);
            if (score > highScore) {
                setHighScore(score);
            }
        } else {
            setClickedPokemon(prevClicked => [...prevClicked, pokemonName]);
            setScore(prevScore => prevScore + 1);
            shuffleCards();
        }
    };

    const shuffleCards = () => {
        setData(prevData => [...prevData].sort(() => 0.5 - Math.random()));
    };

    const restartGame = () => {
        setGameOver(false);
        setGameStarted(false);
        setDifficulty('');
        setNumberOfCards(0);
        setScore(0);
        setClickedPokemon([]);
    };

    return (
        <>
            <Header score={score} highScore={highScore} />

            {!gameStarted && (
                <StartGame setDifficulty={setDifficulty} />
            )}

            {gameStarted && !gameOver && (
                <>
                    <div>
                        <button onClick={() => setScore(10)}>Set Score 10</button>
                        <button onClick={() => setGameOver(true)}>Game Over</button>
                    </div>
                    <div>
                        {data.map((pokemon, index) => (
                            <div key={index} onClick={() => handleCardClick(pokemon.name)}>
                                <img src={pokemon.image} alt={pokemon.name} />
                            </div>
                        ))}
                    </div>
                </>
            )}

            {gameOver && (
                <Results restartGame={restartGame} />
            )}
        </>
    );
}

export default GameLogic;