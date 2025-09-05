import express from 'express';

const app = express();

app.use(express.json());

app.post('/signup', (req, res) => {

})

app.post('/login', (req,res) => {

})

app.post('/website', (req,res) => {

})

app.get('/website/:websiteid', (req,res) => {
    
})

app.listen(8080);