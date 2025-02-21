const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
 
const app = express(); 
const PORT = 3000; // Use a different port 
 
app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
 
app.get('/', (req, res) => { 
    res.sendFile(__dirname + '/index.html'); 
}); 
 
app.post('/ask', (req, res) => { 
    const question = req.body.question; 
    console.log(`Received question: ${question}`); // Log the received question 
    const answer = processQuestion(question); 
    res.json({ answer }); 
}); 
 
function processQuestion(question) { 
    try { 
        // Check if the question contains only mathematical operators and numbers 
        const mathPattern = /^[0-9+\-*/%() ]+$/; // Allow numbers and basic math operators 
        if (mathPattern.test(question)) { 
            // Basic math evaluation 
            const result = eval(question); 
            console.log(`Calculated answer: ${result}`); // Log the calculated answer 
            return result; 
        } else { 
            // Count the number of words in the input 
            const wordCount = question.split(/\s+/).filter(word => word.length > 0).length; // Split by whitespace and filter out empty words 
            console.log(`Word count: ${wordCount}`); // Log the word count 
            return `Word count: ${wordCount}`; 
        } 
    } catch (error) { 
        console.error('Error in calculation:', error); // Log the error 
        return 'Error in calculation'; 
    } 
} 
 
app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`); 
});