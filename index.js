import express from "express";
import data from './data/MOCK_DATA.json';
const app = express();
const PORT = 3000;

// .json - sends a JSON response
// .send(): sends the HTTP response
// .download(): Transfers the file as an attachment
// .redirect(): Redirects the user to the specified path

//using the public folder at the root of the project
app.use(express.static("public"));

//Using the images folder at the route/ images
app.use('/images',express.static('images'));


//Using express.json and express.urlencoded
//app.use(express.json());
app.use(express.urlencoded({extended: true}));
//GET
app.get('/', (request, response) =>{
    response.json(data);
});          //each HTTP takes two parameters 1. path - '/'  and 2. handler - it is function we pass req and response to be executed 

//POSt - express.json and express.urlencoded
app.post('/item', (req, res) =>{
    console.log(req.body);
    res.send(req.body);
})


app.get('/next', (request, response, next) =>{
    console.log("response send by next function");
    next();
},(req, res) =>{
    res.send("second callback!");
}
);

//GET - redirect method
app.get('/redirect', (request, response) =>{
    response.redirect('https://www.google.com');
}); 

app.route("/class").get((request, response) =>{
    response.json(data);
}).post((request, response) =>{
    response.send('This is a POST request at /create');
});


//GET with Routing paramter
// app.get("/class/:id", (request, response) =>{
//     const studentId = parseInt(request.params.id);
//     const student = data.filter((student)=> student.id === studentId);
//     response.send(student);
// });

//POSt
app.post('/create', (request, response) =>{
    response.send('This is a POST request at /create');
});

//PUT
app.put('/edit', (request, response) =>{
    response.send('This is a PUT request at /edit');
});

//DELETE
app.delete('/delete', (request, response) =>{
    response.send('This is a DELETE request at /');
});

app.listen(PORT, ()=>{
    console.log(`The server is running on port ${PORT} !`);
});