import react, {useState} from 'react'

function Results ({restartGame}) {


  return (
    <div>
      <button onClick={()=>restartGame()}>Play Again</button>
    </div>
  );
}

export default Results;