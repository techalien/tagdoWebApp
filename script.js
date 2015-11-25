	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute']);
	// configure our routes
	scotchApp.config(function($routeProvider) {
		Parse.initialize("bmGuNCAVpGCmtUY5GOORTxaatm2FmSZIYdnIxdsY", "fuNlKEuSbANtiLNULpfcvsFAEJwq38Dqohvgjgj4");
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'pages/about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'pages/contact.html',
				controller  : 'contactController'
			})
			.when('/login', {
				templateUrl : 'pages/login.html',
				controller  : 'loginController'
			})
			.when('/logout', {
				templateUrl : 'pages/logout.html',
				controller  : 'logoutController'
			});
	});

	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope,$location) {
		// create a message to display in our view
		var currentUser = Parse.User.current();
		if (currentUser) {
    // do stuff with the user
    		alert('Already logged in');
    		$location.path('contact');
		} else {
    // show the signup or login page
    		$location.path('login');
		}
		$scope.message = 'Everyone come and see how good I look!';
	});

	scotchApp.controller('aboutController', function($scope) {
		$scope.message = 'Look! I am an about page.';
	});

	scotchApp.controller('contactController', function($scope) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});

	scotchApp.controller('loginController', function($scope,$location) {
		$scope.isLoggedin = false;
		//$scope.message = 'Contact us! JK. This is just a demo.';
		$scope.login = function() {
			Parse.User.logIn($scope.username, $scope.password, {
  				success: function(user) {
    // Do stuff after successful login.
    				$location.path('contact');
    				alert('login succes');
 
  				},
  				error: function(user, error) {
    // The login failed. Check error to see why.
    				alert('login failed');
  				}
			});
		};
	});

	scotchApp.controller('logoutController', function($scope,$location) {
		//$scope.message = 'Contact us! JK. This is just a demo.';
		var currentUser = Parse.User.current();
		Parse.User.logOut();
		var currentUser = Parse.User.current(); 
		alert('logout'); 
		$location.path('login');
	});

