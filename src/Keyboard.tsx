import classes from "./Keyboard.module.css";
const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

type KeyboardProps = {
  disable: boolean
  activeLetters: string[]
  inactiveLetters: string[]
  addGuessedLetter: (letter: string) => void
}
function Keyboard(props: KeyboardProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
        gap: ".5rem",
      }}
    >
      {KEYS.map((key) => {
        const isActive = props.activeLetters.includes(key);
        const isInActive = props.inactiveLetters.includes(key);
        return (
          <button 
          key={key}
          onClick={() => props.addGuessedLetter(key)} 
          className={`${classes.btn} ${isActive ? classes.active : ""} ${isInActive ? classes.inactive : ""}`}
          disabled={isActive || isInActive || props.disable}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
}

export default Keyboard;
