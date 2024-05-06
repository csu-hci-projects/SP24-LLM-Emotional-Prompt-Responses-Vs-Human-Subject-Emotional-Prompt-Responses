import React from 'react';
import { useState } from 'react'; 

import './App.css';
import Consent from './Consent';
import Questions from './Questions';
import Review from './Review';

function Root() {
  const [participantId, setParticipantId] = useState(null);
  const [groupNumber, setGroupNumber] = useState(0);
  const [trialNumber, setTrialNumber] = useState(0);
  
  const [showPromptSelectionPage, setShowPromptSelectionPage] = useState(false);
  const [usedPrompts, setUsedPrompts] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  
  if (loading) {
    return <div className='loading'>Loading...</div>;
  }
  
  if (participantId === null) {
    return <Consent
            setParticipantId={setParticipantId}
            setGroupNumber={setGroupNumber}
            setShowPromptSelectionPage={setShowPromptSelectionPage}
            />;
  } else if (showPromptSelectionPage) {
    return <Questions
            participantId={participantId} 
            groupNumber={groupNumber}
            trialNumber={trialNumber} 
            setShowPromptSelectionPage={setShowPromptSelectionPage}
            setUsedPrompts={setUsedPrompts}
            usedPrompts={usedPrompts}
            setResponseText={setResponseText}
            setLoading={setLoading}
            selectedPrompt={selectedPrompt}
            setSelectedPrompt={setSelectedPrompt}
            />;
  } else {
    return <Review 
            participantId={participantId}
            groupNumber={groupNumber}
            trialNumber={trialNumber}
            setTrialNumber={setTrialNumber}
            setShowPromptSelectionPage={setShowPromptSelectionPage}
            responseText={responseText}
            selectedPrompt={selectedPrompt}
            />;
  }
}

function App() {
  
  return (
    <div className="App">
        {Root()}
    </div>
  );
}


export default App;
