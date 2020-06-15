const express = require('express');
const mongoose = require('mongoose');
const randtoken = require('rand-token');
const app = express();

// Database
mongoose.connect('mongodb+srv://arjun:54321@project-cm8xi.mongodb.net/Project?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log('Connection established to Database..'))
    .catch(err => console.error(err))

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Models
const UserModel = require('./models/userModel');
const ArticleModel = require('./models/articleModel');

// Controllers
const UserControl = require('./controllers/userControl');
UserControl(app, UserModel, randtoken);

const ArticleControl = require('./controllers/articleControl');
ArticleControl(app, ArticleModel);

// Server 
app.listen(3300, () => console.log('Server started on port 3300'));