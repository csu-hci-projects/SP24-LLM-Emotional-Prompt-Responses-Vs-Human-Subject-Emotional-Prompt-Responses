import React from "react";

function Consent({ setParticipantId, setGroupNumber, setShowPromptSelectionPage}) {
  const startExperiment = (formSubmit) => {
    formSubmit.preventDefault();
    setParticipantId(formSubmit.target.participantId.value);
    setGroupNumber(formSubmit.target.groupNumber.value);
    setShowPromptSelectionPage(true);
  };

  return (
    <div>
      <div className="header">
      <h1>START</h1>
      </div>
      <p>
        read consent form below
      </p>
      <h2>Consent Form</h2>
      <p>
        ... what we're doing, how we're doing it, and why we're doing it, risks etc... 
      </p>
      <h2>Session Info</h2>
      <form className="form" onSubmit={startExperiment}>
        <label>
          Participant ID: 
          <input type="number" name="participantId" min="0" required />
        </label>
        <br />
        <label>
          Group Number: 
          <input type="number" name="groupNumber" min="0" max="1" defaultValue="0"required />
        </label>
        <br />
        <button type="submit">Agree</button>
      </form>
    </div>
  );
}

export default Consent;