angular.module('userControllers',['userServices'])

.controller('regCtrl',function($http,$location,$timeout, User){
	var app = this;

	this.regUser = function(regData){
		app.errorMsg = false;
		app.sucessMsg = false;
		app.loading = true;

		User.create(app.regData).then(function(data){
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