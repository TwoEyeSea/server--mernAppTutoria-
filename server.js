// Don't forget to npm init within the mernApp project folder in order to save your imported packages.
//Imported npm packages
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
// path is a module built into node.js
const path = require('path')

const app = express();
const PORT = process.env.PORT || 8080;

// MongoDB URI for when mongo isn't running locally
const MONGODBURI = "mongodb+srv://alexMoroney:<alexMoroney123>@alexmerndb.5ev1uki.mongodb.net/?retryWrites=true&w=majority"

//Connecting to mongoose
//We can specify the url which mongodb will run on - can be anything we designate
mongoose.connect(MONGODBURI || 'mongodb://127.0.0.1:27017/alexMernApp',
    //NOTE as of mongoose (v6) and node.js (v17) mongoose.connect needs to specify "127.0.0.1" instead of "localhost"
    {
        // AUTHENTICATION
        // User: alexMoroney
        // Pass: alexMoroney123
        "auth": {
            "username": "alexMoroney",
            "password": "alexMoroney123"
        },
        "authSource": "admin"
    }
)
    .then(result => {
        console.log("you are connected")
    })
    .catch(err => console.log("something went wrong", err));

// Schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    title: String,
    body: String,
    date: {
        type: String,
        default: Date.now()
    }
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)

// Saving data to our mongo database
const data = {
    title: "Let's Work With MongoDB and Axios!",
    body: "Practicing how to use RESTful conventions with MongoDB and axios"
}

const newBlogPost = new BlogPost(data); // instance of the model

// // NEW BLOG POST TEST BLOCK
// newBlogPost.save((error) => {
//     if (error) {
//         console.log('Oops, something went wrong');
//     } else {
//         console.log('Data has been saved!')
//     }
// })

// "morgan" is an http request logger, so that whicher http requests we make it will log the request in the terminal for you to see.
app.use(morgan('tiny'));


// ROUTES - To reach the route for this use you need to go to "http://localhost:8080/api/name"
app.get('/api/name', (req, res) => {
    const data = {
        username: 'Alex',
        age: 26
    }
    BlogPost.find({})
        .then((data) => {
            console.log('Data:', data)
            //res.json(data) needs to be specified within the ".then((data))..." in order to display the data at the designated port of 8080
            res.json(data);
        })
        .catch((error) => {
            console.log('error:', error)
        })


});

app.listen(PORT, console.log(`Server is starting at ${PORT}`));

// Note- the nodemon dependency allows us to modify the code without having to restart the server each time
// Note  - modifactions to package.json in order to use concurrently dependency (which allows us to run the client and server on one terminal)
// We can run both the client and the server with command "npm run dev"
//            "client":" cd client && npm start",
//            "dev": "concurrently \"nodemon server.js\" \"npm run client\""