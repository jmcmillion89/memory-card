import react, {useState} from 'react'

function Results ({setGameStarted, setGameOver}) {

    const handleClick = () => {
        setGameStarted(false)
        setGameOver(false)
    }

  return (
    <div>
      <button onClick={()=>handleClick()}>Play Again</button>
    </div>
  );
}

export default Results;