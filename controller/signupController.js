module.exports = function(app) {
        var bcrypt = require('bcrypt');
        var expressSanitizer = require('express-sanitizer');


        app.use(expressSanitizer());
        app.get('/signup', (req, res) => {
            if(req.session.user!=undefined)
                res.redirect('/');
            else
                res.render('signup.ejs');


        });

        app.post('/signup', (req, res) => {

              

                
                var exist = 1;
                var item = req.body;

                db.collection("users").findOne({
                        username: item.username
                },function(err, result) {
                        if (err) throw err;
                        if(result!=undefined)
                            exist=0;
                        if (exist == 0)
                                res.send('Username taken...Try a different name or Log in if you have an account');
                        else {
                                console.log(exist);

                                item.pass = bcrypt.hashSync(item.pass, 10);
                                req.body.sanitized = req.sanitize(JSON.stringify(req.body));

                                db.collection('users').save(item, (err, result) => {

                                        if (err) return console.log(err)

                                        console.log('user added')
                                        res.redirect('/login')
                                })

                        }
                    



                 })

                
              }) 
                

                


        

}