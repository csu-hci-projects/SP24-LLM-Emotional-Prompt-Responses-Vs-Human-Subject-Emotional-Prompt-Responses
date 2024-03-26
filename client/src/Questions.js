import React, { useState, useEffect } from 'react';

function Questions({ participantId, groupNumber, trialNumber, setShowPromptSelectionPage, setUsedPrompts, usedPrompts, setResponseText, setLoading, selectedPrompt, setSelectedPrompt}) {

  const promptBank = [
    "What hairstyle is suitable for a formal job interview?",
    "Where is the best location to watch a sunset?",
    "How can you motivate yourself to stay focused and productive while working from home?",
    "What type of music is calming and conducive to relaxation?",
    "When is the right time to start teaching children about financial responsibility?"
  ];

  const [promptsToShow, setPromptsToShow] = useState([]);

  useEffect(() => {

    const unusedPrompts = promptBank.filter(q => !usedPrompts.includes(q));
    const promptsForThisTrial = [];

    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * unusedPrompts.length);
      promptsForThisTrial.push(unusedPrompts[randomIndex]);
      unusedPrompts.splice(randomIndex, 1);
    }

    setPromptsToShow(promptsForThisTrial);
  }, [usedPrompts]);

  const sendPromptToApi = async (formSubmit) => {

    formSubmit.preventDefault();

    if (!selectedPrompt) {
      alert('Select a prompt please');
      return;
    }

    setUsedPrompts([...usedPrompts, selectedPrompt]);
    
    setLoading(true);
    const responseToPrompt = await fetch('http://localhost:3001/api/prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        participantId,
        groupNumber,
        trialNumber,
        selectedPrompt: selectedPrompt
      })
    });

     let responseJson = await responseToPrompt.json();
    
    setResponseText(responseJson.response);
    setLoading(false);
    setShowPromptSelectionPage(false);
  }

  return (
    <div>
      <div className="header">
        <h1>SELECT A QUESTION</h1>
        <p>Participant ID: {participantId}</p>
        <p>Trial Number: {trialNumber}</p>
      </div>

      <div className="body">

        <form className="form" onSubmit={sendPromptToApi}>
          
          <h3>Choose a question to ask</h3>
          {promptsToShow.map((prompt, index) => (
            <label key={index}>
              <input
                type="radio"
                name="prompt"
                value={prompt}
                checked={selectedPrompt === prompt}
                onChange={(e) => setSelectedPrompt(e.target.value)}
              />
              {prompt}
            </label>
          ))}
          
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Questions;
