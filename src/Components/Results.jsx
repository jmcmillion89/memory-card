import React from 'react';

// Results component displays the game results and allows the user to restart the game
function Results({ score, highScore, restartGame, won }) {
  // Determine if the current score is the high score
  const isHighScore = score === highScore;

  return (
    <div className="results-container">
      <h2>Game Over!</h2>
      <p>Your Score: {score}</p>
      {/* Display a message based on whether the player won or lost */}
      {won ? <p>Congratulations! You won!</p> : <p>Sorry, you lost. Try again!</p>}
      {/* Display a message if the current score is the high score */}
      {isHighScore && <p>Congratulations! New High Score!</p>}
      {/* Button to restart the game */}
      <button onClick={restartGame}>Play Again</button>
    </div>
  );
}

export default Results;