import React, { useEffect, useState } from 'react';

function Review({ participantId, groupNumber, trialNumber, setTrialNumber, setShowPromptSelectionPage, responseText, selectedPrompt }) {

  const [perceivedTone, setPerceivedTone] = useState('');

  const sendToneToApi = async (formSubmit) => {

    formSubmit.preventDefault();

    if (!perceivedTone) {
      alert('Please select a tone.');
      return;
    }
    
    await fetch('http://localhost:3001/api/response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        participantId,
        groupNumber,
        trialNumber,
        responseText,
        perceivedTone: perceivedTone
      })
    });

    setTrialNumber(trialNumber + 1);
    setShowPromptSelectionPage(true);
  };

  return (
    <div>
      <div className="header">
        <h1>RESPONSE REVIEW</h1>
      </div>

      <div className="body">
        <h3>Question Asked</h3>
        <div className="prompt">{selectedPrompt}</div>
        <h2>Response</h2>
        <div className="llmResponse">{responseText}</div>
        <form  className="form" onSubmit={sendToneToApi}>
          
            <h3>How would you rate this response in terms of contextual accuracy and relevance?</h3>
            {['0 - Extremely Inaccurate', '1 - Very Inaccurate', '2 - Inaccurate', '3 - Somewhat Accurate', '4 - Very Accurate', '5 - Extremely Accurate'].map((tone) => (
              <label key={tone}>
                <input
                  type="radio"
                  name="tone"
                  value={tone}
                  checked={perceivedTone === tone}
                  onChange={(e) => setPerceivedTone(e.target.value)}
                />
                {tone}
              </label>
            ))}
            
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Review;
