const express = require('express'); //Для начала импортируем экспресс в наш модуль.
const app = express();//Присваеваем вызов express
const path = require('path');
const PORT = 3000;
const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);
app.listen(PORT, 'localhost', (error) => {//localhost можно убрать, так как есть явное определение.
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});
//Для того, чтобы отправить данные с сервера в браузер, мы используем метод get
app.get('/', (req, res) => {
    res.sendFile(createPath('index'));
});
app.get('/contacts', (req, res) => {
    res.sendFile(createPath('contacts'));
});
app.get('/about-us', (req, res) => {
    res.redirect('/contacts');
});
app.use((req, res) => {
    res
        .status(404)
        .sendFile(createPath('error'));
});
