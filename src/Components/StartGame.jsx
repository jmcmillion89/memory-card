import React, { useState } from 'react';


function GameDisplay({ setDifficulty }) {


    return (           
    <>
    <button onClick={() => setDifficulty('easy')}>Easy</button>
    <button onClick={() => setDifficulty('medium')}>Medium</button>
    <button onClick={() => setDifficulty('hard')}>Hard</button>
    </>
);
}

export default GameDisplay;