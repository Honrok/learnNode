const express = require('express'); //Для начала импортируем экспресс в наш модуль.
const app = express();//Присваеваем вызов express
const morgan = require('morgan');

app.set('view engine', 'ejs');//Устанавливаем для нашего приложения ejs в качестве view engine

const path = require('path');
const PORT = 3000;
const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);
app.listen(PORT, 'localhost', (error) => {//localhost можно убрать, так как есть явное определение.
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));

app.use(express.static('styles'));

//Для того, чтобы отправить данные с сервера в браузер, мы используем метод get
app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), { title });
});
app.get('/contacts', (req, res) => {
    const title = 'Contacts';
    const contacts = [
        { name: 'YouTube', link: 'http://youtube.com/YauhenKavalchuk' },
        { name: 'Twitter', link: 'http://github.com/YauhenKavalchuk' },
        { name: 'GitHub', link: 'http://twitter.com/YauhenKavalchuk' },
    ];
    res.render(createPath('contacts'), { contacts, title });//Не понимаю зачем передавать данные в фигурных скобках.
});
app.get('/posts/:id', (req, res) => {
    const title = 'Post';
    const post = {
        id: '1',
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero
        laboriosam
        nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur
        dolorem.`,
        title: 'Post title',
        date: '05.05.21',
        author: 'Rostyk',
    };
    res.render(createPath('post'), { title, post });
});
app.get('/posts', (req, res) => {
    const title = 'Posts';
    const posts = [
        {
            id: '1',
            text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero
        laboriosam
        nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur
        dolorem.`,
            title: 'Post title',
            date: '05.05.21',
            author: 'Rostyk',
        }
    ];
    res.render(createPath('posts'), { title, posts });
});

app.post('/add-post', (req, res) => {
    const { author, title, text } = req.body;
    const post = {
        id: new Date(),
        date: (new Date()).toLocaleDateString(),
        title,
        author,
        text,
    };
    res.render(createPath('post'), { post, title });
});

app.get('/add-post', (req, res) => {
    const title = 'Add-posts';
    res.render(createPath('add-post'), { title });
});

// app.get('/about-us', (req, res) => {
//     res.redirect('/contacts');
// });
app.use((req, res) => {
    const title = 'Error-page';
    res
        .status(404)
        .sendFile(createPath('error'), { title });
});
