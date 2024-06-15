const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const pdf = require('html-pdf');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/generate-pdf', (req, res) => {
  const { name, email, phone, address, education, experience, skills } = req.body;

  const htmlContent = `
        <h2>${name}</h2>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Address: ${address}</p>
        <h3>Education</h3>
        <p>${education}</p>
        <h3>Experience</h3>
        <p>${experience}</p>
        <h3>Skills</h3>
        <p>${skills}</p>
    `;

  const options = { format: 'Letter' };

  pdf.create(htmlContent, options).toFile('resume.pdf', (err, res) => {
    if (err) return console.log(err);
  });

  res.json({ success: true });
});

app.get('/download-pdf', (req, res) => {
  const file = path.resolve(__dirname, 'resume.pdf');
  res.download(file);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
