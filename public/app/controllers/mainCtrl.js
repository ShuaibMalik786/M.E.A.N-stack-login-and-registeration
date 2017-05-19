angular.module('mainController',['authServices'])

.controller('mainCtrl',function(Auth,$timeout, $location){
	var app = this;

		this.doLogin = function(loginData){
			app.errorMsg = false;
			app.sucessMsg = false;
			app.loading = true;

			Auth.login(app.loginData).then(function(data){
				if(data.data.sucess){
					app.loading = false;
					// create sucess message
					app.sucessMsg = data.data.message + " ...Redirecting";
					// redirect to home
					$timeout(function(){
						$location.path('/');
					},2000);
					
				} else {
					app.loading = false;
					// create error message
					app.errorMsg = data.data.message;

				};
			});
		};
	});


