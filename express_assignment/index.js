const express = require('express'); 
const app = express(); 
const PORT = 3000;

app.use(express.json()); 

let articlesList = [
    {
        id: 1,
        title: 'The Importance of Regular Exercise',
        description: 'Regular exercise is essential for maintaining good physical and mental health. In this article, we explore the benefits of exercise and provide tips for getting started.',
        author: 'Jane Doe'
    },
    {
        id: 2,
        title: 'The Rise of Plant-Based Diets',
        description: 'Plant-based diets are becoming increasingly popular, and for good reason. In this article, we discuss the benefits of a plant-based diet and provide tips for transitioning to one.',
        author: 'John Smith'
    },
    {
        id: 3,
        title: 'The Impact of Social Media on Mental Health',
        description: 'Social media can have both positive and negative effects on mental health. In this article, we explore the ways in which social media can impact mental health and provide tips for using it in a healthy way.',
        author: 'Sarah Johnson'
    },
    {
        id: 4,
        title: 'The Future of Artificial Intelligence',
        description: 'Artificial intelligence is rapidly advancing and has the potential to revolutionize many industries. In this article, we discuss the current state of AI and explore its future implications.',
        author: 'Mark Lee'
    },
    {
        id: 5,
        title: 'The Benefits of Meditation',
        description: 'Meditation has numerous benefits for both physical and mental health. In this article, we explore the science behind meditation and provide tips for incorporating it into your daily routine.',
        author: 'Lisa Chen'
    }
];

app.get('/', (req, res) => {
    res.send("Welcome to Home Page!");
})

app.get('/articles', (req, res) => {
    res.send(articlesList);
})

app.get('/articles/Jane_Doe', (req, res) => {
    const jane_doe = articlesList.filter((article) => article.author == 'Jane Doe' ? true : false);
    res.send(jane_doe);
})

app.get('/articles/John_Smith', (req, res) => {
    const john_smith = articlesList.filter((article) => article.author == 'John Smith' ? true : false);
    res.send(john_smith);
})

app.get('/articles/Sarah_Johnson', (req, res) => {
    const sarah_johnson = articlesList.filter((article) => article.author == 'Sarah Johnson' ? true : false);
    res.send(sarah_johnson);
})

app.get('/articles/Mark_Lee', (req, res) => {
    const mark_lee = articlesList.filter((article) => article.author == 'Mark Lee' ? true : false);
    res.send(mark_lee);
})

app.get('/articles/Lisa_Chen', (req, res) => {
    const lisa_chen = articlesList.filter((article) => article.author == 'Lisa Chen' ? true : false);
    res.send(lisa_chen);
})

app.post('/articles/create', (req, res) => {
    const newArticles = req.body; 
    articlesList.push(newArticles);
    res.send(articlesList);
})

app.delete('/articles/delete/:id', (req, res) => {  
    const articlesID = req.params.id;
    articlesList = articlesList.filter((article) => article.id != articlesID ? true : false);
    res.send(articlesList);
})

app.listen(PORT, () => {
    console.log("Server running on port : "  +PORT);
})