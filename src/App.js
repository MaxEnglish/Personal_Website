import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ScrabbleGame from "./pages/ScrabbleGame";
import WordleGame from "./pages/WordleGame";

export default function App() {
  return (
    <Router>
      <div className="app-background">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/scrabble" element={<ScrabbleGame />} />
          <Route path="/wordle" element={<WordleGame />} />
        </Routes>
      </div>
    </Router>
  );
}
