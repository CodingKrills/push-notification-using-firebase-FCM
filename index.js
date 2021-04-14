const express = require('express')
const app = express()
var request = require('request');
const bodyParser = require("body-parser");

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index')
});

app.post('/notify', (req, res) => {

    const { to, title, body, icon } = req.body;
    let data = {
        title,
        body,
        icon
    }
    return newNotify(res, to, data);

})


app.get('/notify/:fcm', function (req, res) {
    var to = req.params.fcm;
    return notify(res, to);
});

//////
function notify(res, to) {
    var key = 'AAAAz9YLdWo:APA91bELROY8hes7XEd-ckzAPXIc_XffUge_DaLMBSDf0Ij67ok7OJhyHofarHFWouOOJPfHUzQirCE-Dg0DICiDmuFk9GwWdixO0XLhyoZ0kXKN9bGEHKMu2Gl5Z8lEUyjDjJvLDLxJ';
    var notification = {
        'title': 'Wow! This works like a charm.',
        'body': 'What sorcery is this?',
        'icon': 'https://cdn.dextra.art/website/assets/1501776716680-image.jpg',
        'click_action': 'http://localhost:3000'
    };

    request({
        url: 'https://fcm.googleapis.com/fcm/send',
        method: 'POST',
        headers: {
            'Authorization': 'key=' + key,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'notification': notification,
            'to': to
        })
    }, function (error, response, body) {
        if (error) {
            console.log("Error in post request!", error);
            res.send('Send notification response: ', error);
            res.status(500).send(error);
        } else {
            console.log("No error, body.", body);
            res.status(200).send(body);
        }
    });
}

/////

//////
function newNotify(res, to, data) {
    var key = 'AAAAz9YLdWo:APA91bELROY8hes7XEd-ckzAPXIc_XffUge_DaLMBSDf0Ij67ok7OJhyHofarHFWouOOJPfHUzQirCE-Dg0DICiDmuFk9GwWdixO0XLhyoZ0kXKN9bGEHKMu2Gl5Z8lEUyjDjJvLDLxJ';

    console.log("data Inside The Function", data)

    var notification = {
        'title': data.title,
        'body': data.body,
        'icon': data.icon,
        'click_action': 'http://localhost:3000'
    };

    request({
        url: 'https://fcm.googleapis.com/fcm/send',
        method: 'POST',
        headers: {
            'Authorization': 'key=' + key,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'notification': notification,
            'to': to
        })
    }, function (error, response, body) {
        if (error) {
            console.log("Error in post request!", error);
            res.send('Send notification response: ', error);
            res.status(500).send(error);
        } else {
            // console.log("No error, body.", body);
            //res.status(200).send(body);
            res.render('index')
        }
    });
}


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})