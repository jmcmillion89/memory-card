import React from 'react';

// StartGame component allows the user to select the difficulty level to start the game
function StartGame({ setDifficulty }) {
    return (
        <div className="start-game-container">
            <h2>Select Difficulty to Start the Game</h2>
            <div className="difficulty-buttons">
                {/* Button to set the difficulty to 'easy' */}
                <button className="pokemon-button" onClick={() => setDifficulty('easy')}>Easy</button>
                {/* Button to set the difficulty to 'medium' */}
                <button className="pokemon-button" onClick={() => setDifficulty('medium')}>Medium</button>
                {/* Button to set the difficulty to 'hard' */}
                <button className="pokemon-button" onClick={() => setDifficulty('hard')}>Hard</button>
            </div>
        </div>
    );
}

export default StartGame;