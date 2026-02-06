import { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { games } from "../data/Games";

function TicTacToeModule() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");
  const winner = getWinner(board);
  const isDraw = !winner && board.every(Boolean);

  useEffect(() => {
    if (turn === "O" && !winner) {
      const best = getEasyMove(board);
      if (best !== null) {
        const next = board.slice();
        next[best] = "O";
        setBoard(next);
        setTurn("X");
      }
    }
  }, [turn, board, winner]);

  const handleClick = (idx) => {
    if (board[idx] || winner || turn !== "X") return;
    const next = board.slice();
    next[idx] = "X";
    setBoard(next);
    setTurn("O");
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
  };

  return (
    <div className="module-card">
      <div className="module-header">
        <h4>Minimax Tic Tac Toe</h4>
        <span className="module-status">
          {winner
            ? `Winner: ${winner}`
            : isDraw
            ? "Draw"
            : `Turn: ${turn}`}
        </span>
      </div>
      <div className="ttt-grid">
        {board.map((cell, idx) => (
          <button
            key={idx}
            className="ttt-cell"
            onClick={() => handleClick(idx)}
            disabled={!!cell || !!winner || turn !== "X"}
          >
            {cell}
          </button>
        ))}
      </div>
      <div className="module-footer">
        <button className="secondary-btn" onClick={reset}>
          Reset
        </button>
        {winner === "X" ? (
          <p className="module-win">
            Great win—this is the same clarity I bring to production systems.
            Let’s talk.
          </p>
        ) : null}
      </div>
    </div>
  );
}

function MemoryModule() {
  const base = useMemo(
    () => ["A", "B", "C", "D", "E", "F"].flatMap((v) => [v, v]),
    []
  );
  const [cards, setCards] = useState(() => shuffle(base));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped;
      if (cards[a] === cards[b]) {
        setMatched((m) => [...m, cards[a]]);
        setFlipped([]);
      } else {
        const timer = setTimeout(() => setFlipped([]), 700);
        return () => clearTimeout(timer);
      }
      setMoves((m) => m + 1);
    }
    return undefined;
  }, [flipped, cards]);

  const reset = () => {
    setCards(shuffle(base));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  const handleFlip = (idx) => {
    if (flipped.length === 2) return;
    if (flipped.includes(idx)) return;
    const value = cards[idx];
    if (matched.includes(value)) return;
    setFlipped((f) => [...f, idx]);
  };

  const complete = matched.length === 6;

  return (
    <div className="module-card">
      <div className="module-header">
        <h4>Memory Matching</h4>
        <span className="module-status">Moves: {moves}</span>
      </div>
      <div className="memory-grid">
        {cards.map((value, idx) => {
          const isOpen = flipped.includes(idx) || matched.includes(value);
          return (
            <button
              key={`${value}-${idx}`}
              className={`memory-card ${isOpen ? "open" : ""}`}
              onClick={() => handleFlip(idx)}
            >
              <span>{isOpen ? value : "•"}</span>
            </button>
          );
        })}
      </div>
      <div className="module-footer">
        <button className="secondary-btn" onClick={reset}>
          Reset
        </button>
        {complete ? (
          <p className="module-win">
            Solid execution—this is the same discipline I bring to product
            work. Let’s connect.
          </p>
        ) : null}
      </div>
    </div>
  );
}

function TypingModule() {
  const sample =
    "Engineering is the discipline of turning complexity into reliable, measurable outcomes.";
  const [value, setValue] = useState("");
  const [startedAt, setStartedAt] = useState(null);
  const [endedAt, setEndedAt] = useState(null);
  const normalizedSample = normalizeText(sample);

  const onChange = (e) => {
    if (!startedAt) setStartedAt(Date.now());
    setValue(e.target.value);
  };

  useEffect(() => {
    const normalizedValue = normalizeText(value);
    if (
      normalizedValue.length >= normalizedSample.length &&
      !endedAt &&
      normalizedSample.length > 0
    ) {
      setEndedAt(Date.now());
    }
  }, [value, normalizedSample.length, endedAt]);

  const elapsedSec = endedAt
    ? (endedAt - startedAt) / 1000
    : startedAt
    ? (Date.now() - startedAt) / 1000
    : 0;
  const normalizedValue = normalizeText(value);
  const correctChars = countCorrect(normalizedValue, normalizedSample);
  const accuracy = normalizedSample.length
    ? Math.round((correctChars / normalizedSample.length) * 100)
    : 0;
  const wpm = elapsedSec
    ? Math.round((correctChars / 5 / elapsedSec) * 60)
    : 0;

  const reset = () => {
    setValue("");
    setStartedAt(null);
    setEndedAt(null);
  };

  return (
    <div className="module-card">
      <div className="module-header">
        <h4>Typing Performance</h4>
        <span className="module-status">WPM: {wpm}</span>
      </div>
      <p className="typing-sample">{sample}</p>
      <textarea
        className="typing-input"
        value={value}
        onChange={onChange}
        placeholder="Start typing here..."
      />
      <div className="typing-metrics">
        <div>
          <div className="metric-label">Accuracy</div>
          <div className="metric-value">{accuracy}%</div>
        </div>
        <div>
          <div className="metric-label">Time</div>
          <div className="metric-value">
            {elapsedSec ? elapsedSec.toFixed(1) : "0.0"}s
          </div>
        </div>
      </div>
      <div className="module-footer">
        <button className="secondary-btn" onClick={reset}>
          Reset
        </button>
        {endedAt ? (
          <p className="module-win">
            Clear, accurate, and fast—this is how I work in real engineering
            environments. Let’s talk.
          </p>
        ) : null}
      </div>
    </div>
  );
}

function getWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function getEasyMove(board) {
  const available = board
    .map((v, i) => (v ? null : i))
    .filter((v) => v !== null);
  if (available.length === 0) return null;

  const winning = findWinningMove(board, "O");
  if (winning !== null) return winning;

  const block = findWinningMove(board, "X");
  if (block !== null && Math.random() < 0.8) return block;

  if (available.includes(4) && Math.random() < 0.5) return 4;
  return available[Math.floor(Math.random() * available.length)];
}

function findWinningMove(board, player) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    const values = [board[a], board[b], board[c]];
    const countPlayer = values.filter((v) => v === player).length;
    const countEmpty = values.filter((v) => !v).length;
    if (countPlayer === 2 && countEmpty === 1) {
      if (!board[a]) return a;
      if (!board[b]) return b;
      if (!board[c]) return c;
    }
  }
  return null;
}

function shuffle(list) {
  const arr = list.slice();
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function countCorrect(value, sample) {
  let correct = 0;
  for (let i = 0; i < value.length && i < sample.length; i += 1) {
    if (value[i] === sample[i]) correct += 1;
  }
  return correct;
}

function normalizeText(text) {
  return text.replace(/\s+/g, " ").trim();
}

export default function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const smoothScrollToBottom = (durationMs) => {
    const startY = window.scrollY;
    const targetY = document.body.scrollHeight - window.innerHeight;
    const distance = targetY - startY;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, startY + distance * ease);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const game = games.find((g) => g.id === id);

  useEffect(() => {
    if (!location.state || !location.state.autoplayTour) return;

    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    const scrollTimer = setTimeout(() => {
      smoothScrollToBottom(5000);
    }, 500);

    const nextTimer = setTimeout(() => {
      const nextPath =
        location.state.nextPath ||
        (id === "tic-tac-toe-ai"
          ? "/games/memory-matching"
          : id === "memory-matching"
          ? "/games/typing-analyzer"
          : "/contact");

      navigate(nextPath, {
        state:
          nextPath === "/contact"
            ? { autoplay: true, autoplayTour: true }
            : { autoplayTour: true },
        replace: true,
      });
    }, 5500);

    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(nextTimer);
    };
  }, [id, location.state, navigate]);

  useEffect(() => {
    if (!location.state || !location.state.autoplayTour) return;

    const stopTour = () => {
      navigate(`/games/${id}`, { replace: true });
    };

    const handler = () => stopTour();

    window.addEventListener("wheel", handler, { passive: true });
    window.addEventListener("touchstart", handler, { passive: true });
    window.addEventListener("keydown", handler);
    window.addEventListener("mousedown", handler);

    return () => {
      window.removeEventListener("wheel", handler);
      window.removeEventListener("touchstart", handler);
      window.removeEventListener("keydown", handler);
      window.removeEventListener("mousedown", handler);
    };
  }, [id, location.state, navigate]);

  if (!game) return null;

  const backgroundImage = game.image
    ? game.image.includes("gradient(")
      ? game.image
      : `url(${game.image})`
    : undefined;

  const module =
    id === "tic-tac-toe-ai" ? (
      <TicTacToeModule />
    ) : id === "memory-matching" ? (
      <MemoryModule />
    ) : (
      <TypingModule />
    );

  return (
    <div className="game-detail-page">
      <div
        className="game-hero"
        style={backgroundImage ? { backgroundImage } : undefined}
      >
        <div className="game-hero-overlay">
          <div className="netflix-back" onClick={() => navigate(-1)}>
            <span className="back-icon">&lsaquo;</span>
            <span className="back-text">Back</span>
          </div>

          <div className="game-hero-content">
            {game.badge ? (
              <span className="game-badge">{game.badge}</span>
            ) : null}
            <h1 className="game-title">{game.title}</h1>
            <p className="game-subtitle">{game.description}</p>
            <div className="game-cta-row">
              <a href="#module" className="primary-btn">
                Open Module
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="game-content">
        <div className="game-block" id="module">
          <h3>Module</h3>
          <p>
            Interactive module designed to highlight engineering decision-making,
            controlled state, and measurable outcomes.
          </p>
          {module}
        </div>

        <div className="game-block">
          <h3>Overview</h3>
          <p>{game.overview}</p>
        </div>

        <div className="game-block">
          <h3>Engineering Focus</h3>
          <ul className="game-list">
            {game.highlights.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="game-block">
          <h3>Key Decisions</h3>
          <ul className="game-list">
            {game.decisions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="game-metrics">
          {game.metrics.map((metric, index) => (
            <div key={index} className="metric-card">
              <div className="metric-label">{metric.label}</div>
              <div className="metric-value">{metric.value}</div>
            </div>
          ))}
        </div>

        <div className="game-stack">{game.stack}</div>
      </div>
    </div>
  );
}
