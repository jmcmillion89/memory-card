import React, { useState } from 'react';
import GameLogic from './GameLogic';

function Header({score, highScore}) {

    return (
        <>
            <header>Header</header>
            {score} {highScore}<br/>
                    </>
    );
}

export default Header;