import React, { useState, useEffect } from 'react';

function Questions({ participantId, groupNumber, trialNumber, setShowPromptSelectionPage, setUsedPrompts, usedPrompts, setResponseText, setLoading, selectedPrompt, setSelectedPrompt}) {

  const promptBank = [
    "What hairstyle is suitable for a formal job interview?",
    "Where is the best location to watch a sunset?",
    "How can you motivate yourself to stay focused and productive while working from home?",
    "What type of music is calming and conducive to relaxation?",
    "When is the right time to start teaching children about financial responsibility?",
    "What caske is most likely to be enjoyed at a 10 year olds birthday party?",
    "What is the best way to console a child who lost their favorite toy",
    "When is the best time of the day to go to the grocery store",
    "What is the best clothing to wear to a funeral.",
    "What country is the most likely to not exist in 50 years.",
    "Where is the safest place to raise a family",
    "How do I get out of a toxic relationship.",
    "How do you handle criticism at work?",
    "Whats your go-to method for unwinding after a stressful day?",
    "Do you think its essential to always tell the truth?",
    "How do you decide when it's time to end a friendship?",
    "What does success mean to you?",
    "When is it okay to put yourself before others?",
    "How do you usually react when things dont go your way?",
    "Whats something that scares you about the future?",
    "How do you feel about the pace of technological change?",
    "Whats the most challenging part of maintaining relationships?",
    "How do you feel about the idea of lifelong learning?",
    "How important is it to stay true to your roots?"
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
