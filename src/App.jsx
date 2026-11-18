import { useEffect, useState } from "react";

const LETTERS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

function App() {
  const [output, setOutput] = useState("");

  const addLetter = (letter) => setOutput((prev) => prev + letter);
  const backspace = () => setOutput((prev) => prev.slice(0, -1));

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Leave browser shortcuts (Ctrl+C, Cmd+R, etc.) alone
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      if (/^[a-zA-Z]$/.test(event.key)) {
        addLetter(event.key.toUpperCase());
      } else if (event.key === "Backspace") {
        event.preventDefault();
        backspace();
      }
      // Any other key is ignored
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 py-4">
      <div className="card shadow-sm border-0 app-card">
        <div className="card-body p-4">
          <div className="text-center mb-3">
            <h1 className="h3 title mb-1">Alphabet Buttons</h1>
            <p className="subtitle mb-0">Click letters (or use your keyboard) to build text.</p>
          </div>

          <div className="output">
            {output || <span className="placeholder-text">Your text will appear here...</span>}
          </div>

          <div className="d-flex justify-content-end my-2">
            <button type="button" className="btn btn-sm backspace-btn" onClick={backspace}>
              Backspace
            </button>
          </div>

          <div className="keys">
            {LETTERS.map((letter) => (
              <button
                key={letter}
                type="button"
                className="key"
                onClick={() => addLetter(letter)}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
