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

        //'/login' is login page
        app.get('/login', (req, res) => {
                if (req.session.user != undefined)
                        res.redirect('/');
                else
                        res.render('login.ejs');

        });

        // '/'is the calendar page
        app.post('/', (req, res) => {


                var item = req.body;
                var check = 0;
                db.collection("users").find({
                        username: item.username
                }).toArray(function(err, result) {
                        if (err) throw err;
                        check = result[0];



                        if (check != undefined && bcrypt.compareSync(item.password, check.pass)) {
                                req.body.sanitized = req.sanitize(JSON.stringify(req.body));
                                userID = item.username;
                                console.log(userID);
                                req.session.user = userID;
                                console.log(req.session.user);
                                var date = new Date();
                                console.log(date);
                                if (date.getMonth() + 1 < 10)
                                        var checkDate = date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate();
                                else
                                        var checkDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();



                                console.log('logged in');
                                db.collection('users').findOne({
                                        username: userID
                                }, function(err, results) {



                                        if (err) throw err;

                                        var result = [];
                                        var j = 0;
                                        if (results.tasks == undefined)
                                                results.tasks = [];
                                        for (var i = 0; i < results.tasks.length; i++) {

                                                if (results.tasks[i].date == checkDate) {
                                                        result[j] = results.tasks[i];
                                                        console.log('***');
                                                        console.log(result);
                                                        j++;
                                                }


                                        }
                                        res.render('calendar.ejs', {
                                                tasks: result,date:checkDate
                                        });
                                })





                        }
                        else {
                                res.send("Wrong Credentials!")

                                // Passwords don't match
                        }


                });

        })

}