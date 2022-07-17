import React from "react";
import "./App.css";
import EventForm from "./components/event-form/EventForm";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <div id="overlays"></div>
        <EventForm />
      </div>
    </React.Fragment>
  );
}

export default App;
