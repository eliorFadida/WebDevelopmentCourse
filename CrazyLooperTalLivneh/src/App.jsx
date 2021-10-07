import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Looper from "./looperComponent.jsx";

function App() {
  return (
    <div id='container' className="flex-row">
    <h1 className="headline col">CrazyLooper</h1>
     <Looper/>
    </div>
  );
}

export default App;