const { error } = require('console');
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

app.get('/api/notes' , function (req,res){
    fs.readFile("develop/db/db.json" , "utf8", (err ,data) => {
        let jsonData = JSON.parse(data);
        console.log(jsonData);
        res.json(jsonData);
    });
});

const readToAppend = (content , file) => {
    fs.readFile(file , 'utf8' , (err , data) =>{
        if (err){
            console.error(err);
        }else{
            const parseData = JSON.parse(data);
            parseData.push(content);
            writeNewNote(file,parseData);
        }
    });
};

const writeNewNote = (destination , content) =>
    fs.writeFile(destination , JSON.stringify(content , null ,4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );


app.post("/api/notes" , (req , res) => {
    const { title , text} = req.body;
    if (title && text) {
        const newNote = {
            title: title,
            text: text , 
            id: uniqid() ,
        };
        readToAppend(newNote , "develop/db/db.json");

        const response = {
            status: "success",
            body: newNote,
        };

        res.json(response);
        }else {
            res.json("Error in posting new note");
    }
});

    app.delete("/api/notes/:id" , (req ,res) => {
        let id = req.params.id;
        let parseData;
        fs.readFile("/develop/db/db.json" , "utf8" , (err, data) => {
            if (err){
                console.error(err);
            } else{
                parseData = JSON.parse(data);
                const dataFilter = parseData.filter((note) => note.id !== id);
                writeNewNote("develop/db/db.json" , dataFilter);
            }
        });
            res.send(`Deleted note from ${req.params.id}`);
    });


    app.listen(PORT , () => 
    console.log(`App listening at http://localhost:${PORT} 🚀`)
    );