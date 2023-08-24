import { useCallback, useEffect, useState } from 'react'
import listOfWords from './wordList.json';
import HangmanDrawing from './HangmanDrawing';
import HangmanWord from './HangmanWord';
import Keyboard from './Keyboard';

function getWord() {
  return listOfWords[Math.floor(Math.random() * listOfWords.length)]
}

function App() {
  const [word, setWord] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(letter => {
    return !word.includes(letter)
  });

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = word.split("").every(letter => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) return
    setGuessedLetters(prev => [...prev, letter])
  }, [guessedLetters, isLoser, isWinner])


  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return

      e.preventDefault();
      addGuessedLetter(key);
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== "Enter") return

      e.preventDefault()
      setGuessedLetters([])
      setWord(getWord())
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])


  return (
    <div style={{
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      margin: "0 auto",
      alignItems: "center",
    }}>
      <div style={{ textAlign: "center", fontSize: "2rem" }}>
        {isLoser && "Almost there - Refresh page to try again"}
        {isWinner && "GREAT, you guessed the word - Refresh page to try again"}
      </div>
      <HangmanDrawing numberOfMissedLetters={incorrectLetters.length} />
      <HangmanWord guessedLetters={guessedLetters} wordToGuess={word} reveal={isLoser} />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard 
        disable = {isLoser || isWinner}
        activeLetters={guessedLetters.filter(letter => word.includes(letter))} 
        inactiveLetters={incorrectLetters} 
        addGuessedLetter={addGuessedLetter} />
      </div>
      
      <h1>YO</h1>
      <p>Word Test: {word}</p>
    </div>
  )
}

export default App
