var User = require ('../models/user');
module.exports = function(router){

// http://localhost:8080/users

// user registration route
	router.post('/users',function(req,res){
	var user = new User();
	user.username = req.body.username;
	user.password = req.body.password;
	user.email = req.body.email;
	if(req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '' ){
		res.json({ sucess: false, message: 'ensure username,password,email were not provided'});
	}else{
		user.save(function(err){
			if(err){
				res.json({ sucess: false, message: 'user or email already exist'});
			}else{
				res.json({ sucess: true, message: "user created"});
			}
		});		
	}
});

	// user login route
	// http://localhost:8080/authentication
	router.post('/authenticate', function(req,res) {
		User.findOne({username: req.body.username})
		.select('email username password').exec(function(err, user){
			if(err) throw err;

			if(!user){
				res.json({ sucess: false, message: "could not authenticate user"});
			} else if(user){
				if(req.body.password){
					var validPassword = user.comparePassword(req.body.password);
				} else {
					res.json({sucess: false,message: 'no password provided'});
				}
				if(!validPassword) {
					res.json({sucess: false,message: 'could not authenticate password'});
				} else 	{
					res.json({ sucess: true, message: "user authenticated!"});
				}
			}
		});
	});

	return router;
}