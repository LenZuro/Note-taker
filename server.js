const express = require('express');

const fs = require('fs');

const path = require('path');

const uniqid = require('uniqid');

const PORT = process.env.PORT || 3001;

const app = express();


app.use(express.json());
app.use(espress.urlencoded({ extended: true}));


app.use(express.static('develop/pub'));

app.get('/', (req,res) => 
    res.sendFile(path.join(__dirname, "develop/pub/index.html"))
);

