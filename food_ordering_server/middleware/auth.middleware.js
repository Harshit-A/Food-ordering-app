const jwt = require('jsonwebtoken');
const config = require('../configs/auth.configs');
const db = require('../db');
const User = db.user;

verifyToken =(req,res,next) =>{
	let token = req.headers['x-access-token'];
	if(!token)
	{
		return res.status(403).send({
			message : 'No token provided'
		});
	}
	jwt.verify(token,config.secret, (err,result)=>{
		if(err){
			return res.status(401).send({
				message: 'You are not authorized'
			});
		}
		req.userId = result.id;
		next();
	});
};

checkDuplicateEmail = (req,res,next) =>{
	console.log(req.body.name);
	User.findOne({
		where : {
			email_id : req.body.emailId
		}
	}).then(user =>{
		if (user)
		{
			res.status(400).send({
				message: 'Email Id already Exists'
			});
			return;
		}
		next();
	});
}

const authMiddlewares ={
	checkDuplicateEmail: checkDuplicateEmail,
	verifyToken : verifyToken
};



module.exports = authMiddlewares;
