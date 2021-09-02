const http = require('http');
const fs = require('fs');//Нужен для работы с файлами, которые мы будем возвращать в браузер.
const path = require('path');//Ну для формирования корректного пути.
const PORT = 3000;
const server = http.createServer((req, res) => {
    console.log('Server request');
    res.setHeader('Content-Type', 'text/html');
    //Для начала создаем функцию createPath, так как основная задача, это построение пути до файла.
    const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);//__dirname - это просто глобальный обьект, с помощью которого можна получить путь до исполняемого скрипта. Мы испольуем модуль path потому, что разные файловые системы используют прямую косую черту, а некоторые обратную и модуль path, отлично справляется с этими отличиями. В результате, мы получаем кроссплотформенную работу сервера.
    //Для примера, при обращение на корневой роут, то есть "/", будем возвращать страницу index.html.
    //Сначала создаем условия, в котором будем проверять адрес приходящего запроса.(было if)
    //Далее убираем обертку if над чтением файла и создаем условие switch/case. Принимать оно будет url адрес запроса. А далее в каждом кейсе, в переменную path на основании url адреса, мы будем присваивать путь до страницы.
    let basePath = '';
    switch (req.url) {
        case '/':
            basePath = createPath('index');//на корневой, это будет index.html
            res.statusCode = 200;
            break;
        case '/contacts':
            basePath = createPath('contacts');
            res.statusCode = 200;
            break;
        default:
            basePath = createPath('error');
            res.statusCode = 404;//200 можно не присваивать. Он автоматически присвоится, если страница что то возвращает.
            break;
    }
    //Далее, используя файловую систему, нам нужно прочитать файл index.html и после прочтения, внутри callback фукнции вернуть его в ответ.
    fs.readFile(basePath, (err, data) => {
        if (err) {
            console.log(err);
            res.statusCode = 500;
            res.end();
        } else {
            res.write(data);
            res.end();//Нам всегда нужно завершать ответ, чтобы вернуть контроль браузеру.
        }
    });


});
server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});