module.exports = function(app) {

        var bodyParser = require('body-parser');
        var session = require('express-session');
        const MongoClient = require('mongodb').MongoClient


        app.use(bodyParser.urlencoded({
                extended: true
        }));
        app.use(bodyParser.json());

        var date;
        var today=new Date();
        if (today.getMonth() + 1 < 10)
                                        date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
                                else
                                        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


        MongoClient.connect('mongodb://naveena:nav123@ds163850.mlab.com:63850/calendar', (err, client) => {
                if (err) return console.log(err)
                db = client.db('calendar')
                app.listen(3000, () => {
                        console.log('listening on 3000')
                })
        })






        app.get('/', (req, res) => {
                if (req.session.user && userID) {
                        console.log('get request');
                        console.log(req.body);


                        console.log(date);


                        db.collection('users').findOne({
                                username: userID
                        }, function(err, results) {

                                if (err) throw err;
                                var result = [];
                                var j = 0;
                                if (results.tasks == undefined)
                                        results.tasks = [];
                                for (var i = 0; i < results.tasks.length; i++)

                                        if (results.tasks[i].date == date) {
                                                result[j] = results.tasks[i];
                                                console.log('***');
                                                console.log(result);
                                                j++;
                                        }



                                res.render('calendar.ejs', {
                                        tasks: result,date:date
                                });
                        })
                }
                else {
                        var err = new Error('You must be logged in to view this page.');
                        err.status = 401;
                        console.log(err);
                        res.redirect('/login');
                }


        });



        app.post('/go', (req, res) => {
                var item = req.body;
                console.log('=============================')
                console.log(item.date);
                date = item.date;
                res.redirect('/')
        })


        app.get('/logout', (req, res) => {

                if (req.session.user) {

                        req.session.user = undefined;

                        return res.redirect('/login');

                }
        })






};