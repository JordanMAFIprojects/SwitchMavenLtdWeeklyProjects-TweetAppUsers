const {Router, json} = require('express')
const {User,Tweet} = require('../models/User.js')
const router = Router();

let jwt = require('jsonwebtoken')

let data = {
    username: 'Jordan Mafi',
    password: 3242347829347,
    Userid: 123456789
}

let token = jwt.sign( data, "theSecret" ) 
console.log(token)

jwt.verify(token, "theSecret", (err, decoded) => {
    if(err){
        console.log(err)
    }
    if(decoded){
        console.log(decoded) // data in here!
    }
})
let result = jwt.decode(token)
console.log(result)


router.get('/', async function(req, res) {
    let tweets = await Tweet.findAll({include: User});
    let data = {tweets}
    console.log( "all tweets");
    console.log(tweets.toJSON)

   
    res.render('pages/index.ejs', data)
})

router.get('/createUser', function(req,res){
    res.render('pages/createUser.ejs')
})

router.get('/createTweet', function(req,res){
    res.render('pages/createTweet.ejs')
})

router.post('/createUser', async function(req,res){
    let {username, password} = req.body
    console.log(req.body)
    let user = await User.create({
        username:username,
        password: password
    })

    console.log(user.toJSON())

    res.redirect('/')
})

router.post('/createTweet', async function(req,res){
    let {username, password, content} = req.body

    //print(req.body, 'createTweet req.body')

    let user = await User.findOne({
        where: {
            username: username,
            password: password
        }
        
    })
    console.log("user is printed")
    console.log(user.toJSON())
    //print(user, 'createTweet User retrieval')

    if(user){
        let tweet = await Tweet.create({
            content: content,
            timeCreated: new Date(),
            userId: user.id
        })
        console.log("tweet created")
        console.log(tweet.toJSON())
        res.redirect("/")
    }
     else {
        res.redirect('/error')
    }
    createUser([username, password], (err) => {
        if (err) return res.status(500).send("Server error!");
        findUserByEmail(email, (err, user) => {
            if (err) return res.status(500).send('Server error!');
            const expiresIn = 24 * 60 * 60;
            const accessToken = jwt.sign({ userid: user.id }, SECRET_KEY, {
                expiresIn: expiresIn
            });
            res.status(200).send({
                "user": user, "access_token": accessToken, "expires_in": expiresIn
            });
        });
    });

})


module.exports = router;