var User = require ('../models/user');
module.exports = function(router){

// http://localhost:8080/users
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
				res.json({ sucess: false, message: err.errmsg});
			}else{
				res.json({ sucess: true, message: "user created"});
			}
		});		
	}
});

	return router;
}