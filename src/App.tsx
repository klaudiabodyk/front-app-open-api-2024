import React from 'react';
import './App.css';
import NoteList from "./components/NoteList";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <div className="App">
        <GlobalStyles />
        <NoteList/>
    </div>
  );
}

export default App;
