import React from 'react';
import GameContainer from '../../components/hangman/GameContainer';
import Figure from '../../components/hangman/Figure';

export default function Hangman() {
  return (
    <div>
           <GameContainer>
           <h1>Hangman</h1>
           <p>Find the hidden word - Enter a letter</p>
           <Figure parts={[]} />

           </GameContainer>
    </div>
  );
}
