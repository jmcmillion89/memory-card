import React from 'react';

// Header component displays the game title and the current and high scores
function Header({ score, highScore }) {
    return (
        <header className="pokemon-header">
            <h1>Pokémon Memory Game</h1>
            <div className="score-container">
                {/* Display the current score */}
                <span>Score: {score}</span>
                {/* Display the high score */}
                <span>High Score: {highScore}</span>
            </div>
        </header>
    );
}

export default Header;