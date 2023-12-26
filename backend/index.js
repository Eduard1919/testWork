const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const jsonParser = bodyParser.json();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/users', function (req, res) {
    const content = fs.readFileSync('db.json', 'utf8');
    const users = JSON.parse(content);
    res.send(users);
});

app.get('/api/users/:id', function (req, res) {
    const id = req.params.id;
    const content = fs.readFileSync('db.json', 'utf8');
    let users = JSON.parse(content);
    let user = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            user = users[i];
            break;
        }
    }
    if (user) {
        res.send(user);
    } else {
        res.status(404).send();
    }
});

app.post('/api/users', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const userID = req.body.id;
    const userFirst = req.body.first;
    const userSecond = req.body.second;
    const userNote = req.body.note;
    const date = new Date().toISOString();
    let user = {id: userID, first: userFirst, second: userSecond, note: userNote, date: date };
    let data = fs.readFileSync('db.json', 'utf8');
    const users = JSON.parse(data);
    users.push(user);
    data = JSON.stringify(users);
    fs.writeFileSync('db.json',data);
    console.log(`Добавлен клиент с номером: ${userID}`)
    res.send(user);
});

app.delete('/api/users/:id', function (req, res) {
    const id = req.params.id;
    console.log(`Удален клиент с номером: ${id}`)
    const data = fs.readFileSync('db.json', 'utf8');
    let users = JSON.parse(data);
    let index = -1;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            index = i;
            break;
        }
    }
    if (index > -1) {
        const user = users.splice(index, 1)[0];
        const data = JSON.stringify(users);
        fs.writeFileSync('db.json', data);
        res.send(user);
    } else {
        res.status(404).send();
    }
});

app.put('/api/users/:id', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const userId = req.params.id;
    const userFirst = req.body.first;
    const userSecond = req.body.second;
    const userNote = req.body.note;
    const date = new Date().toISOString();

    const data = fs.readFileSync('db.json', 'utf8');
    const users = JSON.parse(data);
    let user;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == userId) {
            user = users[i];
            break;
        }
    }
    if (user) {
        user.first = userFirst;
        user.second = userSecond;
        user.note = userNote;
        user.date = date;
        const data = JSON.stringify(users);
        fs.writeFileSync('db.json', data);
        res.send(user);
    } else {
        res.status(404).send(user);
    }
});

app.listen(3000, function () {
    console.log('Сервер ожидает подключения...');
});