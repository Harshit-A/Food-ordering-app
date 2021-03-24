
const {checkDuplicateEmail} = require('../middleware');
const db = require('../db');
const User = db.user;
const Role = db.role;
const operators = db.Sequelize.Op;
const config = require('../configs/auth.configs');

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.signUp = (req,res)=>{
	User.create({
		name : req.body.name,
		email_id : req.body.emailId,
		contact_number : req.body.contactNumber,
		gender : req.body.gender,
		age : req.body.age,
		password : bcrypt.hashSync(req.body.password,8)
	})
	.then(user =>{
		if(req.body.roles)
		{
			Role.findAll({
				where : {
					name : {
						[operator.or] : req.body.roles
					}
				}
			}).then(roles =>{
				user.setRoles(roles).then(()=>{
					res.send({message : 'User was registered successfully'});
				});
			});
		}
		else
		{
			//default role is user
			user.setRoles([1]).then(()=>{
				res.send({message : 'User was registered successfully'});
			});
		}
	})
	.catch(err=>{
		res.status(500).send({message : err.message})
	});
};

exports.signIn = (req,res) =>{
	User.findOne({
		where : {
			email_id : req.body.emailId
		}
	}).then(user =>{
		if(!user)
		{
			return res.status(404).send({message : 'Email Id does not exist'})
		}
		var isPasswordValid = bcrypt.compareSync(
			req.body.password,
			user.password);
		if(!isPasswordValid)
		{
			return res.status(401).send({
			accessToken : null,
			message : 'Incorrect password'})	
		}
		var jwtToken = jwt.sign({id: user.id},config.secret,{expiresIn : 86400});
		var userRoles = [];
		user.getRoles().then(roles =>{
			for(let i = 0; i < roles.length;i++)
			{
				userRoles.push(roles[i].name);
			}
			res.status(200).send({
				id : user.id,
				accessToken : jwtToken,
				name : user.name,
				emailId : user.email_id,
				roles: userRoles
			});
		});
	}).catch(err =>{
		res.status(500).send({message : err.message});
	});
};