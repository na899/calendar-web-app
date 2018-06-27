module.exports = function(app) {
        var bcrypt = require('bcrypt');

        var expressSanitizer = require('express-sanitizer');

        var bodyParser = require('body-parser');

        const MongoClient = require('mongodb').MongoClient


        app.use(bodyParser.urlencoded({
                extended: true
        }));
        app.use(bodyParser.json());
        app.use(expressSanitizer());



//"/add" gives the form for adding a new task
        app.get('/add', (req, res) => {

                if (req.session.user && userID)
                        res.render('add.ejs');

                else {
                        var err = new Error('You must be logged in to view this page.');
                        err.status = 401;
                        console.log(err);
                        res.redirect('/login');
                }

        })




        app.post('/add', (req, res) => {
                var item = req.body;
                req.body.sanitized = req.sanitize(JSON.stringify(req.body));

                db.collection('users').findOne({
                        username: userID
                }, (err, result) => {
                        if (err) throw err;
                        var a;
                        if (result.tasks == undefined)
                                result.tasks = [];
                        for (var i in result.tasks) {
                                console.log(result.tasks[i]);
                        }
                        console.log(result);
                        a = result.tasks.length;
                        console.log(result.tasks[a]);
                        if (result.tasks[a] == undefined)
                                result.tasks[a] = item;

                        db.collection('users').save(result);



                        console.log('saved to database')
                        res.redirect('/')
                })

        })

}