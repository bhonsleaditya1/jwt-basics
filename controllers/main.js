// check username, password in post(login) request
// if exist create new JWT
// send back to front-end

//setup auhentication so only the request with JWT can access the secret

const {BadRequest} = require('../errors')

const jwt = require('jsonwebtoken')

const login = async(req,res)=>{
    const {username,password} = req.body
    // mongoose validation
    // Joi
    // check in controller
    if (!username || !password){
        throw new BadRequest('Please provide email and password')
    }
    const id = Date.now()
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
    //console.log(username,password);
    //res.send('Fake Login/Register/Signup Route')
    res.status(200).json({msg:'user created',token})
}



const dashboard = async (req,res)=>{
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({
        msg:`Hello ${req.user.username}`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`})
    
}

module.exports = {
    login,
    dashboard 
}