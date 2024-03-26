//basic express server
const express = require('express');
const fs = require('fs');
const app = express();
const port = 3001;
const cors = require('cors');
const {openaiResponse, googleResponse} = require('./app/llmApi');

app.use(cors());
app.use(express.json());

require('dotenv').config();

app.get('/', (req, res) => {
	res.send('Hello World!');
	}
);

app.post('/api/prompt', async (req, res) => {
	console.log('got the prompt');
	console.log(req.body);

	fs.appendFileSync('src/responses.csv', `${data.participantId},${data.groupNumber},${data.trialNumber},${data.selectedPrompt}\n`);
	
	if (req.body.groupNumber == 0) {
		await openaiResponse(req, res);
	} else {
		await googleResponse(req, res);
	}
});


app.post('/api/response', (req, res) => {
	console.log('got the response');
	console.log(req.body);
	
	fs.appendFileSync('src/responses.csv', `${req.body.participantId},${req.body.groupNumber},${req.body.trialNumber},${req.body.responseText},${req.body.perceivedTone}\n`);
	
	res.json({ message: 'Response received' });
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
